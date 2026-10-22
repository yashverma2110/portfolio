import ImpactFilter from "@/app/components/ImpactFilter";
import { buildQuizizzImpact, type CoverageCell } from "@/app/lib/impactModel";

function cellLabel(cell: CoverageCell) {
  if (cell.count > 0) return `${cell.count} result${cell.count === 1 ? "" : "s"}`;
  if (cell.fact) return "fact only";
  return "none";
}

function Dot({ cell }: { cell: CoverageCell }) {
  if (cell.count > 0) {
    const size = 8 + Math.min(cell.count, 6) * 3;
    return (
      <span className="cov-mark">
        <span className="cov-dot" style={{ width: size, height: size }} />
        <span className="cov-num">{cell.count}</span>
      </span>
    );
  }
  if (cell.fact) return <span className="cov-ring" />;
  return <span className="cov-none">—</span>;
}

export default function QuizizzImpact() {
  const impact = buildQuizizzImpact();
  return (
    <section id={impact.anchorId} className="quizizz-impact" data-impact-root="">
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var m=/^#impact=([a-z]+)$/i.exec(location.hash);var ok={frontend:1,backend:1,data:1,ai:1,infra:1,leadership:1};if(m&&ok[m[1].toLowerCase()])document.documentElement.setAttribute("data-impact",m[1].toLowerCase());})();`,
        }}
      />
      <ImpactFilter />
      <h3>My impact at {impact.displayCompany}</h3>
      <p className="impact-meta">{impact.role} · {impact.dates}</p>
      <p id="impact-status" className="sr-only" aria-live="polite" />

      {impact.strips.map((strip) => (
        <div key={strip.slug} className="impact-strip" data-strip={strip.slug}>
          {strip.stats.map((stat) => (
            <div key={`${strip.slug}-${stat.figure}-${stat.caption}`} className="impact-stat">
              <p className="impact-figure">{stat.figure}</p>
              <p className="impact-caption">{stat.caption}</p>
            </div>
          ))}
          <div className="impact-strip-note">
            <p><strong>{strip.strong}</strong> {strip.rest}</p>
            {strip.line2 && (
              <p className="impact-strip-sub">
                {strip.line2}
                {strip.seeAll && <> · <a href="#quizizz-stories">See all</a></>}
              </p>
            )}
          </div>
        </div>
      ))}

      <div className="impact-filters">
        <span className="filter-label">Charter</span>
        <div className="charter-scroller">
          <div role="radiogroup" aria-label="Filter impact by charter" className="charter-row">
            <button type="button" className="charter-chip" role="radio" aria-checked="true" data-charter="all">
              All · {impact.total}
            </button>
            {impact.charters.map((charter) => (
              <button key={charter.slug} type="button" className="charter-chip" role="radio" aria-checked="false" data-charter={charter.slug}>
                {charter.name} · {charter.count}
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="coverage-toggle" aria-expanded="false" aria-controls="impact-coverage">
          Coverage
        </button>
      </div>

      <div id="impact-coverage" className="impact-coverage" hidden>
        <div className="cov-table-wrap">
          <table className="cov-table">
            <caption className="sr-only">Quizizz results by story and charter. Choose a charter to filter.</caption>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Story</span></th>
                {impact.charters.map((charter) => (
                  <th key={charter.slug} scope="col">
                    <button type="button" className="cov-col" data-charter={charter.slug}>{charter.name}</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {impact.coverage.map((row) => (
                <tr key={row.title}>
                  <th scope="row">{row.title}</th>
                  {row.cells.map((cell, index) => (
                    <td key={impact.charters[index].slug} aria-label={cellLabel(cell)}>
                      <Dot cell={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Results per charter</th>
                {impact.charters.map((charter) => (
                  <td key={charter.slug}>{charter.count}</td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
        <ul className="cov-list">
          {impact.charters.map((charter, charterIndex) => (
            <li key={charter.slug}>
              <button type="button" data-charter={charter.slug}>{charter.name} · {charter.count}</button>
              <span className="cov-pips" aria-hidden="true">
                {impact.coverage.map((row) => {
                  const cell = row.cells[charterIndex];
                  const state = cell.count > 0 ? "result" : cell.fact ? "fact" : "none";
                  return <span key={row.title} className="cov-pip" data-state={state} />;
                })}
              </span>
            </li>
          ))}
        </ul>
        <p className="cov-legend">Filled dots are results. A ring is a fact only. Choose a charter to filter.</p>
      </div>

      <div id="quizizz-stories" className="impact-stories">
        {impact.stories.map((story) => (
          <article key={story.id} className="impact-story" data-charters={story.charters}>
            <div className="story-lead">
              <h4 className="story-title">{story.title}</h4>
              <p className="story-tags">
                {story.tags.map((tag) => (
                  <span key={tag.slug} className="charter-tag" data-charter={tag.slug}>{tag.name}</span>
                ))}
              </p>
              <p className="story-problem"><span className="story-kicker">Problem:</span> {story.problem}</p>
            </div>
            <div className="story-did">
              <p><span className="story-kicker">What I did:</span> {story.did}</p>
              <div className="story-chips">
                {story.chips.map((chip) => (
                  <span key={chip.label} className="result-chip" data-charters={chip.charters} title={chip.source}>{chip.label}</span>
                ))}
                {story.facts.map((fact) => (
                  <span key={fact.label} className="fact-chip" data-charters={fact.charters} title={fact.source}>{fact.label}</span>
                ))}
              </div>
            </div>
            <div className="story-score">
              <p className="impact-headline" data-charters={story.headline.charters}>
                <span className="impact-figure">{story.headline.figure}</span>
                <span className="impact-caption">{story.headline.caption}</span>
              </p>
              {story.callouts.map((callout) => (
                <p key={callout.slug} className="impact-callout" data-charter={callout.slug}>
                  {callout.charter}: <strong>{callout.label}</strong>
                </p>
              ))}
              {story.caseStudy && (
                <p className="story-study">
                  <a href={story.caseStudy.href}>Read case study</a>
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
