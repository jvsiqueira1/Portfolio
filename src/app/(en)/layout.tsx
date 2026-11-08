import SiteDocument from "@/components/SiteDocument";
import { buildMetadata, siteViewport } from "@/lib/site";

// Root layout of the English route group ("/en"): <html lang="en"> comes from the server.
export const metadata = buildMetadata("en");
export const viewport = siteViewport;

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument language="en">{children}</SiteDocument>;
}
