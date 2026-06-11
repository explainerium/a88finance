import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { deleteUserAction } from "@/lib/actions/users";
import { ActionButton } from "@/components/dashboard/action-button";
import { btnPrimary, card } from "@/components/dashboard/classes";

export default async function AdminUsersPage() {
  const admin = await requireAdmin();

  const users = await prisma.user.findMany({
    where: { deletedAt: null },
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-ink">
            Users
          </h1>
          <p className="mt-1 text-sm text-brand-ink-3">
            Manage admins and authors. Deleting an author transfers their posts
            to you.
          </p>
        </div>
        <Link href="/dashboard/users/new" className={btnPrimary}>
          <Plus className="size-4" />
          New user
        </Link>
      </header>

      <div className={`${card} overflow-x-auto p-0`}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-brand-ink-3">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Posts</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => {
              const isSelf = u.id === admin.id;
              return (
                <tr key={u.id}>
                  <td className="px-4 py-3 font-medium text-brand-ink">
                    {u.name || "—"}
                    {isSelf && (
                      <span className="ml-2 rounded-full bg-brand-paper-2 px-2 py-0.5 text-xs text-brand-ink-3">
                        you
                      </span>
                    )}
                    {u.username && (
                      <p className="text-xs text-brand-ink-3">@{u.username}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-brand-ink-3">{u.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        u.role === "ADMIN"
                          ? "rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-xs font-semibold text-brand-blue"
                          : "rounded-full bg-brand-paper-2 px-2.5 py-0.5 text-xs font-semibold text-brand-ink-3"
                      }
                    >
                      {u.role === "ADMIN" ? "Admin" : "Author"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-brand-ink-3">
                    {u._count.posts}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/users/${u.id}/edit`}
                        className="text-xs font-medium text-brand-ink hover:text-brand-gold-deep"
                      >
                        Edit
                      </Link>
                      {!isSelf && (
                        <ActionButton
                          action={deleteUserAction}
                          fields={{ id: u.id }}
                          confirm={`Delete ${u.name || u.email}? Their posts will be transferred to you.`}
                          className="text-xs font-medium text-red-600 hover:underline"
                          successMessage="User deleted; posts transferred to you."
                        >
                          Delete
                        </ActionButton>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
