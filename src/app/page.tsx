import CONTACT from "@/app/config/contact";
import PROJECTS from "@/app/config/projects";
import { getTotalYears } from "./utils/experienceUtils";

const posts = [
  {
    kicker: "Experience",
    title: "Quizizz (DBA Wayground)",
    body: "Senior software engineer, August 2021 to now. Analytics platform, SSR, and canary deploys. 300k peak RPM, 83% fewer P0s, 63% faster p75 load, 10% lower AWS cost.",
  },
  {
    kicker: "Projects",
    title: PROJECTS[0].title,
    body: PROJECTS[0].description + " Nothing collected leaves the browser.",
    href: PROJECTS[0].link,
  },
  {
    kicker: "Education",
    title: "IIIT Una",
    body: "Computer science.",
  },
  {
    kicker: "Contact",
    title: "Write to me",
    body: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
];

export default function Home() {
  const years = getTotalYears();
  return (
    <main className="blog-page">
      <div className="math-grid" aria-hidden="true" />
      <article className="blog-wrap">
        <header className="blog-header">
          <h1>Yash Verma</h1>
          <p>Full-stack software engineer, {years}. Notes from the work, not a résumé wall.</p>
        </header>
        <div className="blog-list">
          {posts.map((post) => {
            const inner = (
              <>
                <p className="kicker">{post.kicker}</p>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </>
            );
            return post.href ? (
              <a key={post.title} className="post" href={post.href}>
                {inner}
              </a>
            ) : (
              <section key={post.title} className="post">
                {inner}
              </section>
            );
          })}
        </div>
      </article>
    </main>
  );
}
