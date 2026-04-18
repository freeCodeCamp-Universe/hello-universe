export interface CardDefinition {
  title: string;
  body: string;
  list?: string[];
  code?: string;
}

export interface SectionDefinition {
  title: string;
  intro: string;
  cards: CardDefinition[];
}

export interface PageDefinition {
  title: string;
  summary: string;
  sections: SectionDefinition[];
}

export interface RuntimeFact {
  label: string;
  value: string;
}

const navigation = [
  { id: "home", href: "/", label: "Overview" },
  { id: "config", href: "/config.html", label: "platform.yaml" },
  { id: "template", href: "/about.html", label: "Template Guide" },
];

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderCard(card: CardDefinition): string {
  const list = card.list
    ? `<ul>${card.list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";
  const code = card.code
    ? `<pre><code>${escapeHtml(card.code)}</code></pre>`
    : "";

  return `
    <article class="card">
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.body)}</p>
      ${list}
      ${code}
    </article>
  `;
}

function renderSection(section: SectionDefinition): string {
  return `
    <section class="section">
      <div class="section-heading">
        <h2>${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.intro)}</p>
      </div>
      <div class="card-grid">
        ${section.cards.map(renderCard).join("")}
      </div>
    </section>
  `;
}

function renderRuntimeFacts(facts: RuntimeFact[]): string {
  return facts
    .map(
      (fact) => `
        <div class="fact-row">
          <dt>${escapeHtml(fact.label)}</dt>
          <dd>${escapeHtml(fact.value)}</dd>
        </div>
      `,
    )
    .join("");
}

export function renderPage(
  root: HTMLElement,
  page: PageDefinition,
  activePage: string,
  runtimeFacts: RuntimeFact[],
): void {
  root.innerHTML = `
    <main class="shell">
      <nav class="site-nav" aria-label="Starter navigation">
        ${navigation
          .map(
            (item) => `
              <a class="${item.id === activePage ? "active" : ""}" href="${item.href}">
                ${escapeHtml(item.label)}
              </a>
            `,
          )
          .join("")}
      </nav>

      <header class="hero">
        <h1>${escapeHtml(page.title)}</h1>
        <p class="summary">${escapeHtml(page.summary)}</p>
      </header>

      ${page.sections.map(renderSection).join("")}

      <aside class="runtime-panel">
        <div class="section-heading">
          <h2>Runtime snapshot</h2>
          <p>Client-side values confirming this is plain static HTML, CSS, and TypeScript.</p>
        </div>
        <dl>
          ${renderRuntimeFacts(runtimeFacts)}
        </dl>
      </aside>
    </main>
  `;
}
