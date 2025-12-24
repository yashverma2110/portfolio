"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBriefcase, FaCodeBranch, FaEnvelope, FaHome } from "react-icons/fa";

type Section = "home" | "experience" | "projects" | "contact";

export default function Header({ className }: { className?: string }) {
  const [activeSection, setActiveSection] = useState<Section | "">("");

  useEffect(() => {
    const handleScroll = () => {
      const sections: Section[] = ["home", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 120; // threshold to trigger active state early
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function getLinkClassName(section: Section) {
    const isActive = activeSection === section;
    return `relative flex items-center text-sm md:text-base gap-2 px-4 py-2 transition-all duration-300 rounded-full ${
      isActive ? "text-white bg-white/10" : "text-white/60 hover:text-white"
    }`;
  }

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <header
        id="app-header"
        className={`pointer-events-auto flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5 shadow-2xl ${className}`}
      >
        <div className="flex items-center gap-1">
          <Link href="#home" className={getLinkClassName("home")}>
            <FaHome className="md:hidden lg:block text-lg" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link href="#experience" className={getLinkClassName("experience")}>
            <FaBriefcase className="md:hidden lg:block text-lg" />
            <span className="hidden sm:inline">Experience</span>
          </Link>
          <Link href="#projects" className={getLinkClassName("projects")}>
            <FaCodeBranch className="md:hidden lg:block text-lg" />
            <span className="hidden sm:inline">Projects</span>
          </Link>
          <Link href="#contact" className={getLinkClassName("contact")}>
            <FaEnvelope className="md:hidden lg:block text-lg" />
            <span className="hidden sm:inline">Contact</span>
          </Link>
        </div>
      </header>
    </div>
  );
}
