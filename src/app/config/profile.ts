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
  title: "Yash Verma | Senior Full-Stack Engineer",
  eyebrow: "Senior software engineer · Full-stack, backend, and analytics",
  jobTitle: "Senior Software Engineer",
  card: {
    headline: "Senior full-stack engineer",
    openTo: "Open to product, full-stack, backend, and frontend roles.",
    alt: "Yash Verma, senior full-stack engineer",
  },
};

export function educationText() {
  const { degree, field, school, schoolFull, start, end } = PROFILE.education;
  return `${degree} in ${field}, ${school} (${schoolFull}), ${start} to ${end}`;
}

/** The intro is split around the years figure, which the homepage renders with <YearsMark />. */
export const INTRO = {
  lead: "I build products and the systems behind them.",
  rest: "shipping features, shaping roadmaps, and owning the analytics, page speed, and infrastructure that keep things running in production. Comfortable anywhere in the stack, and looking for my next product, full-stack, backend, or frontend role.",
};

export function introText(years: string) {
  return `${INTRO.lead} ${years} ${INTRO.rest}`;
}

/** Display name for a company. Quizizz now does business as Wayground. */
export function companyName(company: string) {
  if (company.startsWith("Quizizz")) return "Quizizz (DBA Wayground)";
  return company;
}
