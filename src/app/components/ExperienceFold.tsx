import EXPERIENCE from "@/app/config/experience";
import Card from "@/app/components/ui/Card";
import dayjs from "dayjs";

export default function ExperienceFold() {
  function getDuration(startDate: string, endDate: string) {
    const years = dayjs(endDate).diff(dayjs(startDate), "years");
    const months = dayjs(endDate).diff(dayjs(startDate), "months") - (12 * years);

    if (years === 0) {
      return `${months + 1} months`;
    }

    if (months <= 0) {
      return `${years} years`;
    }

    return `${years} years ${months + 1} months`;
  }

  return (
    <div className="flex flex-col gap-12 py-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">Experience</h2>
        <div className="h-1 w-12 bg-white/20 rounded-full" />
      </div>

      <div className="flex flex-col gap-20">
        {EXPERIENCE.map((experience) => (
          <div key={experience.company} className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8 lg:gap-16">
            <div className="flex flex-col gap-2">
              <h3 className="text-3xl font-bold text-white tracking-tight">{experience.company}</h3>
              <p className="text-xl text-white/60 font-medium">{experience.role}</p>
              <div className="flex flex-col gap-1 mt-2">
                <p className="text-sm text-white/40 font-medium uppercase tracking-wider">
                  {experience.startDate} — {experience.endDate}
                </p>
                <p className="text-sm text-white/40 font-medium">
                  {getDuration(experience.startDate, experience.current ? dayjs().format("MMM YYYY") : experience.endDate)}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/30">Key Responsibilities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experience.responsibilities.map((responsibility) => (
                  <Card key={responsibility.title} className="!p-6 !rounded-3xl">
                    <h5 className="text-lg font-bold text-white mb-2">{responsibility.title}</h5>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">{responsibility.description}</p>
                    {responsibility.metrics.length > 0 && (
                      <div className="pt-4 border-t border-white/5">
                        <ul className="space-y-2">
                          {responsibility.metrics.map((metric) => (
                            <li key={metric} className="text-xs text-white/40 flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
