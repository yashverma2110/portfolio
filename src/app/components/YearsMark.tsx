"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { parseMonthYear } from "@/app/utils/monthDate";

export default function YearsMark({ startDate, initial }: { startDate: string; initial: string }) {
  const [label, setLabel] = useState(initial);

  useEffect(() => {
    const start = parseMonthYear(startDate);
    if (!start) return;
    const months = dayjs().diff(start, "months");
    if (!Number.isFinite(months) || months < 0) return;
    setLabel(`${Math.floor(months / 12)}+ years`);
  }, [startDate]);

  return <span className="years-mark">{label}</span>;
}
