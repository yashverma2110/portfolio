// Builds /llms.txt and /llms-full.txt (https://llmstxt.org) from the same config and posts as the site.
// Both routes are static, so they are regenerated on every build. Do not hand-write a static llms file.
import CONTACT from "@/app/config/contact";
import EXPERIENCE from "@/app/config/experience";
import PROJECTS from "@/app/config/projects";
import { PROFILE, companyName, introText } from "@/app/config/profile";
import { AWS_SERVICES, TECH_STACK } from "@/app/components/TechStackGrid";
import { getTotalYears } from "@/app/utils/experienceUtils";
import { SITE_URL, formatDate, getPosts, projectAnchor, projectSlug } from "@/app/lib/blog";
import type { IExperience } from "@/app/types/experience";
import type { IProject } from "@/app/types/projects";

export const LLMS_HEADERS = { "Content-Type": "text/plain; charset=utf-8" };

function dates(job: IExperience) {
  const end = job.current || job.endDate === "Current" ? "present" : job.endDate;
  return `${job.startDate} to ${end}`;
}

function sentence(text: string) {
  const trimmed = text.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function projectLinks(project: IProject) {
  const links: string[] = [];
  if (project.github) links.push(`[GitHub](${project.github})`);
  if (project.link.startsWith("https://chromewebstore.google.com/")) links.push(`[Chrome Web Store](${project.link})`);
  if (project.media?.youtubeId) links.push(`[Demo video](https://www.youtube.com/watch?v=${project.media.youtubeId})`);
  if (project.privacyPolicy) links.push(`[Privacy policy](${project.privacyPolicy})`);
  links.push(`[On this site](${SITE_URL}/#${projectAnchor(projectSlug(project.title))})`);
  return links;
}

function header() {
  const years = getTotalYears();
  const current = EXPERIENCE.find((job) => job.current);
  const facts = [
    `${PROFILE.name} is a software engineer based in ${PROFILE.location}. ${PROFILE.openTo}`,
    current
      ? `He works at ${companyName(current.company)} as a ${current.role} (since ${current.startDate}).`
      : undefined,
    `Education: ${PROFILE.education}.`,
    `Email: ${CONTACT.email}. Website: ${SITE_URL}`,
  ].filter(Boolean);
  return [
    `# ${PROFILE.name}`,
    "",
    `> ${introText(years)}`,
    "",
    facts.join(" "),
    "",
    `The years figure counts full-time work only, from ${current?.startDate ?? "his first full-time role"}. Internships are listed separately.`,
  ].join("\n");
}

function profiles() {
  return [
    "## Profiles",
    "",
    `- [GitHub](${CONTACT.github}): GitHub profile`,
    `- [LinkedIn](${CONTACT.linkedin}): LinkedIn profile`,
    `- [X](${CONTACT.twitter}): X profile`,
    `- [Medium](${CONTACT.medium}): Medium profile`,
  ].join("\n");
}

export function buildLlmsTxt() {
  const posts = getPosts();
  const out: string[] = [header(), ""];

  out.push("## Experience", "");
  for (const job of EXPERIENCE) {
    out.push(`- [${companyName(job.company)}](${SITE_URL}/#experience): ${job.role}, ${dates(job)}.`);
    for (const duty of job.responsibilities) {
      if (duty.metrics.length === 0) continue;
      out.push(`  - ${duty.title}: ${duty.metrics.map(sentence).join(" ")}`);
    }
  }
  out.push("");

  out.push("## Projects", "");
  for (const project of PROJECTS) {
    out.push(`- [${project.title}](${project.link}): ${sentence(project.description)} Links: ${projectLinks(project).join(", ")}.`);
  }
  out.push("");

  out.push("## Writing", "");
  for (const post of posts) {
    out.push(`- [${post.title}](${SITE_URL}/blog/${post.slug}): ${sentence(post.description)} Published ${formatDate(post.date)}.`);
  }
  out.push(`- [Blog](${SITE_URL}/blog): all posts`, `- [RSS feed](${SITE_URL}/blog/rss.xml): new posts`, "");

  out.push("## Tools", "");
  out.push(`- [Markdown editor](${SITE_URL}/editor): a Markdown editor that runs in the browser. Documents stay in the browser's local storage.`, "");

  out.push(profiles(), "");

  out.push("## Optional", "");
  out.push(`- [llms-full.txt](${SITE_URL}/llms-full.txt): full experience, project details, stack, and the full text of each post`);
  out.push(`- [Sitemap](${SITE_URL}/sitemap.xml): every page on the site`);
  return `${out.join("\n")}\n`;
}

/** Shift Markdown headings down and turn site-relative links into full URLs. Fenced code is left alone. */
function postBody(content: string, shift: number) {
  let fence: string | undefined;
  return content
    .trim()
    .split("\n")
    .map((line) => {
      const marker = line.match(/^\s*(`{3,}|~{3,})/);
      if (marker) {
        if (!fence) fence = marker[1][0];
        else if (marker[1][0] === fence) fence = undefined;
        return line;
      }
      if (fence) return line;
      const heading = line.match(/^(#{1,6})(\s.*)$/);
      const shifted = heading ? `${"#".repeat(Math.min(6, heading[1].length + shift))}${heading[2]}` : line;
      return shifted.replace(/\]\(\/(?!\/)/g, `](${SITE_URL}/`);
    })
    .join("\n");
}

export function buildLlmsFullTxt() {
  const posts = getPosts();
  const out: string[] = [header(), ""];

  out.push("## Experience", "");
  for (const job of EXPERIENCE) {
    out.push(`### ${companyName(job.company)}`, "", `${job.role}, ${dates(job)}.`, "");
    if (job.achievements?.length) {
      out.push(...job.achievements.map((item) => `- ${item}`), "");
    }
    for (const duty of job.responsibilities) {
      out.push(`#### ${duty.title}`, "", duty.description, "");
      if (duty.metrics.length) out.push(...duty.metrics.map((metric) => `- ${metric}`), "");
      if (duty.technologies?.length) out.push(`Technologies: ${duty.technologies.join(", ")}.`, "");
    }
  }

  out.push("## Projects", "");
  for (const project of PROJECTS) {
    out.push(`### ${project.title}`, "", project.description, "");
    out.push(...project.features.map((feature) => `- ${feature}`), "");
    out.push(`Technologies: ${project.technologies.join(", ")}.`, "");
    out.push(`Links: ${projectLinks(project).join(", ")}.`, "");
  }

  out.push("## Stack", "");
  for (const category of TECH_STACK) out.push(`- ${category.name}: ${category.items.join(", ")}`);
  out.push(`- AWS: ${AWS_SERVICES.join(", ")}`, "");

  out.push("## Tools", "");
  out.push(`- [Markdown editor](${SITE_URL}/editor): a Markdown editor that runs in the browser. Documents stay in the browser's local storage.`, "");

  out.push(profiles(), "");

  for (const post of posts) {
    out.push(`## ${post.title}`, "");
    out.push(`Published ${formatDate(post.date)}${post.updated ? `, updated ${formatDate(post.updated)}` : ""}. ${SITE_URL}/blog/${post.slug}`, "");
    out.push(postBody(post.content, 2), "");
  }

  out.push(`Blog: ${SITE_URL}/blog. RSS: ${SITE_URL}/blog/rss.xml. Short version: ${SITE_URL}/llms.txt`);
  return `${out.join("\n")}\n`;
}
