import CONTACT from "@/app/config/contact";
import EXPERIENCE from "@/app/config/experience";
import PROJECTS from "@/app/config/projects";
import TechStackGrid from "@/app/components/TechStackGrid";
import { getTotalYears } from "./utils/experienceUtils";

function companyName(company: string) {
  if (company.startsWith("Quizizz")) return "Quizizz (DBA Wayground)";
  return company;
}

export default function Home() {
  const years = getTotalYears();
  return (
    <main className="blog-page">
      <div className="math-grid" aria-hidden="true" />
      <div className="blog-wrap">
        <header className="blog-header">
          <p className="eyebrow">Software engineer</p>
          <h1>Yash Verma</h1>
          <p>
            Full-stack software engineer with {years} of experience. I build products that hold up in production, from analytics and rendering to the infrastructure they run on.
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
          {EXPERIENCE.map((job) => (
            <article key={job.company} className="post">
              <p className="kicker">{job.startDate} — {job.endDate}</p>
              <h3>{companyName(job.company)}</h3>
              <p className="role">{job.role}</p>
              {job.achievements && job.achievements.length > 0 && (
                <ul>
                  {job.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {job.responsibilities.map((item) => (
                <div key={item.title} className="duty">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  {item.metrics.length > 0 && (
                    <ul>
                      {item.metrics.map((metric) => (
                        <li key={metric}>{metric}</li>
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
