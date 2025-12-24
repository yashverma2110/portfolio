import Link from "next/link";
import { FaLink } from "react-icons/fa";
import PROJECTS from "@/app/config/projects";
import Button from "@/app/components/ui/Button";

export default function ProjectsFold() {
  return (
    <div className="flex flex-col gap-12 py-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">Projects</h2>
        <div className="h-1 w-12 bg-white/20 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <div key={project.title} className="group relative flex flex-col gap-6 apple-card">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
              <div className="flex items-center text-sm font-medium text-white/40 gap-2">
                <FaLink className="text-xs" />
                <Link 
                  href={project.link} 
                  target="_blank" 
                  className="hover:text-white transition-colors duration-300"
                >
                  {project.link.replace(/^https?:\/\//, '')}
                </Link>
              </div>
            </div>

            <p className="text-white/60 text-lg leading-relaxed">{project.description}</p>
            
            <ul className="flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <li 
                  key={feature} 
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-white/40"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <Button size="sm" variant="secondary" className="w-full">
                <Link href={project.link} target="_blank" className="flex items-center gap-2">
                  Visit Website <FaLink className="text-[10px]" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
