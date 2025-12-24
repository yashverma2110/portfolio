import { Suspense } from "react";
import Header from "@/app/components/Header";
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
    <main className="relative">
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <section id="home" className="px-6 min-h-screen flex flex-col justify-center max-w-6xl mx-auto pt-32 pb-20">
        <div className="flex flex-col items-start gap-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
              Hi! <span className="animate-wave">👋</span>
              <br />
              I&apos;m <span className="text-white">Yash Verma</span>
            </h1>
            
            <p className="mt-8 text-white/60 max-w-2xl text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed">
              I&apos;m a <span className="text-white">full-stack software engineer</span> with <span className="text-white">{getTotalYears()} of experience</span> crafting products that balance <span className="text-white">form and function</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <Button size="lg">
              <Link href="#contact">Get in touch</Link>
            </Button>
            
            <div className="flex gap-3">
              <BrandIcon brand="linkedin" link={CONTACT.linkedin} />
              <BrandIcon brand="github" link={CONTACT.github} />
              <BrandIcon brand="twitter" link={CONTACT.twitter} />
              <BrandIcon brand="email" link={`mailto:${CONTACT.email}`} />
            </div>
          </div>
        </div>

        <div className="mt-32 animate-in fade-in duration-1000 delay-500">
          <TechStackGrid />
        </div>
      </section>

      <section id="experience" className="px-6 py-32 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <ExperienceFold />
        </div>
      </section>

      <section id="projects" className="px-6 py-32">
        <div className="max-w-6xl mx-auto">
          <ProjectsFold />
        </div>
      </section>

      <section id="contact" className="px-6 py-32 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
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
          <span className="shooting-star"></span>
          <span className="shooting-star"></span>
        </div>
      </div>
    </main>
  );
}
