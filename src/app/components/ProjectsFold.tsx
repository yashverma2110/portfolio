import Link from "next/link";
import { FaLink } from "react-icons/fa";
import PROJECTS from "@/app/config/projects";
import Button from "@/app/components/ui/Button";

export default function ProjectsFold() {
  return (
    <div className="flex flex-col gap-12 w-full overflow-hidden">
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Projects</h2>
        <div className="h-1 w-12 bg-white/30 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {PROJECTS.map((project) => (
          <div key={project.title} className="group relative flex flex-col gap-6 rounded-[2.5rem] p-8 bg-[rgba(10,10,10,0.4)] backdrop-blur-[24px] saturate-[180%] border border-white/[0.08] shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2),inset_0_1px_1px_0_rgba(255,255,255,0.05)] transition-all duration-700 hover:scale-[1.005] hover:bg-black/40 hover:border-white/20 w-full overflow-hidden">
            <div className="flex flex-col gap-2 min-w-0">
              <h3 className="text-2xl font-bold text-white tracking-tight truncate">{project.title}</h3>
              <div className="flex items-center text-sm font-medium text-white/60 gap-2 w-full">
                <FaLink className="text-xs shrink-0" />
                <Link 
                  href={project.link} 
                  target="_blank" 
                  className="hover:text-white transition-colors duration-300 truncate min-w-0"
                >
                  {project.link.replace(/^https?:\/\//, '')}
                </Link>
              </div>
            </div>

            <p className="text-white/80 text-lg leading-relaxed">{project.description}</p>
            
            <ul className="flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <li 
                  key={feature} 
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-white/70"
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
