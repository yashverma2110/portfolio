import EXPERIENCE from "@/app/config/experience";
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
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Experience</h2>
        <div className="h-1 w-12 bg-white/30 rounded-full" />
      </div>

      <div className="flex flex-col gap-12">
        {EXPERIENCE.map((experience) => (
          <div key={experience.company} className="relative rounded-[2.5rem] bg-white/[0.02] backdrop-blur-md border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.12] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-0">
              {/* Left Side: Sidebar/Header in Card */}
              <div className="p-8 lg:p-12 bg-white/[0.01] border-b lg:border-b-0 lg:border-r border-white/[0.05] flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-words">{experience.company}</h3>
                    <p className="text-xl text-blue-500 font-semibold break-words">{experience.role}</p>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-2 text-white/60">
                      <span className="text-sm font-medium uppercase tracking-wider">{experience.startDate} — {experience.endDate}</span>
                    </div>
                    <span className="text-sm text-white/50 font-medium">
                      {getDuration(experience.startDate, experience.current ? dayjs().format("MMM YYYY") : experience.endDate)}
                    </span>
                  </div>
                </div>
                
                {experience.achievements && experience.achievements.length > 0 && (
                  <div className="flex flex-col gap-3 pt-4 border-t border-white/[0.05]">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Key Achievements</h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2.5 text-sm text-white/70">
                          <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-500/80" />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Side: Responsibilities Grid */}
              <div className="p-8 lg:p-12 flex flex-col gap-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Key Responsibilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.responsibilities.map((responsibility) => (
                    <div 
                      key={responsibility.title} 
                      className="group flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                    >
                      <h5 className="text-base font-semibold text-white group-hover:text-white transition-colors">{responsibility.title}</h5>
                      <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">{responsibility.description}</p>
                      {responsibility.technologies && responsibility.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {responsibility.technologies.map((tech) => (
                            <span key={tech} className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[11px] font-medium text-white/70">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {responsibility.metrics.length > 0 && (
                        <div className="mt-auto pt-3 border-t border-white/[0.06] space-y-2">
                          {responsibility.metrics.map((metric) => (
                            <div key={metric} className="flex items-start gap-2.5 text-xs text-blue-400/90 group-hover:text-blue-400 transition-colors">
                              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/60 group-hover:bg-blue-500 transition-all" />
                              <p className="leading-relaxed font-medium">{metric}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
