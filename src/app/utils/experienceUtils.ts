import dayjs from "dayjs";
import EXPERIENCE from "@/app/config/experience";

export function getTotalYears() {
  let totalYears = 0;
  let totalMonths = 0;

  for (const experience of EXPERIENCE) {
    if (experience.current) {
      totalYears += dayjs().diff(dayjs(experience.startDate), "years");
      totalMonths += dayjs().diff(dayjs(experience.startDate), "months") - (12 * totalYears);
    } else {
      const yearsElapsed = dayjs(experience.endDate).diff(dayjs(experience.startDate), "years");
      const months = dayjs(experience.endDate).diff(dayjs(experience.startDate), "months") - (12 * yearsElapsed);
      if (months > 0) {
        totalMonths += months;
      }
      if (yearsElapsed > 0) {
        totalYears += yearsElapsed;
      }
    }
  }

  const years = totalYears + Math.floor(totalMonths / 12);

  return totalMonths > 0 ? `${years}+ years` : years;
}
