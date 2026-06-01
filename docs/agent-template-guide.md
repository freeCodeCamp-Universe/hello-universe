# Agent Template Guide

## Purpose

Use this repository as a template for new framework-free static sites that deploy with the Universe CLI (`@freecodecamp/universe-cli`).

This is not a production app to extend by default. When asked to create a new project from this repo, copy the structure and replace the sample identity.

## Source Of Truth

The shipped CLI is canonical. When docs and CLI behavior disagree, follow the CLI.

- Human setup and workflow: `../README.md`
- `platform.yaml` schema (every field, defaults, validation): `../../universe-cli/docs/platform-yaml.md`
- Schema implementation (the actual validator): `../../universe-cli/src/lib/platform-yaml.schema.ts`
- Operator deploy walkthrough: `../../universe-cli/docs/STAFF-GUIDE.md`
- CLI command surface: `../../universe-cli/README.md`

## Files That Matter

- `platform.yaml`: deployment contract (v2 schema; see below)
- `package.json`: local scripts and package identity (build is `pnpm build` → Vite)
- `vite.config.ts`: multi-page build (`index.html`, `config.html`, `about.html` → `dist/`)
- `index.html`, `config.html`, `about.html`: HTML entry points (each sets `data-page`)
- `src/data/site.ts`: sample identity and shared example data
- `src/pages/{home,config,template}.ts`: page-level content
- `src/components/render.ts`: shared page renderer
- `src/scripts/main.ts`: page bootstrapping (routes `data-page` → page module)
- `src/styles/base.css`: shared styles

Ignore generated output:

- `dist/`
- `node_modules/`

## `platform.yaml` Contract (v2)

`platform.yaml` lives at the repo root and is the only config the CLI reads. The schema is **strict** — unknown keys at any level are rejected. There are **no credential fields**: the artemis proxy holds the R2 admin key, the CLI never reads or writes one.

Minimal valid file:

```yaml
site: my-site
```

Full example (matches this repo's `platform.yaml`):

```yaml
site: my-site

build:
  command: pnpm build
  output: dist

deploy:
  preview: true
  ignore:
    - "*.map"
    - "node_modules/**"
    - ".git/**"
    - ".env*"
```

### Fields

- `site` (required, string): becomes `<site>.freecode.camp` (production) and `<site>.preview.freecode.camp` (preview). Lowercase letters, digits, single hyphens; 1–63 chars; no leading/trailing/consecutive hyphens.
- `build` (optional, object): omit if you upload pre-built artifacts.
  - `command` (optional, string): shell command run before deploy. Omit to skip the build and ship existing output.
  - `output` (optional, string, default `dist`): directory uploaded, relative to repo root.
- `deploy` (optional, object): omit to take all defaults.
  - `preview` (boolean, default `true`): `universe static deploy` publishes to preview unless `--promote` is passed.
  - `ignore` (array of string, default `["*.map", "node_modules/**", ".git/**", ".env*"]`): gitignore-style patterns; overriding **replaces** the default list.

### Rejected v1 fields (do NOT use)

The CLI detects and rejects the old v1 schema with a migration error. **Never** write any of these keys:

- `name` — replaced by `site`.
- `stack` — removed (only `static` ever existed).
- `domain` (`production` / `preview`) — derived from `site`, not declared.
- `static` (`output_dir`, `bucket`, `rclone_remote`, `region`, `endpoint`, `key`) — removed entirely. Output dir lives under `build.output`. There is no bucket, rclone remote, or region in staff hands.
- `r2` — removed; the proxy holds R2 credentials.

## Deploy Model

`universe static deploy` runs `build.command`, walks `build.output`, applies the `deploy.ignore` filter, then uploads files to the artemis proxy at `uploads.freecode.camp`. The proxy writes the bytes to R2 and aliases the site domain. **There is no rclone, no bucket name, and no region** — that legacy model (the retired `gxy-static` cluster) is gone. The `gxy-cassiopeia` static-serve plane (Caddy fronting R2) serves `*.freecode.camp` today.

Do not tell users to copy `dist/` anywhere. The CLI handles the upload.

## Scaffold Procedure

When asked to create a new project from this repository, follow this sequence instead of improvising a new structure.

1. Copy the repository structure, but ignore `dist/` and `node_modules/`.
1. Set `site:` in `platform.yaml` to the new slug (lowercase, hyphenated, valid per the rules above).
1. Replace sample copy in `src/data/site.ts` and `src/pages/*.ts`.
1. Update repo/package identity in `package.json`.
1. Keep the Vite multi-page structure unless the task explicitly asks for another toolchain.
1. `pnpm build` and verify `dist/` contains the static site.

## Rename Map

Search for and replace these values first:

- `hello-universe` (the `site:` slug in `platform.yaml`, package name, repo identity)
- `Hello Universe` (display name, page titles, marketing copy)
- sample data in `src/data/site.ts`
- page headings and summaries in `src/pages/{home,config,template}.ts`

Note: domains are **not** declared anywhere — they derive from `site:`. Do not search for a production/preview domain string to replace; setting `site:` is sufficient.

Usually keep these unless the new project needs different tooling:

- Vite multi-page setup in `vite.config.ts`
- framework-free TypeScript/HTML/CSS structure
- `src/components/render.ts` and `src/scripts/main.ts`
- shared stylesheet layout in `src/styles/base.css`

## Template Rules

- Keep the project framework-free unless explicitly asked to add a framework.
- Keep build output static and file-based.
- Prefer small edits to `src/data/site.ts` and `src/pages/*.ts` over rewriting the renderer.
- Keep `platform.yaml` on the v2 schema. If you need a field that does not exist, do not invent it — confirm against `../../universe-cli/docs/platform-yaml.md` first.

## CLI Command Surface (shipped, v0.8.0)

Verify with `universe --version` and `universe --help`.

Top-level (cross-cutting):

```sh
universe login      # GitHub OAuth device flow
universe logout     # delete stored token
universe whoami     # current login + authorized-sites count
universe --version
```

Static-site verbs (under `static`):

```sh
universe static deploy [--promote] [--dir <path>]
universe static promote [--from <deployId>]
universe static rollback --to <deployId>
universe static ls [--site <site>]
```

Site registry (under `sites`, staff-gated writes):

```sh
universe sites ls [--mine]
universe sites register <slug> [--team=<name>...]
universe sites update <slug> --team=<name>...
universe sites rm <slug>
```

Repository creation + approval queue (under `repo`, staff/admin-gated):

```sh
universe repo create [name] [--visibility public|private] [--template <repo>] [--description <text>] [--yes]
universe repo ls [--status <state>] [--mine]
universe repo status <id>
universe repo approve <id> [--yes]
universe repo reject <id> [--reason <text>] [--yes]
```

All commands support `--json` for CI.

## Pitfalls To Avoid

- Do not write v1 `platform.yaml` keys (`name`, `stack`, `domain`, `static`, `r2`) — the CLI rejects them.
- Do not add `bucket`, `rclone_remote`, `region`, or any credential field — they do not exist in v2.
- Do not tell users to copy `dist/` — the CLI uploads it via the proxy.
- Do not declare domains — they derive from `site:`.
- Do not reference `gxy-static` — it is retired; `gxy-cassiopeia` serves `*.freecode.camp` from R2.
- Do not add services, runtime backends, or framework dependencies unless requested.
