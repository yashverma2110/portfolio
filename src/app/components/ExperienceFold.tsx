import { FaBriefcase, FaClock } from "react-icons/fa";
import EXPERIENCE from "@/app/config/experience";
import Card from "@/app/components/ui/Card";

export default function ExperienceFold() {
  return (
    <div className="flex flex-col gap-2 py-20">
      <h2 className="text-2xl font-bold text-neutral-500">Experience</h2>
      {EXPERIENCE.map((experience) => (
        <div key={experience.company} className="text-white">
          <h2 className="text-base md:text-2xl font-bold">{experience.company}</h2>
          <h3 className="flex items-center gap-2 text-blue-500 text-sm md:text-xl">
            <FaBriefcase /> {experience.role}
          </h3>
          <p className="flex items-center gap-2 text-xs md:text-base">
            <FaClock /> {experience.duration}
          </p>

          <h4 className="mt-4 text-neutral-400 text-sm md:text-lg font-bold">Responsibilities</h4>
          <div className="mt-4 flex gap-4 max-w-full overflow-x-auto rounded-lg">
            {experience.responsibilities.map((responsibility) => (
              <Card key={responsibility.title}>
                <h5 className="text-sm md:text-lg font-bold">{responsibility.title}</h5>
                <p className="text-xs md:text-base">{responsibility.description}</p>
                {
                  responsibility.metrics.length > 0 && (
                    <>
                      <p className="font-semibold mt-2 text-xs md:text-base text-neutral-400">Key improvements:</p>
                      <ul className="list-disc list-inside text-xs md:text-base">
                        {responsibility.metrics.map((metric) => (
                          <li key={metric}>{metric}</li>
                        ))}
                      </ul>
                    </>
                  )
                }
              </Card>
            ))}
          </div>
          <hr className="mt-8 border-slate-700" />
        </div>
      ))}
    </div>
  );
}
