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
          <div key={experience.company} className="rounded-[2.5rem] bg-[rgba(10,10,10,0.4)] backdrop-blur-[24px] saturate-[180%] border border-white/[0.08] shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2),inset_0_1px_1px_0_rgba(255,255,255,0.05)] transition-all duration-700 hover:scale-[1.005] hover:bg-black/40 hover:border-white/20 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-0">
              {/* Left Side: Sidebar/Header in Card */}
              <div className="p-8 lg:p-12 bg-white/[0.03] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-words">{experience.company}</h3>
                    <p className="text-xl text-blue-500 font-semibold break-words">{experience.role}</p>
                  </div>
                  <div className="flex flex-col gap-1 mt-4">
                    <div className="flex items-center gap-2 text-white/60">
                      <span className="text-sm font-medium uppercase tracking-wider">{experience.startDate} — {experience.endDate}</span>
                    </div>
                    <span className="text-sm text-white/50 font-medium">
                      {getDuration(experience.startDate, experience.current ? dayjs().format("MMM YYYY") : experience.endDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Responsibilities Grid */}
              <div className="p-8 lg:p-12 flex flex-col gap-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Key Responsibilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {experience.responsibilities.map((responsibility) => (
                    <div key={responsibility.title} className="flex flex-col gap-3 group">
                      <h5 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors">{responsibility.title}</h5>
                      <p className="text-sm text-white/70 leading-relaxed group-hover:text-white transition-colors">{responsibility.description}</p>
                      {responsibility.metrics.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {responsibility.metrics.map((metric) => (
                            <div key={metric} className="flex items-start gap-3 text-xs text-white/60 group-hover:text-white transition-colors">
                              <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500/70 group-hover:bg-blue-500 transition-all" />
                              <p className="leading-relaxed">{metric}</p>
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
