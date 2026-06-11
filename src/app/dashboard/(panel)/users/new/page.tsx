import { requireAdmin } from "@/lib/auth/session";
import { createUserAction } from "@/lib/actions/users";
import { UserForm } from "@/components/dashboard/user-form";

export default async function NewUserPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-brand-ink">
        New user
      </h1>
      <UserForm action={createUserAction} submitLabel="Create user" />
    </div>
  );
}
