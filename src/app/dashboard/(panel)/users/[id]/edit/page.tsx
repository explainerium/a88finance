import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { updateUserAction } from "@/lib/actions/users";
import { UserForm } from "@/components/dashboard/user-form";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const user = await prisma.user.findFirst({
    where: { id, deletedAt: null },
  });
  if (!user) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-brand-ink">
        Edit user
      </h1>
      <UserForm
        action={updateUserAction}
        submitLabel="Save changes"
        user={{
          id: user.id,
          name: user.name ?? "",
          email: user.email,
          username: user.username ?? "",
          image: user.image ?? "",
          role: user.role,
        }}
      />
    </div>
  );
}
