"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBriefcase, FaCodeBranch, FaEnvelope, FaHome, FaLayerGroup } from "react-icons/fa";

type Section = "home" | "stack" | "experience" | "projects" | "contact";

export default function NavigationBar({ className }: { className?: string }) {
  const [activeSection, setActiveSection] = useState<Section | "">("");

  useEffect(() => {
    const handleScroll = () => {
      const sections: Section[] = ["home", "stack", "experience", "projects", "contact"];
      const mainContainer = document.querySelector('main');
      if (!mainContainer) return;
      
      const scrollPosition = mainContainer.scrollTop + 150; // threshold to trigger active state early
      
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

    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
      return () => mainContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  function getLinkClassName(section: Section) {
    const isActive = activeSection === section;
    return `relative flex flex-col sm:flex-row items-center justify-center text-[10px] sm:text-sm gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-2 transition-all duration-300 rounded-full h-full min-w-[60px] sm:min-w-fit ${
      isActive ? "text-white bg-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)]" : "text-white/70 hover:text-white hover:bg-white/5"
    }`;
  }

  return (
    <div className="fixed bottom-6 sm:bottom-auto sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        id="app-navigation"
        className={`pointer-events-auto flex items-stretch bg-black/50 backdrop-blur-2xl border border-white/10 rounded-full p-1.5 shadow-2xl ${className}`}
      >
        <div className="flex items-center gap-1">
          <Link href="#home" className={getLinkClassName("home")}>
            <FaHome className="text-lg sm:text-base" />
            <span className="font-medium">Home</span>
          </Link>
          <Link href="#stack" className={getLinkClassName("stack")}>
            <FaLayerGroup className="text-lg sm:text-base" />
            <span className="font-medium">Stack</span>
          </Link>
          <Link href="#experience" className={getLinkClassName("experience")}>
            <FaBriefcase className="text-lg sm:text-base" />
            <span className="font-medium">Exp</span>
          </Link>
          <Link href="#projects" className={getLinkClassName("projects")}>
            <FaCodeBranch className="text-lg sm:text-base" />
            <span className="font-medium">Projects</span>
          </Link>
          <Link href="#contact" className={getLinkClassName("contact")}>
            <FaEnvelope className="text-lg sm:text-base" />
            <span className="font-medium">Contact</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
