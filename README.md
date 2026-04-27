# Hello Universe

Framework-free static starter for the freeCodeCamp Universe CLI.

This repository is meant to be copied and renamed when a freeCodeCamp team needs a new static constellation. It demonstrates the current shipped static-site contract, a small multi-page Vite build, and the preview/promote/rollback workflow without introducing framework-specific overhead.

## What This Starter Demonstrates

- Explicit `platform.yaml` for the current shipped static schema
- Vite multi-page output with separate HTML entry points
- Shared TypeScript renderer plus page-specific content modules
- Immutable deploys with preview and production aliases
- Human docs in `README.md` and agent docs via `AGENTS.md` -> `docs/agent-template-guide.md`

## Who This Is For

- freeCodeCamp staff creating a new static learning project, docs site, landing page, or lightweight tool
- Platform maintainers who need a concrete sample for the shipped static CLI contract
- AI agents that need a safe starter shape for cloning this repo into a new project

## Template Shape

```text
.
├── AGENTS.md
├── docs/
│   └── agent-template-guide.md
├── platform.yaml
├── index.html
├── config.html
├── about.html
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── scripts/
│   └── styles/
└── vite.config.ts
```

## Create A New Project From This Starter

1. Copy the repo into a new project.
2. Rename the package, repo, and domain values so they match the new constellation.
3. Update `platform.yaml` first so the deployment contract is correct.
4. Replace the sample content in `src/data/site.ts` and `src/pages/*.ts` with project-specific copy.
5. Keep the framework-free Vite structure unless the new project actually needs a different build tool.
6. Build with `pnpm build`.
7. Deploy with the Universe CLI when the content is ready for preview.

## Prerequisites

- `universe` CLI binary or npm install: <https://github.com/freeCodeCamp-Universe/universe-cli#install>

## Development

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
```

The sample uses Vite multi-page output and writes files to `dist/`.

That makes the repo easy to inspect: what you read in the source tree is close to what ends up in the uploaded static bundle.