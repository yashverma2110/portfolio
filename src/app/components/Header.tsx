"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBriefcase, FaCodeBranch, FaEnvelope, FaHome } from "react-icons/fa";

type Section = "home" | "experience" | "projects" | "contact";

export default function Header({ className }: { className?: string }) {
  const [activeSection, setActiveSection] = useState<Section | "">("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections: Section[] = ["home", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY;
      let isInSection = false;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, height } = element.getBoundingClientRect();
          const elementPosition = window.scrollY + top;
          const progress = window.scrollY / (window.innerHeight * sections.length);
          setProgress(progress);

          if (scrollPosition >= elementPosition && scrollPosition <= elementPosition + height) {
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
    return `flex items-center text-xs md:text-xl gap-2 text-white p-4 md:p-3 whitespace-nowrap font-semibold ${activeSection === section ? "" : ""}`;
  }

  return (
    <header
      id="app-header"
      className={`sticky z-30 overflow-hidden top-4 m-4 flex flex-col bg-slate-700 border border-slate-600 rounded-3xl glass-shadow ${className}`}
    >
      <div className="absolute z-0 top-0 left-0 w-full h-full bg-blue-500" style={{ width: `${progress * 100}%` }}></div>
      <div className="z-10 flex justify-evenly items-center w-full">
        <Link href="#home" className={getLinkClassName("home")}>
          <FaHome className="hidden md:block" />  
          Home
        </Link>
        <Link href="#experience" className={getLinkClassName("experience")}>
          <FaBriefcase className="hidden md:block" />
          Experience
        </Link>
        <Link href="#projects" className={getLinkClassName("projects")}>
          <FaCodeBranch className="hidden md:block" />
          Projects
        </Link>
        <Link href="#contact" className={getLinkClassName("contact")}>
          <FaEnvelope className="hidden md:block" />
          Contact
        </Link>
      </div>
    </header>
  );
}
