export const site = {
  displayName: "Hello Universe",
  packageName: "hello-universe",
  productionDomain: "hello-universe.freecode.camp",
  previewDomain: "preview.hello-universe.freecode.camp",
  outputDir: "dist",
  bucket: "gxy-static-1",
  rcloneRemote: "gxy-static",
  region: "auto",
};

export const platformYamlExample = `name: hello-universe.freecode.camp
stack: static
domain:
  production: hello-universe.freecode.camp
  preview: preview.hello-universe.freecode.camp
static:
  output_dir: dist
  bucket: gxy-static-1
  rclone_remote: gxy-static
  region: auto`;

export const storageLayoutExample = `s3://gxy-static-1/hello-universe.freecode.camp/
  deploys/
    {deploy-id}/
  preview
  production
  _universe/
    deploys/{deploy-id}.json`;

export const shippedCommands = [
  "universe static deploy",
  "universe static promote [deploy-id]",
  "universe static rollback",
];

export const plannedCommands = [
  "universe static init",
  "universe static validate",
  "universe static list",
  "universe static status",
  "universe static cleanup",
  "universe static delete-site",
  "universe static sync",
];

export const repoMap = [
  "platform.yaml: current static deployment contract",
  "index.html, config.html, about.html: separate HTML entry points",
  "src/data/site.ts: sample identity and reusable example values",
  "src/pages/*.ts: page-level content for the starter",
  "src/components/render.ts: shared renderer for all pages",
  "src/scripts/main.ts: bootstraps the page and runtime facts",
  "src/styles/base.css: shared styling",
  "docs/agent-template-guide.md: template instructions for AI agents",
];

export const renameChecklist = [
  "Rename the package and repo identity.",
  "Replace the production and preview domains in platform.yaml.",
  "Update the sample content in src/data/site.ts and src/pages/*.ts.",
  "Confirm the project still fits a framework-free static starter before changing tooling.",
  "Do not copy dist/ or node_modules/ into a new project.",
];
