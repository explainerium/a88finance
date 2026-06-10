import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, PlusCircle, Users } from "lucide-react";

const stats = [
  { label: "Published Posts", value: "—", icon: FileText },
  { label: "Draft Posts", value: "—", icon: FileText },
  { label: "New Enquiries", value: "—", icon: MessageSquare },
  { label: "Subscribers", value: "—", icon: Users },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-brand-ink">
            Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage blog content and enquiries here. This is a placeholder shell —
            full functionality will be wired up in a later phase.
          </p>
        </div>
        <Button variant="gold" size="pill" disabled>
          <PlusCircle className="size-4" />
          New Post
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="size-4 text-brand-blue" />
              </CardHeader>
              <CardContent>
                <div className="font-display text-3xl font-semibold text-brand-ink">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-brand-ink">
            Blog Management — Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid place-items-center rounded-lg border border-dashed border-border bg-brand-paper-2/50 py-16 text-center">
            <div className="max-w-md space-y-2 px-6">
              <FileText className="mx-auto size-10 text-brand-ink-3" />
              <h3 className="font-display text-lg font-semibold text-brand-ink">
                Content management will live here
              </h3>
              <p className="text-sm text-muted-foreground">
                Create, edit, and publish blog posts; review website enquiries;
                and manage newsletter subscribers. We&apos;ll connect this to a
                database and authentication in the next phase.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
