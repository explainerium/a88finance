"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { type FormState, str, nullable } from "@/lib/actions/form-state";

const SETTINGS_ID = "singleton";

const input = z.object({
  siteName: z.string().trim().min(1, "Site name is required.").max(120),
  siteDescription: z.string().trim().max(400).optional().default(""),
  defaultOgImage: z.string().trim().max(2048).optional().default(""),
  contactEmail: z
    .union([z.literal(""), z.string().email("Enter a valid email.")])
    .optional()
    .default(""),
  facebookUrl: z.string().trim().max(2048).optional().default(""),
  linkedinUrl: z.string().trim().max(2048).optional().default(""),
  instagramUrl: z.string().trim().max(2048).optional().default(""),
});

export async function updateSettingsAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Not authenticated." };
  if (user.role !== "ADMIN") return { ok: false, error: "Admins only." };

  const parsed = input.safeParse({
    siteName: str(formData, "siteName"),
    siteDescription: str(formData, "siteDescription"),
    defaultOgImage: str(formData, "defaultOgImage"),
    contactEmail: str(formData, "contactEmail"),
    facebookUrl: str(formData, "facebookUrl"),
    linkedinUrl: str(formData, "linkedinUrl"),
    instagramUrl: str(formData, "instagramUrl"),
  });
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const d = parsed.data;

  const data = {
    siteName: d.siteName,
    siteDescription: nullable(d.siteDescription),
    defaultOgImage: nullable(d.defaultOgImage),
    contactEmail: nullable(d.contactEmail),
    facebookUrl: nullable(d.facebookUrl),
    linkedinUrl: nullable(d.linkedinUrl),
    instagramUrl: nullable(d.instagramUrl),
  };

  try {
    await prisma.settings.upsert({
      where: { id: SETTINGS_ID },
      update: data,
      create: { id: SETTINGS_ID, ...data },
    });
  } catch (error) {
    console.error("[updateSettings]", error);
    return { ok: false, error: "Could not save settings." };
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/", "layout");
  return { ok: true };
}
