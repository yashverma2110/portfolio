import CONTACT from "@/app/config/contact";
import EXPERIENCE from "@/app/config/experience";
import { QUIZIZZ_COMPANY } from "@/app/config/impact";
import PROJECTS from "@/app/config/projects";
import { INTRO, POSITIONING, PROFILE, companyName, educationLine } from "@/app/config/profile";
import QuizizzImpact from "@/app/components/QuizizzImpact";
import { AWS_SERVICES, TECH_STACK } from "@/app/components/TechStackGrid";
import TechStackGrid from "@/app/components/TechStackGrid";
import ViewportHighlight from "@/app/components/ViewportHighlight";
import YearsMark from "@/app/components/YearsMark";
import ProjectCarousel from "@/app/components/ProjectCarousel";
import YouTubeAutoplay from "@/app/components/YouTubeAutoplay";
import { getTotalYears } from "./utils/experienceUtils";
import type { Metadata } from "next";
import { SITE_URL } from "./config/site";
import { HOME_DESCRIPTION, HOME_TITLE } from "./config/home-meta";
import { formatDate, getPostMetas, getPostsByProject, projectAnchor, projectSlug } from "./lib/blog";
import { labelsFor, PILL_CATEGORIES, PILL_COPY, type PillCategory } from "./lib/metrics";

type Impact = { id: string; sectionId: string; label: string; text: string; category: PillCategory };
type ImpactGroup = { company: string; items: Impact[] };

function collectImpact(): ImpactGroup[] {
  return EXPERIENCE.flatMap((job, jobIndex) => {
    // Quizizz results render in the story layout. Other companies keep the pill list.
    if (job.company === QUIZIZZ_COMPANY) return [];
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

// Person and WebSite entities. Blog posts reference the person by its @id.
function personJsonLd() {
  const current = EXPERIENCE.find((job) => job.current) ?? EXPERIENCE[0];
  // A subset of the Stack section, plus the areas from the intro.
  const picks = ["JavaScript", "TypeScript", "Python", "Golang", "React", "Next.js", "Vue", "Nuxt", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Kafka"];
  const stack = TECH_STACK.flatMap((category) => category.items).filter((item) => picks.includes(item));
  const knowsAbout = [...stack, ...(AWS_SERVICES.length > 0 ? ["AWS"] : []), "Analytics", "Web performance", "Infrastructure"];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PROFILE.name,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        jobTitle: POSITIONING.jobTitle,
        ...(current.summary ? { description: current.summary } : {}),
        worksFor: { "@type": "Organization", name: companyName(current.company) },
        homeLocation: { "@type": "Place", name: PROFILE.location },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: PROFILE.education.schoolFull,
          alternateName: PROFILE.education.school,
        },
        knowsAbout,
        sameAs: [CONTACT.github, CONTACT.linkedin, CONTACT.twitter, CONTACT.medium],
        email: `mailto:${CONTACT.email}`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: PROFILE.name,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/blog/rss.xml", title: "Yash Verma's blog" }],
      "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    siteName: "Yash Verma",
  },
};

export default function Home() {
  const years = getTotalYears();
  const [eyebrowRole, eyebrowAreas] = POSITIONING.eyebrow.split(" · ");
  const impactGroups = collectImpact();
  const latestPosts = getPostMetas().slice(0, 3);
  return (
    <main className="blog-page home">
      <div className="math-grid" aria-hidden="true" />
      <ViewportHighlight />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }} />
      <div className="blog-wrap home-hero">
        {/* Plain links keep next/link out of the homepage bundle. */}
        <div className="topbar">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="topbar-name" href="/">Yash Verma</a>
          <nav aria-label="Site">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/blog">Blog</a>
            <a href="/editor">Editor</a>
          </nav>
        </div>
        <header className="blog-header">
          <p className="eyebrow">
            {/* Two parts so phones break at the dot, not inside "Full-stack". */}
            {eyebrowRole}
            {eyebrowAreas && <>{" · "}<span className="eyebrow-part">{eyebrowAreas}</span></>}
          </p>
          <h1>Yash Verma</h1>
          <p>
            {`${INTRO.lead} `}<YearsMark startDate="August 2021" initial={years} />{` ${INTRO.rest}`}
          </p>
        </header>
        <div className="chips-sentinel" aria-hidden="true" />
      </div>
      {/* The bar sits outside the column so its background spans the page at width: 100% (never 100vw). */}
      <nav className="chips-bar" aria-label="Sections">
        <div className="chips">
          <a className="chip" href="#experience">Experience</a>
          <a className="chip" href="#projects">Projects</a>
          <a className="chip" href="#stack">Stack</a>
          <a className="chip" href="#contact">Contact</a>
        </div>
      </nav>
      <div className="blog-wrap">

        <section id="experience" className="blog-section">
          <h2>Experience</h2>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Yash Verma", item: `${SITE_URL}/` },
                  { "@type": "ListItem", position: 2, name: "Experience", item: `${SITE_URL}/#experience` },
                ],
              }),
            }}
          />
          <QuizizzImpact />
          {impactGroups.map((group) => (
            <section key={group.company} className="impact">
              <h3>My impact at {group.company}</h3>
              <p>Click a number.</p>
              {PILL_CATEGORIES.map((category) => {
                const items = group.items.filter((item) => item.category === category);
                if (items.length === 0) return null;
                return (
                  <div key={category} className="impact-group">
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
          ))}
          {EXPERIENCE.map((job, jobIndex) => (
            <article key={job.company} className="post">
              <p className="kicker">{job.startDate} — {job.endDate}</p>
              <h3>{companyName(job.company)}</h3>
              <p className="role">{job.role}</p>
              {job.summary && <p className="summary">{job.summary}</p>}
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
          {PROJECTS.map((project) => {
            const projectPosts = getPostsByProject(projectSlug(project.title));
            return (
            <article key={project.title} id={projectAnchor(projectSlug(project.title))} className="post project">
              <h3>
                <a href={project.link}>{project.title}</a>
              </h3>
              {project.media?.youtubeId && (
                <YouTubeAutoplay id={project.media.youtubeId} title={`${project.title} demo`} />
              )}
              <p>{project.description}</p>
              {project.media?.images && project.media.images.length > 0 && (
                <ProjectCarousel label={`${project.title} screenshots`} images={project.media.images} />
              )}
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <p className="tech">{project.technologies.join(" · ")}</p>
              {(project.github ||
                (project.link !== project.github &&
                  project.link.startsWith("https://chromewebstore.google.com/")) ||
                project.tweetLink ||
                project.media?.youtubeId ||
                project.privacyPolicy) && (
                <nav aria-label="Project links">
                  {project.github && <a href={project.github}>GitHub</a>}
                  {project.link !== project.github &&
                    project.link.startsWith("https://chromewebstore.google.com/") && (
                      <a href={project.link}>Chrome Web Store</a>
                    )}
                  {project.media?.youtubeId && (
                    <a href={`https://www.youtube.com/watch?v=${project.media.youtubeId}`}>Demo video</a>
                  )}
                  {project.privacyPolicy && <a href={project.privacyPolicy}>Privacy policy</a>}
                  {project.tweetLink && <a href={project.tweetLink}>X</a>}
                </nav>
              )}
              {projectPosts.length > 0 && (
                <div className="project-posts">
                  <h4>Posts about {project.title}</h4>
                  <ul>
                    {projectPosts.map((post) => (
                      <li key={post.slug}>
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
            );
          })}
        </section>

        {latestPosts.length > 0 && (
          <section id="writing" className="blog-section post">
            <h2>Writing</h2>
            <ul className="writing-list">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </li>
              ))}
            </ul>
            <p className="all-posts">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/blog">All posts</a>
            </p>
          </section>
        )}

        <section id="stack" className="blog-section post">
          <h2>Stack</h2>
          <TechStackGrid />
        </section>

        <section id="education" className="blog-section post">
          <h2>Education</h2>
          <p>{educationLine()}</p>
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
