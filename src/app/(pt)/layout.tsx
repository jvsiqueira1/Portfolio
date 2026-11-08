import SiteDocument from "@/components/SiteDocument";
import { buildMetadata, siteViewport } from "@/lib/site";

// Root layout of the Portuguese route group ("/"): <html lang="pt-BR"> comes from the server.
export const metadata = buildMetadata("pt");
export const viewport = siteViewport;

export default function PortugueseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument language="pt">{children}</SiteDocument>;
}
