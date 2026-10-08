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

export default function Home() {
  return (
    <>
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
