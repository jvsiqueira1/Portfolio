import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jvsdev.com.br"),
  title: "João Vitor de Siqueira Campos | Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack (JavaScript/TypeScript, Node.js, Nest.js, React e Next.js). Portfólio com projetos, experiências e tecnologias.",
  keywords: [
    "Desenvolvedor Full Stack",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Nest.js",
    "React",
    "Next.js",
    "PostgreSQL",
    "João Vitor de Siqueira Campos",
  ],
  authors: [{ name: "João Vitor de Siqueira Campos" }],
  alternates: { canonical: "https://www.jvsdev.com.br" },
  openGraph: {
    title: "João Vitor de Siqueira Campos | Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack (JavaScript/TypeScript, Node.js, Nest.js, React e Next.js). Portfólio com projetos, experiências e tecnologias.",
    url: "https://www.jvsdev.com.br",
    siteName: "João Vitor de Siqueira Campos",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/me-image.jpg", width: 1200, height: 630, alt: "João Vitor de Siqueira Campos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "João Vitor de Siqueira Campos | Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack (JavaScript/TypeScript, Node.js, Nest.js, React e Next.js).",
    images: ["/me-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
