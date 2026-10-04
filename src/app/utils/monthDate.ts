import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const MONTH_YEAR_FORMATS = ["MMMM YYYY", "MMM YYYY"] as const;

export function parseMonthYear(value: string): Dayjs | null {
  for (const format of MONTH_YEAR_FORMATS) {
    const parsed = dayjs(value, format, true);
    if (parsed.isValid()) return parsed;
  }
  return null;
}
