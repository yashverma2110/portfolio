"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Section = "experience" | "projects" | "contact";

export default function Header() {
  const [activeSection, setActiveSection] = useState<Section | "">("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections: Section[] = ["experience", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let isInSection = false;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top } = element.getBoundingClientRect();
          const elementPosition = window.scrollY + top;
          const progress = window.scrollY / (window.innerHeight * sections.length);
          setProgress(progress);

          if (scrollPosition >= elementPosition && scrollPosition <= elementPosition + element.offsetHeight) {
            setActiveSection(section);
            isInSection = true;
            break;
          }
        }
      }
      if (!isInSection) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function getLinkClassName(section: Section) {
    return `text-white p-4 whitespace-nowrap font-semibold ${activeSection === section ? "" : ""}`;
  }

  return (
    <header
      id="app-header"
      className="sticky overflow-hidden top-4 m-4 flex flex-col bg-slate-700 border border-slate-600 rounded-2xl glass-shadow"
    >
      <div className="absolute z-0 top-0 left-0 w-full h-full bg-blue-500" style={{ width: `${progress * 100}%` }}></div>
      <div className="z-10 flex justify-evenly items-center w-full">
        <Link href="#experience" className={getLinkClassName("experience")}>
          Experience
        </Link>
        <Link href="#projects" className={getLinkClassName("projects")}>
          Projects
        </Link>
        <Link href="#contact" className={getLinkClassName("contact")}>
          Contact
        </Link>
      </div>
    </header>
  );
}
