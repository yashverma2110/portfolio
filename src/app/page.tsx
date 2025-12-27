import { Suspense } from "react";
import NavigationBar from "@/app/components/NavigationBar";
import BrandIcon from "@/app/components/ui/BrandIcon";
import Button from "./components/ui/Button";
import Link from "next/link";
import TechStackGrid from "@/app/components/TechStackGrid";
import ExperienceFold from "@/app/components/ExperienceFold";
import ProjectsFold from "@/app/components/ProjectsFold";
import CONTACT from "@/app/config/contact";
import ContactFold from "@/app/components/ContactFold";
import { getTotalYears } from "./utils/experienceUtils";

export default function Home() {
  return (
    <main className="relative h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <Suspense fallback={null}>
        <NavigationBar />
      </Suspense>

      <section id="home" className="px-6 min-h-screen flex flex-col justify-start md:justify-center max-w-6xl mx-auto pt-24 md:pt-32 pb-32 snap-start snap-always">
        <div className="flex flex-col items-start gap-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
              Hi! <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
              <br />
              I&apos;m <span className="text-white">Yash Verma</span>
            </h1>
            
            <p className="mt-8 text-white/80 max-w-2xl text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed">
              I&apos;m a <span className="text-white font-semibold">full-stack software engineer</span> with <span className="text-white font-semibold">{getTotalYears()} of experience</span> crafting products that balance <span className="text-white font-semibold">form and function</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-fit">
              <Link href="#contact" className="w-full text-center">Get in touch</Link>
            </Button>
            
            <div className="flex gap-3">
              <BrandIcon brand="linkedin" link={CONTACT.linkedin} />
              <BrandIcon brand="github" link={CONTACT.github} />
              <BrandIcon brand="twitter" link={CONTACT.twitter} />
              <BrandIcon brand="email" link={`mailto:${CONTACT.email}`} />
            </div>
          </div>
        </div>
      </section>

      <section id="stack" className="px-6 min-h-screen flex flex-col justify-start md:justify-center snap-start snap-always pt-4 md:pt-0 pb-28 md:pb-0">
        <div className="max-w-6xl mx-auto w-full">
          <TechStackGrid />
        </div>
      </section>

      <section id="experience" className="px-6 min-h-screen flex flex-col justify-start bg-white/[0.02] snap-start snap-always pt-4 pb-28 md:pb-20">
        <div className="max-w-6xl mx-auto w-full">
          <ExperienceFold />
        </div>
      </section>

      <section id="projects" className="px-6 min-h-screen flex flex-col justify-start snap-start snap-always pt-4 pb-28 md:pb-20">
        <div className="max-w-6xl mx-auto w-full">
          <ProjectsFold />
        </div>
      </section>

      <section id="contact" className="px-6 min-h-screen flex flex-col justify-start bg-white/[0.02] snap-start snap-always pt-4 pb-28 md:pb-20">
        <div className="max-w-6xl mx-auto w-full">
          <ContactFold /> 
        </div>
      </section>

      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
        
        <div className="shooting-stars">
          <span className="shooting-star"></span>
          <span className="shooting-star"></span>
          <span className="shooting-star"></span>
          <span className="shooting-star"></span>
        </div>
      </div>
    </main>
  );
}
