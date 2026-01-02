import Header from '@/components/header';
import Hero from '@/components/sections/hero';
import Experience from '@/components/sections/experience';
import Education from '@/components/sections/education';
import Skills from '@/components/sections/skills';
import Portfolio from '@/components/sections/portfolio';
import Contact from '@/components/sections/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Experience />
        <Education />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
