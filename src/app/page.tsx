"use client"

import { About, Experience, Footer, Header, Hero, Projects, Technologies } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Projects />
      <Technologies />
      <Experience />
      <About />
      <Footer />
    </div>
  );
}
