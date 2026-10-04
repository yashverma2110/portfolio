import CONTACT from "@/app/config/contact";
import EXPERIENCE from "@/app/config/experience";
import PROJECTS from "@/app/config/projects";
import TechStackGrid from "@/app/components/TechStackGrid";
import ViewportHighlight from "@/app/components/ViewportHighlight";
import { getTotalYears } from "./utils/experienceUtils";

function companyName(company: string) {
  if (company.startsWith("Quizizz")) return "Quizizz (DBA Wayground)";
  return company;
}

type Impact = { id: string; label: string; text: string };
type ImpactGroup = { company: string; items: Impact[] };

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
    }
  }
  return labels;
}

function collectImpact(): ImpactGroup[] {
  return EXPERIENCE.flatMap((job, jobIndex) => {
    const items: Impact[] = [];
    job.achievements?.forEach((item, index) => {
      const id = `impact-${jobIndex}-a-${index}`;
      labelsFor(item).forEach((label) => items.push({ id, label, text: item }));
    });
    job.responsibilities.forEach((duty, dutyIndex) => {
      duty.metrics.forEach((metric, index) => {
        const id = `impact-${jobIndex}-${dutyIndex}-m-${index}`;
        labelsFor(metric).forEach((label) => items.push({ id, label, text: metric }));
      });
      if (duty.metrics.every((metric) => labelsFor(metric).length === 0)) {
        const id = `impact-${jobIndex}-${dutyIndex}-d`;
        labelsFor(duty.description).forEach((label) => items.push({ id, label, text: duty.description }));
      }
    });
    return items.length > 0 ? [{ company: companyName(job.company), items }] : [];
  });
}

function targetId(text: string, id: string) {
  return labelsFor(text).length > 0 ? id : undefined;
}

export default function Home() {
  const years = getTotalYears();
  const impactGroups = collectImpact();
  return (
    <main className="blog-page">
      <div className="math-grid" aria-hidden="true" />
      <ViewportHighlight />
      <div className="blog-wrap">
        <header className="blog-header">
          <p className="eyebrow">Software engineer</p>
          <h1>Yash Verma</h1>
          <p>
            I am a software engineer with {years} of experience. I build production software. The work includes analytics, rendered pages, and infrastructure.
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
          {impactGroups.map((group) => (
            <div key={group.company} className="impact">
              <h3>My impact at {group.company}</h3>
              <p>Click a number.</p>
              <div className="pills">
                {group.items.map((item) => (
                  <a key={`${item.id}-${item.label}`} className="pill" href={`#${item.id}`} title={item.text}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
          {EXPERIENCE.map((job, jobIndex) => (
            <article key={job.company} className="post">
              <p className="kicker">{job.startDate} — {job.endDate}</p>
              <h3>{companyName(job.company)}</h3>
              <p className="role">{job.role}</p>
              {job.achievements && job.achievements.length > 0 && (
                <ul>
                  {job.achievements.map((item, index) => (
                    <li key={item} id={targetId(item, `impact-${jobIndex}-a-${index}`)} className={targetId(item, "x") ? "metric" : undefined}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {job.responsibilities.map((item, dutyIndex) => (
                <div key={item.title} id={item.metrics.every((metric) => labelsFor(metric).length === 0) ? targetId(item.description, `impact-${jobIndex}-${dutyIndex}-d`) : undefined} className="duty">
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
