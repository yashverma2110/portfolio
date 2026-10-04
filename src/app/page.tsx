import CONTACT from "@/app/config/contact";
import EXPERIENCE from "@/app/config/experience";
import PROJECTS from "@/app/config/projects";
import TechStackGrid from "@/app/components/TechStackGrid";
import ViewportHighlight from "@/app/components/ViewportHighlight";
import ScrollToTop from "@/app/components/ScrollToTop";
import YearsMark from "@/app/components/YearsMark";
import { getTotalYears } from "./utils/experienceUtils";

function companyName(company: string) {
  if (company.startsWith("Quizizz")) return "Quizizz (DBA Wayground)";
  return company;
}

type PillCategory = "Product" | "Performance" | "Productivity" | "Cost and reliability";
type Impact = { id: string; sectionId: string; label: string; text: string; category: PillCategory };
type ImpactGroup = { company: string; items: Impact[] };

const PILL_CATEGORIES: PillCategory[] = ["Product", "Performance", "Productivity", "Cost and reliability"];

const PILL_COPY: Record<string, { label: string; category: PillCategory }> = {
  "10%+ weekly active teachers": { label: "10%+ weekly active teachers", category: "Product" },
  "5% registrations": { label: "5% more registrations", category: "Product" },
  "2% registration funnels": { label: "2% more registration completions", category: "Product" },
  "0.5% game creation rate": { label: "0.5% more games created", category: "Product" },
  "1% new user activation": { label: "1% more new users activated", category: "Product" },
  "2.3% lesson adoption": { label: "2.3% more lesson use", category: "Product" },
  "56% platform content": { label: "56% of content from Google Drive", category: "Product" },
  "1.2% search success rate": { label: "1.2% more successful searches", category: "Product" },
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

function labelsFor(text: string) {
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

function collectImpact(): ImpactGroup[] {
  return EXPERIENCE.flatMap((job, jobIndex) => {
    const items: Impact[] = [];
    job.achievements?.forEach((item, index) => {
      const id = `impact-${jobIndex}-a-${index}`;
      const sectionId = `work-${jobIndex}-achievements`;
      labelsFor(item).forEach((label) => {
        const copy = PILL_COPY[label];
        if (copy) items.push({ id, sectionId, label: copy.label, text: item, category: copy.category });
      });
    });
    job.responsibilities.forEach((duty, dutyIndex) => {
      duty.metrics.forEach((metric, index) => {
        const id = `impact-${jobIndex}-${dutyIndex}-m-${index}`;
        const sectionId = `work-${jobIndex}-${dutyIndex}`;
        labelsFor(metric).forEach((label) => {
          const copy = PILL_COPY[label];
          if (copy) items.push({ id, sectionId, label: copy.label, text: metric, category: copy.category });
        });
      });
      if (duty.metrics.every((metric) => labelsFor(metric).length === 0)) {
        const id = `impact-${jobIndex}-${dutyIndex}-d`;
        const sectionId = `work-${jobIndex}-${dutyIndex}`;
        labelsFor(duty.description).forEach((label) => {
          const copy = PILL_COPY[label];
          if (copy) items.push({ id, sectionId, label: copy.label, text: duty.description, category: copy.category });
        });
      }
    });
    return items.length > 0 ? [{ company: companyName(job.company), items }] : [];
  });
}

function targetId(text: string, id: string) {
  return labelsFor(text).length > 0 ? id : undefined;
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Home() {
  const years = getTotalYears();
  const impactGroups = collectImpact();
  return (
    <main className="blog-page">
      <div className="math-grid" aria-hidden="true" />
      <ViewportHighlight />
      <ScrollToTop />
      <div className="blog-wrap">
        <header className="blog-header">
          <p className="eyebrow">Software engineer</p>
          <h1>Yash Verma</h1>
          <p>
            I am a software engineer with <YearsMark startDate="August 2021" initial={years} /> of full-time experience. I ship product features and help plan the roadmap, and I build the analytics, page speed, and infrastructure that keep them running in production. I am open to software engineer, product engineer, backend engineer, and frontend engineer roles. I would love to contribute across all of them.
          </p>
          <nav aria-label="Page">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#stack">Stack</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section id="experience" className="blog-section">
          <h2>Experience</h2>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": impactGroups.flatMap((group) =>
                  PILL_CATEGORIES.flatMap((category) => {
                    const items = group.items.filter((item) => item.category === category);
                    if (items.length === 0) return [];
                    const companyId = `impact-${slug(group.company)}`;
                    const categoryId = `${companyId}-${slug(category)}`;
                    return [{
                      "@type": "BreadcrumbList",
                      itemListElement: [
                        { "@type": "ListItem", position: 1, name: "Yash Verma", item: "https://itsyashverma.com/" },
                        { "@type": "ListItem", position: 2, name: "Experience", item: "https://itsyashverma.com/#experience" },
                        { "@type": "ListItem", position: 3, name: group.company, item: `https://itsyashverma.com/#${companyId}` },
                        { "@type": "ListItem", position: 4, name: category, item: `https://itsyashverma.com/#${categoryId}` },
                      ],
                    }];
                  })
                ),
              }),
            }}
          />
          {impactGroups.map((group) => {
            const companyId = `impact-${slug(group.company)}`;
            return (
              <section key={group.company} id={companyId} className="impact">
                <h3>My impact at {group.company}</h3>
                <p>Click a number.</p>
                {PILL_CATEGORIES.map((category) => {
                  const items = group.items.filter((item) => item.category === category);
                  if (items.length === 0) return null;
                  const categoryId = `${companyId}-${slug(category)}`;
                  return (
                    <div key={category} id={categoryId} className="impact-group">
                      <nav className="crumbs" aria-label="Breadcrumb">
                        <ol>
                          <li><a href="https://itsyashverma.com/">Yash Verma</a></li>
                          <li><a href="#experience">Experience</a></li>
                          <li><a href={`#${companyId}`}>{group.company}</a></li>
                          <li aria-current="page">{category}</li>
                        </ol>
                      </nav>
                      <h4>{category}</h4>
                      <div className="pills">
                        {items.map((item) => (
                          <a key={`${item.id}-${item.label}`} className="pill" href={`#${item.sectionId}`} data-metric={item.id} title={item.text}>
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </section>
            );
          })}
          {EXPERIENCE.map((job, jobIndex) => (
            <article key={job.company} className="post">
              <p className="kicker">{job.startDate} — {job.endDate}</p>
              <h3>{companyName(job.company)}</h3>
              <p className="role">{job.role}</p>
              {job.achievements && job.achievements.length > 0 && (
                <div id={`work-${jobIndex}-achievements`} className="duty">
                  <ul>
                    {job.achievements.map((item, index) => (
                      <li key={item} id={targetId(item, `impact-${jobIndex}-a-${index}`)} className={targetId(item, "x") ? "metric" : undefined}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {job.responsibilities.map((item, dutyIndex) => (
                <div key={item.title} id={`work-${jobIndex}-${dutyIndex}`} className="duty">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  {item.metrics.length > 0 && (
                    <ul>
                      {item.metrics.map((metric, index) => (
                        <li
                          key={metric}
                          id={targetId(metric, `impact-${jobIndex}-${dutyIndex}-m-${index}`)}
                          className={targetId(metric, "x") ? "metric" : undefined}
                        >
                          {metric}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.technologies && item.technologies.length > 0 && (
                    <p className="tech">{item.technologies.join(" · ")}</p>
                  )}
                </div>
              ))}
            </article>
          ))}
        </section>

        <section id="projects" className="blog-section">
          <h2>Projects</h2>
          {PROJECTS.map((project) => (
            <article key={project.title} className="post">
              <h3>
                <a href={project.link}>{project.title}</a>
              </h3>
              <p>{project.description}</p>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <p className="tech">{project.technologies.join(" · ")}</p>
              {(project.github ||
                (project.link !== project.github &&
                  project.link.startsWith("https://chromewebstore.google.com/")) ||
                project.tweetLink) && (
                <nav aria-label="Project links">
                  {project.github && <a href={project.github}>GitHub</a>}
                  {project.link !== project.github &&
                    project.link.startsWith("https://chromewebstore.google.com/") && (
                      <a href={project.link}>Chrome Web Store</a>
                    )}
                  {project.tweetLink && <a href={project.tweetLink}>X</a>}
                </nav>
              )}
            </article>
          ))}
        </section>

        <section id="stack" className="blog-section post">
          <h2>Stack</h2>
          <TechStackGrid />
        </section>

        <section id="contact" className="blog-section post">
          <h2>Contact</h2>
          <p>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <nav aria-label="Profiles">
            <a href={CONTACT.linkedin}>LinkedIn</a>
            <a href={CONTACT.github}>GitHub</a>
            <a href={CONTACT.twitter}>X</a>
            <a href={CONTACT.medium}>Medium</a>
          </nav>
        </section>
      </div>
    </main>
  );
}
