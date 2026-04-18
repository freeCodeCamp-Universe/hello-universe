import type { PageDefinition } from "../components/render";
import { repoMap } from "../data/site";

export const templatePage: PageDefinition = {
  title: "Reusing this starter",
  summary:
    "This page explains which parts of the starter are required, which parts are just sample content, and how humans and AI agents should approach cloning it into a new freeCodeCamp constellation.",
  sections: [
    {
      title: "Repo Map",
      intro:
        "The goal is to make the starter readable at a glance so staff can find the right place to customize it without hunting through generated files.",
      cards: [
        {
          title: "Key files",
          body: "These are the files most new project owners will read and update first.",
          list: repoMap,
        },
      ],
    },
    {
      title: "Required Vs Sample-Only",
      intro:
        "Not every file in the starter is part of the platform contract, and that distinction should stay obvious.",
      cards: [
        {
          title: "Required for the current static flow",
          body: "These pieces reflect the shipped CLI contract and should stay unless the new project intentionally changes tooling with a clear reason.",
          list: [
            "A root platform.yaml",
            "A static build output directory",
            "HTML entry points that build into dist/",
            "Static hosting assumptions with no runtime backend",
          ],
        },
        {
          title: "Sample-only content",
          body: "These parts are here to teach structure and should usually be replaced in new projects owned by curriculum or platform teams.",
          list: [
            "The hello-universe copy and branding",
            "The current page text and starter checklist",
            "The example domains and package name",
          ],
        },
      ],
    },
    {
      title: "Agent Workflow",
      intro:
        "AI agents should treat this repository as a scaffold for new projects, not as a production app to evolve unless the task explicitly says otherwise.",
      cards: [
        {
          title: "Read this first",
          body: "AGENTS.md points to docs/agent-template-guide.md. That file is the repo-local instruction set for agents creating new projects from this starter for freeCodeCamp teams.",
        },
        {
          title: "Common mistakes to avoid",
          body: "The easiest way to create confusion is to treat future CLI ideas as already shipped or to copy generated output into a new project instead of source files.",
          list: [
            "Do not use dist/ as template source.",
            "Do not invent unsupported platform.yaml fields.",
            "Do not describe planned CLI commands as available.",
            "Do not add a framework unless requested.",
          ],
        },
      ],
    },
  ],
};
