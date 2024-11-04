import Link from "next/link";
import { FaLink } from "react-icons/fa";
import PROJECTS from "@/app/config/projects";
import Button from "@/app/components/ui/Button";

export default function ProjectsFold() {
  return (
    <div className="py-20">
      <h2 className="text-2xl mb-6 font-bold text-neutral-500">Projects</h2>
      <div>
        {PROJECTS.map((project) => (
          <div key={project.title} className="text-white">
            <h3 className="text-lg md:text-xl font-bold">{project.title}</h3>
            <div className="flex items-center text-sm md:text-base text-blue-500 gap-2">
              <FaLink />
              <Link href={project.link} target="_blank">{project.link}</Link>
            </div>
            <hr className="mt-2 border-slate-700" />
            <p className="text-sm md:text-lg mt-2">{project.description}</p>
            <ul className="list-disc mt-2 list-inside text-sm md:text-lg">
              {project.features.map((feature) => (
                <li key={feature} className="my-1">{feature}</li>
              ))}
            </ul>
            <Button className="mt-4" size="sm">
              <Link href={project.link} target="_blank">Visit</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
