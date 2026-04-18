import type { PageDefinition } from "../components/render";
import {
  plannedCommands,
  renameChecklist,
  shippedCommands,
  site,
} from "../data/site";

export const homePage: PageDefinition = {
  title: site.displayName,
  summary:
    "A framework-free, multi-page sample constellation for freeCodeCamp teams. It demonstrates the current shipped static-site contract for the Universe CLI and is meant to be copied into a new project, not treated as a long-lived demo app.",
  sections: [
    {
      title: "What This Starter Shows",
      intro:
        "The sample is intentionally small, but each part maps to a real step in the freeCodeCamp static deployment workflow.",
      cards: [
        {
          title: "Multi-page output",
          body: "The repo uses separate HTML entry points so curriculum teams can see how a Vite multi-page project becomes one static dist/ directory without adding framework complexity.",
          list: ["/", "/config.html", "/about.html"],
        },
        {
          title: "Explicit config",
          body: "platform.yaml includes every static field the shipped CLI supports today, so the deployment contract is visible to staff and contributors from the start.",
        },
        {
          title: "Alias-based releases",
          body: "Deploy writes a new immutable snapshot and moves preview. Promote and rollback only change which deploy ID production points at, which makes review and release safer.",
        },
        {
          title: "Template-first docs",
          body: "README.md helps humans clone this starter. AGENTS.md points AI agents to docs/agent-template-guide.md so they treat the repo as a scaffold for new constellations owned by freeCodeCamp teams.",
        },
      ],
    },
    {
      title: "Shipped Commands",
      intro:
        "These are the commands staff can rely on today when working with the current Universe CLI.",
      cards: [
        {
          title: "Deploy",
          body: "Uploads the built output to immutable storage and updates the preview alias for review.",
          code: shippedCommands[0],
        },
        {
          title: "Promote",
          body: "Moves production to the preview deploy, or to a specific deploy ID if you provide one after review.",
          code: shippedCommands[1],
        },
        {
          title: "Rollback",
          body: "Moves production back to the previous deploy in chronological order when a release needs to be undone.",
          code: `${shippedCommands[2]} --confirm`,
        },
      ],
    },
    {
      title: "Near-Term Commands",
      intro:
        "These are useful for planning and internal docs, but they should be described as planned rather than shipped.",
      cards: [
        {
          title: "Planned surface area",
          body: "Keep these visible for future contributors, but do not present them as available commands until the CLI ships them.",
          list: plannedCommands,
        },
      ],
    },
    {
      title: "Rename These First",
      intro:
        "If you copy this repository into a new curriculum project, start here before adding any new content or styling.",
      cards: [
        {
          title: "Starter checklist",
          body: "These are the first values and files most new constellations should replace.",
          list: renameChecklist,
        },
      ],
    },
  ],
};
