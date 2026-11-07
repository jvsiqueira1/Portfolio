import type { Language } from "@/content";
import { buildProfileJsonLd } from "@/lib/site";
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Projects from "./Projects";
import SkipLink from "./SkipLink";
import Technologies from "./Technologies";

export default function HomePage({ language }: { language: Language }) {
  // JSON from our own constants; escaping "<" keeps it from ever closing the script element.
  const jsonLd = JSON.stringify(buildProfileJsonLd(language)).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <SkipLink />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Technologies />
        <Education />
      </main>
      <Footer />
    </>
  );
}
