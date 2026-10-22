// Turns a metric sentence from experience.ts into the short label on an impact chip.
// The sentence in config stays as written. Add a key here when a new sentence should show up.
export type PillCategory = "Product" | "Performance" | "Productivity" | "Cost and reliability";

export const PILL_CATEGORIES: PillCategory[] = ["Product", "Performance", "Productivity", "Cost and reliability"];

export const PILL_COPY: Record<string, { label: string; category: PillCategory }> = {
  "10%+ weekly active teachers": { label: "10%+ weekly active teachers", category: "Product" },
  "5% registrations": { label: "5% more registrations", category: "Product" },
  "2% registration funnels": { label: "2% more registration completions", category: "Product" },
  "0.5% game creation rate": { label: "0.5% more games created", category: "Product" },
  "1% new user activation": { label: "1% more new users activated", category: "Product" },
  "2.3% lesson adoption": { label: "2.3% more lesson use", category: "Product" },
  "56% platform content": { label: "56% of content from Google Drive", category: "Product" },
  "1.2% search success rate": { label: "1.2% more successful searches", category: "Product" },
  "15% user registration from organic traffic": { label: "15% more registrations from organic traffic", category: "Product" },
  "60% less customer reach-out delays": { label: "60% faster customer reach-out", category: "Product" },
  "30% deal velocity": { label: "30% faster deal velocity", category: "Product" },
  "2x lead quality": { label: "2x lead quality", category: "Product" },
  "300k peak rate": { label: "300k requests a minute", category: "Performance" },
  "99.99% service level": { label: "99.99% uptime", category: "Performance" },
  "12% time to first byte": { label: "12% faster first byte", category: "Performance" },
  "31% largest contentful paint": { label: "31% faster largest paint", category: "Performance" },
  "63% less page load time at p75": { label: "63% faster page load", category: "Performance" },
  "23% search response at p99": { label: "23% faster search", category: "Performance" },
  "60% website performance": { label: "60% faster site", category: "Performance" },
  "40% lighthouse score": { label: "40% higher Lighthouse score", category: "Performance" },
  "2 weeks → 1 week": { label: "A/B releases from 2 weeks to 1 week", category: "Productivity" },
  "15% less build time": { label: "15% faster builds", category: "Productivity" },
  "50% less build time": { label: "50% faster builds", category: "Productivity" },
  "500k+ rows": { label: "500k+ rows ingested", category: "Productivity" },
  "10% less AWS cost": { label: "10% lower AWS cost", category: "Cost and reliability" },
  "83% less P0 incidents": { label: "83% fewer P0s", category: "Cost and reliability" },
  "15% less data loss": { label: "15% less data lost", category: "Cost and reliability" },
  "98% less bug reports": { label: "98% fewer bug reports", category: "Cost and reliability" },
  "$270k saved": { label: "$270k saved on search", category: "Cost and reliability" },
  "$100k saved": { label: "$100k less data transfer", category: "Cost and reliability" },
  "$120k saved": { label: "$120k saved on BigQuery", category: "Cost and reliability" },
};

function topicOf(value: string) {
  const topic = value.replace(/^(The|A|An)\s+/i, "").trim();
  return topic.replace(/^([A-Z])([a-z])/, (_, first: string, second: string) => first.toLowerCase() + second);
}

/** Parsed chip keys for one piece of experience copy. One sentence can carry one key. */
export function labelsFor(text: string) {
  const labels: string[] = [];
  for (const sentence of text.split(/(?<=\.)\s+/)) {
    const more = sentence.match(/^(?:The |A |An )?(.+?) increased by more than ([\d,.]+)%/i);
    if (more) {
      labels.push(`${more[2].replace(/,/g, "")}%+ ${topicOf(more[1])}`);
      continue;
    }
    const increased = sentence.match(/^(?:The |A |An )?(.+?) increased by ([\d,.]+)%/i);
    if (increased) {
      labels.push(`${increased[2]}% ${topicOf(increased[1])}`);
      continue;
    }
    const decreased = sentence.match(/^(?:The |A |An )?(.+?) decreased by ([\d,.]+)%/i);
    if (decreased) {
      labels.push(`${decreased[2]}% less ${topicOf(decreased[1])}`);
      continue;
    }
    const times = sentence.match(/^(?:The |A |An )?(.+?) improved by ([\d.]+)x/i);
    if (times) {
      labels.push(`${times[2]}x ${topicOf(times[1])}`);
      continue;
    }
    const improved = sentence.match(/^(?:The |A |An )?(.+?) improved by ([\d,.]+)%/i);
    if (improved) {
      labels.push(`${improved[2]}% ${topicOf(improved[1])}`);
      continue;
    }
    const weeks = sentence.match(/from (\d+) weeks to (\d+) week/i);
    if (weeks) {
      labels.push(`${weeks[1]} weeks → ${weeks[2]} week`);
      continue;
    }
    const peak = sentence.match(/was ([\d,.]+)k/i);
    if (peak) {
      labels.push(`${peak[1]}k peak rate`);
      continue;
    }
    const level = sentence.match(/was ([\d.]+)%/i);
    if (level) {
      labels.push(`${level[1]}% service level`);
      continue;
    }
    const rows = sentence.match(/more than ([\d,]+) rows/i);
    if (rows) {
      labels.push(`${Math.round(Number(rows[1].replace(/,/g, "")) / 1000)}k+ rows`);
      continue;
    }
    const share = sentence.match(/^([\d.]+)% of (.+?) came/i);
    if (share) {
      labels.push(`${share[1]}% ${share[2]}`);
      continue;
    }
    const saved = sentence.match(/saved \$([\d,.]+)k/i);
    if (saved) {
      labels.push(`$${saved[1]}k saved`);
    }
  }
  return labels;
}
