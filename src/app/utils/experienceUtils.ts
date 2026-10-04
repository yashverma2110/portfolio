import dayjs from "dayjs";
import EXPERIENCE from "@/app/config/experience";
import { parseMonthYear } from "@/app/utils/monthDate";

function isFullTime(role: string) {
  return !/intern/i.test(role);
}

export function getTotalYears() {
  let totalMonths = 0;

  for (const experience of EXPERIENCE) {
    if (!isFullTime(experience.role)) continue;
    const start = parseMonthYear(experience.startDate);
    if (!start) continue;
    const end =
      experience.current || experience.endDate === "Current" ? dayjs() : parseMonthYear(experience.endDate);
    if (!end) continue;
    const months = end.diff(start, "months");
    if (months > 0) totalMonths += months;
  }

  const years = Math.floor(totalMonths / 12);
  return `${years}+ years`;
}
