import type { Metadata, Viewport } from "next";
import { Archivo, Azeret_Mono } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const azeretMono = Azeret_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0c100e" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jvsdev.com.br"),
  title: "João Vitor | Desenvolvedor Full-Stack",
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
    siteName: "João Vitor",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "João Vitor, Desenvolvedor Full-Stack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "João Vitor | Desenvolvedor Full-Stack",
    description: "Sistemas que conectam produto, dados e operação.",
    images: ["/opengraph-image"],
  },
};

const themeScript = `
  document.documentElement.classList.add('js');
  try {
    var saved = localStorage.getItem('theme');
    var dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${archivo.variable} ${azeretMono.variable}`}>
        <LanguageProvider>
          {children}
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
