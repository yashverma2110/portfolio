"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function YearsMark({ startDate, initial }: { startDate: string; initial: string }) {
  const [label, setLabel] = useState(initial);

  useEffect(() => {
    const months = dayjs().diff(dayjs(startDate), "months");
    const years = Math.floor(months / 12);
    setLabel(`${years}+ years`);
  }, [startDate]);

  return <span className="years-mark">{label}</span>;
}
