import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { SettingsForm } from "@/components/dashboard/settings-form";

export default async function AdminSettingsPage() {
  await requireAdmin();

  // The settings row is a singleton keyed by a fixed id.
  const settings = await prisma.settings.findUnique({
    where: { id: "singleton" },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold text-brand-ink">
          Settings
        </h1>
        <p className="mt-1 text-sm text-brand-ink-3">
          Site-wide details used across the public site and SEO metadata.
        </p>
      </header>

      <SettingsForm
        settings={{
          siteName: settings?.siteName ?? "A88 Finance",
          siteDescription: settings?.siteDescription ?? "",
          defaultOgImage: settings?.defaultOgImage ?? "",
          contactEmail: settings?.contactEmail ?? "",
          facebookUrl: settings?.facebookUrl ?? "",
          linkedinUrl: settings?.linkedinUrl ?? "",
          instagramUrl: settings?.instagramUrl ?? "",
        }}
      />
    </div>
  );
}
