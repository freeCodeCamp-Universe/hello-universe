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

## Current Platform Config

```yaml
name: hello-universe.freecode.camp
stack: static
domain:
  production: hello-universe.freecode.camp
  preview: preview.hello-universe.freecode.camp
static:
  output_dir: dist
  bucket: gxy-static-1
  rclone_remote: gxy-static
  region: auto
```

The shipped CLI supports the `static` block above today. Keep sample docs aligned with `universe-cli`, not only with broader future-state Universe docs.

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
- R2 credentials from the platform team

## Credentials

Create `.env` from `.env.example` and load it before running CLI commands:

```sh
cp .env.example .env
source .env
```

Current credential resolution order:

1. `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT`, optional `S3_REGION`
2. `rclone` remote matching `static.rclone_remote`

For staff workflows, environment variables are the expected path. The `rclone` fallback exists mainly for platform-team and automation scenarios.

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

## Shipped CLI Commands

```sh
universe static deploy
universe static deploy --output-dir dist
universe static deploy --force
universe static deploy --json

universe static promote
universe static promote <deploy-id>
universe static promote --json

universe static rollback --confirm
universe static rollback --confirm --json
```

## Near-Term Commands

These are worth planning around, but they are not the shipped contract yet:

- `universe static init`
- `universe static validate`
- `universe static list`
- `universe static status`
- `universe static cleanup`
- `universe static delete-site`
- `universe static sync` (optional)

## Deploy Flow

```sh
pnpm build
universe static deploy
```

This uploads `dist/` as an immutable snapshot and moves the preview alias.

The intended workflow is simple: ship a preview for review, then promote the exact deploy that passed review.

To go live:

```sh
universe static promote
```

To roll back production:

```sh
universe static rollback --confirm
```

## Helpful Overrides

Environment overrides supported by the shipped CLI:

- `UNIVERSE_STATIC_OUTPUT_DIR`
- `UNIVERSE_STATIC_BUCKET`
- `UNIVERSE_STATIC_RCLONE_REMOTE`
- `UNIVERSE_STATIC_REGION`

Resolution order is:

1. CLI flags
2. Environment variables
3. `platform.yaml`
4. Defaults

## Agent Guidance

Agents should start with `AGENTS.md`, which points to `docs/agent-template-guide.md`.

That guide explains how to use this repository as a template for new projects rather than treating it as an app that should keep growing by default.
