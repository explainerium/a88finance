"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { hashPassword } from "@/lib/auth/password";
import {
  type FormState,
  str,
  nullable,
} from "@/lib/actions/form-state";

const roleEnum = z.enum(["ADMIN", "AUTHOR"]);

const createInput = z.object({
  name: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  username: z.string().trim().max(60).optional().default(""),
  image: z.string().trim().max(2048).optional().default(""),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: roleEnum,
});

const updateInput = z.object({
  id: z.string().min(1),
  name: z.string().trim().max(120).optional().default(""),
  username: z.string().trim().max(60).optional().default(""),
  image: z.string().trim().max(2048).optional().default(""),
  password: z.string().optional().default(""),
  role: roleEnum,
});

async function requireAdminActor() {
  const user = await getCurrentUser();
  if (!user) return { user: null, error: "Not authenticated." as const };
  if (user.role !== "ADMIN") {
    return { user: null, error: "Admins only." as const };
  }
  return { user, error: null };
}

function uniqueConflictMessage(error: unknown): string | null {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    const target = (error.meta?.target as string[] | undefined)?.join(", ");
    if (target?.includes("username")) return "That username is already taken.";
    if (target?.includes("email")) return "That email is already registered.";
    return "That value must be unique.";
  }
  return null;
}

export async function createUserAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const { error: authError } = await requireAdminActor();
  if (authError) return { ok: false, error: authError };

  const parsed = createInput.safeParse({
    name: str(formData, "name"),
    email: str(formData, "email"),
    username: str(formData, "username"),
    image: str(formData, "image"),
    password: str(formData, "password"),
    role: str(formData, "role"),
  });
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  try {
    await prisma.user.create({
      data: {
        name: nullable(data.name),
        email: data.email,
        username: nullable(data.username),
        image: nullable(data.image),
        hashedPassword: await hashPassword(data.password),
        role: data.role,
      },
    });
  } catch (error) {
    const conflict = uniqueConflictMessage(error);
    if (conflict) return { ok: false, error: conflict };
    console.error("[createUser]", error);
    return { ok: false, error: "Could not create the user." };
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function updateUserAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const { user: admin, error: authError } = await requireAdminActor();
  if (authError) return { ok: false, error: authError };

  const parsed = updateInput.safeParse({
    id: str(formData, "id"),
    name: str(formData, "name"),
    username: str(formData, "username"),
    image: str(formData, "image"),
    password: str(formData, "password"),
    role: str(formData, "role"),
  });
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  const target = await prisma.user.findFirst({
    where: { id: data.id, deletedAt: null },
  });
  if (!target) return { ok: false, error: "User not found." };

  // Don't allow demoting the last remaining admin (would lock everyone out).
  if (target.role === "ADMIN" && data.role !== "ADMIN") {
    const adminCount = await prisma.user.count({
      where: { role: "ADMIN", deletedAt: null },
    });
    if (adminCount <= 1) {
      return { ok: false, error: "You can't demote the last remaining admin." };
    }
  }

  if (data.password && data.password.length < 8) {
    return {
      ok: false,
      fieldErrors: { password: ["Password must be at least 8 characters."] },
    };
  }

  try {
    await prisma.user.update({
      where: { id: data.id },
      data: {
        name: nullable(data.name),
        username: nullable(data.username),
        image: nullable(data.image),
        role: data.role,
        ...(data.password
          ? { hashedPassword: await hashPassword(data.password) }
          : {}),
      },
    });
  } catch (error) {
    const conflict = uniqueConflictMessage(error);
    if (conflict) return { ok: false, error: conflict };
    console.error("[updateUser]", error);
    return { ok: false, error: "Could not save the user." };
  }

  void admin;
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

/**
 * Delete an author and transfer their posts to the deleting admin, in a single
 * transaction so content is never lost. Guardrails: can't delete yourself, and
 * can't delete the last remaining admin.
 */
export async function deleteUserAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const { user: admin, error: authError } = await requireAdminActor();
  if (authError || !admin) return { ok: false, error: authError ?? "Admins only." };

  const targetId = str(formData, "id");
  if (!targetId) return { ok: false, error: "Missing user id." };

  if (targetId === admin.id) {
    return { ok: false, error: "You can't delete your own account." };
  }

  const target = await prisma.user.findFirst({
    where: { id: targetId, deletedAt: null },
  });
  if (!target) return { ok: false, error: "User not found." };

  if (target.role === "ADMIN") {
    const adminCount = await prisma.user.count({
      where: { role: "ADMIN", deletedAt: null },
    });
    if (adminCount <= 1) {
      return { ok: false, error: "You can't delete the last remaining admin." };
    }
  }

  try {
    await prisma.$transaction([
      prisma.post.updateMany({
        where: { authorId: targetId },
        data: { authorId: admin.id }, // transfer posts to the acting admin
      }),
      prisma.user.delete({ where: { id: targetId } }),
    ]);
  } catch (error) {
    console.error("[deleteUser]", error);
    return { ok: false, error: "Could not delete the user." };
  }

  revalidatePath("/dashboard/users");
  revalidatePath("/dashboard/posts");
  return { ok: true };
}
