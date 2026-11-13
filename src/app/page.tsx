import { BackToTop } from "@/components/back-to-top";
import { ChatWidget } from "@/components/chat-widget";
import { CommandPalette } from "@/components/command-palette";
import { Cursor } from "@/components/cursor";
import { Navbar } from "@/components/navbar";
import { Preloader } from "@/components/preloader";
import { ScrollProgress } from "@/components/scroll-progress";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { site } from "@/data/site";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-xl focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-brand-fg"
      >
        Lewati ke konten utama
      </a>

      <Preloader />
      <ScrollProgress />
      <Cursor />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Marquee items={[`Hello I'm ${site.nickname}`, site.tagline]} className="py-10 sm:py-14" />
        <Services />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <ChatWidget />
      <CommandPalette />
    </>
  );
}
