// Shared profile copy. The homepage and the llms.txt routes read from here, so they never drift apart.

export const PROFILE = {
  name: "Yash Verma",
  location: "Bangalore, India",
  openTo: "Open to remote roles and roles outside India.",
  education: {
    degree: "B.Tech",
    field: "Computer Science and Engineering",
    school: "IIIT Una",
    schoolFull: "Indian Institute of Information Technology, Una",
    start: "2018",
    end: "2022",
  },
};

/** Positioning is senior (not staff), per Yash. The layout title, homepage eyebrow, card, and llms.txt read these. */
export const POSITIONING = {
  title: "Yash Verma | Senior Backend and AI Engineer",
  eyebrow: "Senior software engineer · Backend, data, and LLM agents",
  jobTitle: "Senior Software Engineer",
  card: {
    headline: "Senior backend and AI engineer",
    openTo: "Open to senior backend and AI roles at Series A startups.",
    alt: "Yash Verma, senior backend and AI engineer",
  },
};

export function educationText() {
  const { degree, field, school, schoolFull, start, end } = PROFILE.education;
  return `${degree} in ${field}, ${school} (${schoolFull}), ${start} to ${end}`;
}

/** Short form for the homepage Education section. */
export function educationLine() {
  const { degree, field, school, start, end } = PROFILE.education;
  return `${degree} in ${field}, ${school}, ${start} to ${end}.`;
}

/** The intro is split around the years figure, which the homepage renders with <YearsMark />. */
export const INTRO = {
  lead: "I build backend systems and LLM agents that run in production.",
  rest: "building data pipelines, search, and AI agents, and cutting the infrastructure cost behind them. I lead a small team and own work from the first design to on-call. Looking for a senior backend or AI engineering role at a Series A startup.",
};

export function introText(years: string) {
  return `${INTRO.lead} ${years} ${INTRO.rest}`;
}

/** Display name for a company. Quizizz now does business as Wayground. */
export function companyName(company: string) {
  if (company.startsWith("Quizizz")) return "Quizizz (DBA Wayground)";
  return company;
}
