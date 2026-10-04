import dayjs from "dayjs";
import EXPERIENCE from "@/app/config/experience";

function isFullTime(role: string) {
  return !/intern/i.test(role);
}

export function getTotalYears() {
  let totalMonths = 0;

  for (const experience of EXPERIENCE) {
    if (!isFullTime(experience.role)) continue;
    const end = experience.current || experience.endDate === "Current" ? dayjs() : dayjs(experience.endDate);
    const months = end.diff(dayjs(experience.startDate), "months");
    if (months > 0) totalMonths += months;
  }

  const years = Math.floor(totalMonths / 12);
  return `${years}+ years`;
}
