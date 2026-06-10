import { TopBar } from "@/components/layout/top-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
