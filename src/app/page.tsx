import Header from "@/app/components/Header";
import BrandIcon from "@/app/components/ui/BrandIcon";
import Button from "./components/ui/Button";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="h-15"></div>}>
        <Header />
      </Suspense>

      <main className="px-4 h-screen">
        <h1 className="animate-in fade-in duration-1000 text-white text-4xl font-bold">
          {/* TODO: Animation not working */}
          Hi! <span>👋</span>
          <br />
          I&apos;m <span className="text-blue-500">Yash Verma</span>
          <div className="flex gap-2 mt-2">
            <BrandIcon brand="linkedin" />
            <BrandIcon brand="github" />
            <BrandIcon brand="twitter" />
            <BrandIcon brand="medium" />
          </div>
        </h1>
        <hr className="my-4 border-slate-700" />
        <p className="text-white transition-transform animate-in fade-in duration-1000 md:text-2xl">
          I&apos;m a <span className="text-blue-500">full-stack software engineer</span> with a passion for building
          products that are both functional and beautiful.
        </p>

        <Button className="mt-4">
          <Link href="#contact">Get in touch</Link>
        </Button>
      </main>

      <section id="experience" className="p-4 h-screen">
        Experience
      </section>

      <section id="projects" className="p-4 h-screen">
        Projects
      </section>

      <section id="contact" className="p-4 h-screen">
        Contact Me
      </section>

      <section className="shooting-stars">
        <span className="shooting-star"></span>
        <span className="shooting-star"></span>
        <span className="shooting-star"></span>
        <span className="shooting-star"></span>
        <span className="shooting-star"></span>
        <span className="shooting-star"></span>
      </section>
    </>
  );
}
