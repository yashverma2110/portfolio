// Shared profile copy. The homepage and the llms.txt routes read from here, so they never drift apart.

export const PROFILE = {
  name: "Yash Verma",
  location: "Bangalore, India",
  openTo: "Open to remote roles and roles outside India.",
  education: "IIIT Una (Indian Institute of Information Technology, Una)",
};

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
