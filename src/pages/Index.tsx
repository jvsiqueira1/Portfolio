import { About, Footer, Header, Hero, Projects, Technologies } from '@/components';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Projects />
      <Technologies />
      <About />
      <Footer />
    </div>
  )
}
