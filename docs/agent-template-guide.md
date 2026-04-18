# Agent Template Guide

## Purpose

Use this repository as a template for new framework-free static constellations that deploy with the current Universe CLI.

This is not a production app to extend by default. When asked to create a new project from this repo, copy the structure and replace the sample identity.

## Source Of Truth

- Human setup and workflow: `README.md`
- Current static CLI behavior: `../../universe-cli/docs/STAFF-GUIDE.md`
- Current shipped static config schema: `../../universe-cli/src/config/schema.ts`
- Broader future platform context: `../../Universe/docs/platform-yaml.md`

When there is a mismatch, follow the shipped CLI behavior in `universe-cli`.

## Files That Matter

- `platform.yaml`: current static deployment contract
- `package.json`: local scripts and package identity
- `vite.config.ts`: multi-page build output
- `index.html`, `config.html`, `about.html`: HTML entry points
- `src/data/site.ts`: sample identity and shared example data
- `src/pages/*.ts`: page-level content
- `src/components/render.ts`: shared page renderer
- `src/scripts/main.ts`: page bootstrapping
- `src/styles/base.css`: shared styles

Ignore generated output:

- `dist/`
- `node_modules/`

## Current Static Config Contract

The shipped CLI supports these fields today:

```yaml
name: my-site.freecode.camp
stack: static
domain:
  production: my-site.freecode.camp
  preview: preview.my-site.freecode.camp
static:
  output_dir: dist
  bucket: gxy-static-1
  rclone_remote: gxy-static
  region: auto
```

Do not invent extra `platform.yaml` fields unless the CLI is updated to support them.

## What To Replace In New Projects

When an agent is asked to create a new project from this repository, default to the sequence below instead of improvising a new structure.

## Scaffold Procedure

1. Copy the repository structure, but ignore `dist/` and `node_modules/`.
2. Rename the package, repo identity, and domain values before changing layout or styling.
3. Update `platform.yaml` so the deployment contract matches the new constellation.
4. Replace sample copy in `src/data/site.ts` and `src/pages/*.ts`.
5. Keep the Vite multi-page structure unless the task explicitly asks for another toolchain.
6. Build and verify the starter still outputs a static site.

## Rename Map

Search for and replace these values first:

- `hello-universe`
- `hello-universe.freecode.camp`
- `preview.hello-universe.freecode.camp`
- `Hello Universe`

Replace these sample values first:

- `hello-universe.freecode.camp`
- `preview.hello-universe.freecode.camp`
- `hello-universe` package/repo identity
- page titles, marketing copy, and starter checklist text in `src/pages/*.ts`
- sample data in `src/data/site.ts`

Usually keep these unless the new project needs different tooling:

- Vite multi-page setup in `vite.config.ts`
- framework-free TypeScript/HTML/CSS structure
- `src/components/render.ts` and `src/scripts/main.ts`
- shared stylesheet layout patterns

Usually replace these immediately:

- `src/data/site.ts` identity values
- page headings and summaries in `src/pages/*.ts`
- repo/package naming in `package.json`
- sample domain values in `platform.yaml`

Usually do not rename unless the task calls for it:

- `src/components/render.ts`
- `src/scripts/main.ts`
- `src/styles/base.css`
- `vite.config.ts`

## Template Rules

- Keep the project framework-free unless explicitly asked to add a framework.
- Keep build output static and file-based.
- Prefer small edits to `src/data/site.ts` and `src/pages/*.ts` over rewriting the renderer.
- Keep `platform.yaml` aligned with the shipped CLI contract.
- If a task is about creating a new project, treat this repo as a starter and rename identifiers rather than polishing the sample itself.

## CLI Behavior Worth Preserving

- `universe static deploy`
- `universe static promote [deploy-id]`
- `universe static rollback`
- `--json` support on shipped commands
- `--force` for deploys without git metadata
- `--output-dir` or `UNIVERSE_STATIC_OUTPUT_DIR` for non-default output directories
- Environment credentials first, `rclone` fallback second

## Near-Term Commands

These are useful to mention for awareness, but they are not the shipped contract yet:

- `universe static init`
- `universe static validate`
- `universe static list`
- `universe static status`
- `universe static cleanup`
- `universe static delete-site`
- `universe static sync` (optional)

Label these as planned whenever you reference them.

## Pitfalls To Avoid

- Do not describe planned commands as already available.
- Do not tell users to copy `dist/`.
- Do not assume the broader Universe docs reflect the currently shipped static CLI exactly.
- Do not add services, runtime backends, or framework dependencies unless requested.
