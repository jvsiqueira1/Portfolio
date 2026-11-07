import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Roboto } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import { MotionProvider } from "@/components/motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

// One variable family: body at normal width, display condensed through the wdth axis (75-100).
const sans = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jvsdev.com.br"),
  title: "JVS//SYS | João Vitor",
  description:
    "Portfólio de João Vitor, desenvolvedor full-stack e Analista de TI no DETRAN-MT. Projetos, experiência, stack e CV em português e inglês.",
  keywords: [
    "João Vitor",
    "Desenvolvedor Full-Stack",
    "Node.js",
    "Nest.js",
    "React",
    "Next.js",
    "PostgreSQL",
    "Cuiabá",
  ],
  authors: [{ name: "João Vitor de Siqueira Campos" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "João Vitor | Desenvolvedor Full-Stack",
    description: "Sistemas que conectam produto, dados e operação.",
    url: "https://www.jvsdev.com.br",
    siteName: "JVS//SYS",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "JVS//SYS, João Vitor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "João Vitor | Desenvolvedor Full-Stack",
    description: "Sistemas que conectam produto, dados e operação.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${sans.variable} ${mono.variable}`}>
        <LanguageProvider>
          <MotionProvider>
            {children}
            <CookieConsent />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
