// Quizizz impact, grouped into stories and tagged by charter.
// Metric sentences stay in experience.ts. This file says which story a result belongs to,
// which charters it counts toward, and which duties supply the "what I did" line.
// A result can count in more than one charter. Facts are not counted.

export const CHARTERS = ["Frontend", "Backend", "Data", "AI", "Infra", "Leadership"] as const;
export type Charter = (typeof CHARTERS)[number];

export type ImpactResult = {
  /** Display label. Must match a PILL_COPY label parsed from the Quizizz job. */
  label: string;
  charters: Charter[];
};

export type ImpactFact = {
  label: string;
  charters: Charter[];
  /** Substring that must exist in the Quizizz job config. Keeps the chip tied to a real line. */
  source: string;
};

export type ImpactStoryConfig = {
  id: string;
  title: string;
  /** New copy, one line, for Yash to edit. */
  problem: string;
  /** Responsibility titles, in order. Their descriptions are joined into "what I did". */
  duties: string[];
  /** First result is the big number. Every later result is a chip, in this order. */
  results: ImpactResult[];
  facts?: ImpactFact[];
  /** Blog slug. The "Read case study" link renders only when that post exists. */
  caseStudy?: string;
};

export type ImpactStripItem = {
  label: string;
  /** Replaces the words after the figure. Use only to name a unit already in the source metric. */
  caption?: string;
};

const FE: Charter = "Frontend";
const BE: Charter = "Backend";
const DA: Charter = "Data";
const AI: Charter = "AI";
const IN: Charter = "Infra";
const LE: Charter = "Leadership";

export const QUIZIZZ_COMPANY = "Quizizz Inc.";

export const QUIZIZZ_STORIES: ImpactStoryConfig[] = [
  {
    id: "search",
    title: "Search migration",
    problem: "Search ran on separate OpenSearch indexes.",
    duties: ["Search on Postgres", "Search results"],
    results: [
      { label: "$270k saved on search", charters: [BE, DA, IN, LE] },
      { label: "23% faster search", charters: [BE] },
      { label: "1.2% more successful searches", charters: [FE, BE] },
    ],
    facts: [
      { label: "Team of 5 owns search on Postgres", charters: [LE], source: "search on Postgres" },
    ],
  },
  {
    id: "waygent",
    title: "Waygent: AI analytics agent on Slack",
    problem: "Sales, GTM, and customer success teams waited on data analysts for answers across BigQuery, Outreach, HubSpot, and Braze.",
    duties: ["Waygent"],
    results: [
      { label: "60% faster customer reach-out", charters: [AI, DA, BE, LE] },
      { label: "30% faster deal velocity", charters: [AI, DA, BE, LE] },
      { label: "2x lead quality", charters: [AI, DA, BE, LE] },
    ],
    facts: [
      { label: "Analysts freed to focus on product", charters: [AI, DA], source: "Data analysts could focus on product work." },
      { label: "Team of 5 owns Waygent", charters: [LE], source: "Waygent" },
    ],
  },
  {
    id: "page-speed",
    title: "Page speed and SSR",
    problem: "Pages were slow, and static pages still called the server.",
    duties: ["Server-side rendering", "Static page pipeline", "Website performance"],
    results: [
      { label: "63% faster page load", charters: [FE] },
      { label: "10%+ weekly active teachers", charters: [FE] },
      { label: "5% more registrations", charters: [FE] },
      { label: "15% more registrations from organic traffic", charters: [FE, LE] },
      { label: "12% faster first byte", charters: [FE, BE, IN] },
      { label: "31% faster largest paint", charters: [FE, BE, IN] },
      { label: "1% more new users activated", charters: [FE] },
    ],
    facts: [
      { label: "Led a team of 2 on Nuxt SSR/SSG", charters: [LE, FE], source: "I led a team of 2 engineers on the Nuxt SSR and SSG service." },
    ],
  },
  {
    id: "reliability",
    title: "Reliability and infra cost",
    problem: "Deploys and infrastructure were costly, and P0s were frequent.",
    duties: ["Canary deployments", "ECS auto-scaling", "Less data transfer", "BigQuery streaming"],
    results: [
      { label: "83% fewer P0s", charters: [IN] },
      { label: "$120k saved on BigQuery", charters: [DA, IN] },
      { label: "$100k less data transfer", charters: [BE, IN] },
      { label: "10% lower AWS cost", charters: [IN] },
    ],
    facts: [
      { label: "Top on-call engineer in the company", charters: [LE, IN], source: "top on-call engineer" },
    ],
  },
  {
    id: "analytics",
    title: "Product Analytics platform",
    problem: "The product needed reliable data and faster A/B decisions.",
    duties: ["Analytics pipeline", "Analytics client", "Product Analytics platform"],
    results: [
      { label: "300k requests a minute", charters: [BE, DA] },
      { label: "99.99% uptime", charters: [BE, DA] },
      { label: "15% less data lost", charters: [FE, DA] },
      { label: "A/B releases from 2 weeks to 1 week", charters: [FE, BE, DA, LE] },
      { label: "2% more registration completions", charters: [FE, BE, DA, LE] },
      { label: "0.5% more games created", charters: [FE, BE, DA, LE] },
    ],
    facts: [
      { label: "Team of 5 owns this platform", charters: [LE], source: "Product Analytics platform" },
      { label: "All microfrontends adopted the SDK", charters: [LE, FE], source: "All microfrontends adopted the SDK." },
    ],
  },
  {
    id: "editors",
    title: "Editors, AI and team productivity",
    problem: "The editors were buggy, and builds were slow.",
    duties: ["Quiz and lesson editor", "AI features", "Google Drive import", "Data ingestion pipeline", "Tool migration", "Build time"],
    results: [
      { label: "98% fewer bug reports", charters: [FE] },
      { label: "2.3% more lesson use", charters: [AI] },
      { label: "56% of content from Google Drive", charters: [AI] },
      { label: "500k+ rows ingested", charters: [BE, DA] },
      { label: "50% faster builds", charters: [FE, IN] },
      { label: "15% faster builds", charters: [IN] },
    ],
  },
];

/** Unfiltered summary strip, in order. The p75 caption names the unit already in the page-load metric. */
export const QUIZIZZ_SUMMARY: ImpactStripItem[] = [
  { label: "$270k saved on search" },
  { label: "63% faster page load", caption: "faster page load (p75)" },
  { label: "83% fewer P0s" },
  { label: "10%+ weekly active teachers" },
];

/** Top 4 results per charter, in strip order. Each one must be tagged with that charter. */
export const QUIZIZZ_TOP: Record<Charter, string[]> = {
  Frontend: ["63% faster page load", "10%+ weekly active teachers", "98% fewer bug reports", "50% faster builds"],
  Backend: ["$270k saved on search", "300k requests a minute", "$100k less data transfer", "23% faster search"],
  Data: ["$120k saved on BigQuery", "300k requests a minute", "60% faster customer reach-out", "500k+ rows ingested"],
  AI: ["60% faster customer reach-out", "2x lead quality", "30% faster deal velocity", "56% of content from Google Drive"],
  Infra: ["$270k saved on search", "83% fewer P0s", "$120k saved on BigQuery", "$100k less data transfer"],
  Leadership: ["$270k saved on search", "60% faster customer reach-out", "2x lead quality", "15% more registrations from organic traffic"],
};
