import {
  About,
  Education,
  Experience,
  Footer,
  Header,
  Hero,
  Projects,
  SkipLink,
  Technologies,
} from "@/components";
import { LanguageTransition } from "@/components/motion";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <LanguageTransition>
        <main id="main">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Technologies />
          <Education />
        </main>
        <Footer />
      </LanguageTransition>
    </>
  );
}
