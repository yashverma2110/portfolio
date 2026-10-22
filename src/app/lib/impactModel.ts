import EXPERIENCE from "@/app/config/experience";
import {
  CHARTERS,
  QUIZIZZ_COMPANY,
  QUIZIZZ_STORIES,
  QUIZIZZ_SUMMARY,
  QUIZIZZ_TOP,
  type Charter,
  type ImpactStoryConfig,
} from "@/app/config/impact";
import { companyName } from "@/app/config/profile";
import { getPost } from "@/app/lib/blog";
import { PILL_COPY, labelsFor } from "@/app/lib/metrics";
import type { IExperience } from "@/app/types/experience";

const EXPECTED_COUNTS: Record<Charter, number> = {
  Frontend: 14,
  Backend: 15,
  Data: 12,
  AI: 5,
  Infra: 9,
  Leadership: 8,
};

export function charterSlug(charter: string) {
  return charter.toLowerCase();
}

export function splitLabel(label: string, caption?: string) {
  const space = label.indexOf(" ");
  const figure = space === -1 ? label : label.slice(0, space);
  const rest = space === -1 ? "" : label.slice(space + 1);
  return { figure, caption: caption ?? rest };
}

function fail(message: string): never {
  throw new Error(`[impact] ${message}`);
}

type ParsedMetric = { label: string; source: string };

function parseJob(job: IExperience): ParsedMetric[] {
  const found: ParsedMetric[] = [];
  const take = (text: string) => {
    for (const sentence of text.split(/(?<=\.)\s+/)) {
      for (const key of labelsFor(sentence)) {
        const copy = PILL_COPY[key];
        if (!copy) fail(`No pill label for parsed key "${key}" from: ${sentence}`);
        found.push({ label: copy.label, source: sentence.trim() });
      }
    }
  };
  job.achievements?.forEach(take);
  for (const duty of job.responsibilities) duty.metrics.forEach(take);
  return found;
}

function jobCorpus(job: IExperience) {
  return [
    job.summary ?? "",
    ...(job.achievements ?? []),
    ...job.responsibilities.flatMap((duty) => [duty.title, duty.description, ...duty.metrics]),
  ].join("\n");
}

function dutySentences(job: IExperience, titles: string[]) {
  return titles.map((title) => {
    const duty = job.responsibilities.find((item) => item.title === title);
    if (!duty) fail(`Story names a responsibility that is not in the job: "${title}".`);
    return duty.description.trim();
  });
}

export type BuiltChip = { label: string; charters: string; source: string };
export type BuiltCallout = { slug: string; charter: string; label: string };
export type BuiltStory = {
  id: string;
  title: string;
  problem: string;
  did: string;
  charters: string;
  tags: { slug: string; name: string }[];
  headline: { figure: string; caption: string; charters: string; label: string };
  chips: BuiltChip[];
  facts: BuiltChip[];
  callouts: BuiltCallout[];
  caseStudy?: { href: string; title: string };
};
export type BuiltStrip = {
  slug: string;
  stats: { figure: string; caption: string }[];
  strong: string;
  rest: string;
  line2?: string;
  seeAll: boolean;
};
export type CoverageCell = { count: number; fact: boolean };
export type BuiltCharter = { slug: string; name: Charter; count: number };

export type BuiltImpact = {
  anchorId: string;
  displayCompany: string;
  role: string;
  dates: string;
  total: number;
  storyCount: number;
  charterCount: number;
  charters: BuiltCharter[];
  strips: BuiltStrip[];
  stories: BuiltStory[];
  coverage: { title: string; cells: CoverageCell[] }[];
};

function slugs(charters: readonly Charter[]) {
  return charters.map(charterSlug).join(" ");
}

function assertModel(job: IExperience, parsed: ParsedMetric[]) {
  const byLabel = new Map<string, ParsedMetric[]>();
  for (const metric of parsed) {
    const list = byLabel.get(metric.label) ?? [];
    list.push(metric);
    byLabel.set(metric.label, list);
  }
  for (const [label, list] of byLabel) {
    if (list.length > 1) fail(`Label "${label}" is parsed more than once.`);
  }

  const seen = new Map<string, string>();
  for (const story of QUIZIZZ_STORIES) {
    if (story.results.length === 0) fail(`Story "${story.title}" has no results.`);
    const labels = new Set<string>();
    for (const result of story.results) {
      if (!byLabel.has(result.label)) fail(`Story "${story.title}" lists "${result.label}", which is not parsed from ${QUIZIZZ_COMPANY}.`);
      if (result.charters.length === 0) fail(`"${result.label}" has no charter.`);
      if (labels.has(result.label)) fail(`"${result.label}" is listed twice in "${story.title}".`);
      labels.add(result.label);
      const previous = seen.get(result.label);
      if (previous) fail(`"${result.label}" is in both "${previous}" and "${story.title}".`);
      seen.set(result.label, story.title);
    }
    const dutyLabels = new Set<string>();
    for (const title of story.duties) {
      const duty = job.responsibilities.find((item) => item.title === title);
      if (!duty) fail(`Story "${story.title}" names a missing responsibility "${title}".`);
      for (const metric of duty.metrics) {
        for (const key of labelsFor(metric)) {
          const copy = PILL_COPY[key];
          if (copy) dutyLabels.add(copy.label);
        }
      }
    }
    for (const label of dutyLabels) {
      if (!labels.has(label)) fail(`"${label}" comes from a duty on "${story.title}" but is not one of that story's results.`);
    }
    for (const fact of story.facts ?? []) {
      if (byLabel.has(fact.label)) fail(`Fact "${fact.label}" uses a counted result label.`);
      if (!jobCorpus(job).includes(fact.source)) fail(`Fact "${fact.label}" source is not in the Quizizz config: ${fact.source}`);
    }
  }

  for (const label of byLabel.keys()) {
    if (!seen.has(label)) fail(`Parsed Quizizz result "${label}" is not assigned to a story.`);
  }
  if (seen.size !== 29) fail(`Expected 29 Quizizz results, found ${seen.size}.`);

  const counts = Object.fromEntries(CHARTERS.map((charter) => [charter, 0])) as Record<Charter, number>;
  for (const story of QUIZIZZ_STORIES) {
    for (const result of story.results) {
      for (const charter of result.charters) counts[charter] += 1;
    }
  }
  for (const charter of CHARTERS) {
    if (counts[charter] !== EXPECTED_COUNTS[charter]) {
      fail(`${charter} count is ${counts[charter]}, expected ${EXPECTED_COUNTS[charter]}.`);
    }
    const top = QUIZIZZ_TOP[charter];
    if (top.length !== 4 || new Set(top).size !== 4) fail(`${charter} strip must be 4 different results.`);
    for (const label of top) {
      const result = QUIZIZZ_STORIES.flatMap((story) => story.results).find((item) => item.label === label);
      if (!result) fail(`${charter} strip lists unknown result "${label}".`);
      if (!result.charters.includes(charter)) fail(`${charter} strip lists "${label}", which is not tagged ${charter}.`);
    }
  }
  for (const item of QUIZIZZ_SUMMARY) {
    if (!seen.has(item.label)) fail(`Summary strip lists unknown result "${item.label}".`);
  }
}

function storyCharters(story: ImpactStoryConfig): Charter[] {
  const set = new Set<Charter>();
  for (const result of story.results) result.charters.forEach((charter) => set.add(charter));
  for (const fact of story.facts ?? []) fact.charters.forEach((charter) => set.add(charter));
  return CHARTERS.filter((charter) => set.has(charter));
}

function calloutsFor(story: ImpactStoryConfig): BuiltCallout[] {
  const headline = story.results[0];
  const rest = story.results.slice(1);
  const out: BuiltCallout[] = [];
  for (const charter of CHARTERS) {
    if (headline.charters.includes(charter)) continue;
    const best = rest.find((result) => result.charters.includes(charter));
    if (!best) continue;
    out.push({ slug: charterSlug(charter), charter, label: best.label });
  }
  return out;
}

function caseStudy(slug: string | undefined) {
  if (!slug) return undefined;
  const post = getPost(slug);
  if (!post) return undefined;
  return { href: `/blog/${post.slug}`, title: post.title };
}

export function buildQuizizzImpact(): BuiltImpact {
  const job = EXPERIENCE.find((item) => item.company === QUIZIZZ_COMPANY);
  if (!job) fail(`No experience entry for ${QUIZIZZ_COMPANY}.`);
  const parsed = parseJob(job);
  assertModel(job, parsed);
  const sources = new Map(parsed.map((metric) => [metric.label, metric.source]));
  const displayCompany = companyName(job.company);
  const counts = EXPECTED_COUNTS;
  const charters: BuiltCharter[] = CHARTERS.map((name) => ({ slug: charterSlug(name), name, count: counts[name] }));
  const total = parsed.length;

  const strips: BuiltStrip[] = [
    {
      slug: "all",
      stats: QUIZIZZ_SUMMARY.map((item) => splitLabel(item.label, item.caption)),
      strong: `${total} results`,
      rest: `at ${displayCompany}`,
      line2: `across ${QUIZIZZ_STORIES.length} stories and ${CHARTERS.length} charters`,
      seeAll: true,
    },
    ...CHARTERS.map((charter) => ({
      slug: charterSlug(charter),
      stats: QUIZIZZ_TOP[charter].map((label) => splitLabel(label)),
      strong: `${counts[charter]} of ${total} results`,
      rest: `are ${charter}`,
      seeAll: false,
    })),
  ];

  const stories: BuiltStory[] = QUIZIZZ_STORIES.map((story) => {
    const tags = storyCharters(story);
    const headline = story.results[0];
    const headlineParts = splitLabel(headline.label);
    return {
      id: story.id,
      title: story.title,
      problem: story.problem,
      did: dutySentences(job, story.duties).join(" "),
      charters: slugs(tags),
      tags: tags.map((name) => ({ slug: charterSlug(name), name })),
      headline: {
        ...headlineParts,
        label: headline.label,
        charters: slugs(headline.charters),
      },
      chips: story.results.slice(1).map((result) => ({
        label: result.label,
        charters: slugs(result.charters),
        source: sources.get(result.label) ?? result.label,
      })),
      facts: (story.facts ?? []).map((fact) => ({
        label: fact.label,
        charters: slugs(fact.charters),
        source: fact.source,
      })),
      callouts: calloutsFor(story),
      caseStudy: caseStudy(story.caseStudy),
    };
  });

  const coverage = stories.map((story, index) => {
    const config = QUIZIZZ_STORIES[index];
    return {
      title: story.title,
      cells: CHARTERS.map((charter) => ({
        count: config.results.filter((result) => result.charters.includes(charter)).length,
        fact: (config.facts ?? []).some((fact) => fact.charters.includes(charter)),
      })),
    };
  });

  return {
    anchorId: `impact-${displayCompany.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    displayCompany,
    role: job.role,
    dates: `${job.startDate} — ${job.endDate}`,
    total,
    storyCount: stories.length,
    charterCount: CHARTERS.length,
    charters,
    strips,
    stories,
    coverage,
  };
}
