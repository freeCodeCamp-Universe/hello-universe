import type { PageDefinition } from "../components/render";
import { platformYamlExample, site, storageLayoutExample } from "../data/site";

export const configPage: PageDefinition = {
  title: "platform.yaml",
  summary:
    "This page mirrors the current shipped static schema in universe-cli so freeCodeCamp staff can understand what each field does before cloning the starter into a new constellation.",
  sections: [
    {
      title: "Current Example",
      intro:
        "Keep the sample explicit. It is easier for staff and contributors to learn from a complete config than from defaults hidden in the CLI.",
      cards: [
        {
          title: "platform.yaml",
          body: "The starter keeps the full static block visible so readers understand the deployed contract immediately, without needing to inspect CLI source first.",
          code: platformYamlExample,
        },
      ],
    },
    {
      title: "Field Guide",
      intro:
        "These fields are the current shipped contract for static sites on Universe.",
      cards: [
        {
          title: "name and domain",
          body: "The sample keeps the production domain and preview domain explicit so teams can see exactly which URLs the CLI prints and updates.",
          list: [
            `name: ${site.productionDomain}`,
            `domain.production: ${site.productionDomain}`,
            `domain.preview: ${site.previewDomain}`,
          ],
        },
        {
          title: "static.output_dir",
          body: "The CLI reads built files from this directory. The default is dist, but the sample keeps it explicit so local build expectations stay obvious.",
          list: [
            "CLI flag: --output-dir build",
            "Env override: UNIVERSE_STATIC_OUTPUT_DIR",
          ],
        },
        {
          title: "Storage settings",
          body: "These values tell the CLI which bucket and fallback rclone remote to use, plus the region for the S3-compatible endpoint used by the platform's static storage path.",
          list: [
            `bucket: ${site.bucket}`,
            `rclone_remote: ${site.rcloneRemote}`,
            `region: ${site.region}`,
          ],
        },
      ],
    },
    {
      title: "Resolution Rules",
      intro:
        "The starter is meant to teach not only what the file looks like, but how the CLI resolves settings during real staff workflows.",
      cards: [
        {
          title: "Runtime precedence",
          body: "When the same setting appears in multiple places, the CLI resolves it in a fixed order so teams can override values predictably.",
          list: [
            "CLI flags",
            "Environment variables",
            "platform.yaml",
            "Built-in defaults",
          ],
        },
        {
          title: "Credential precedence",
          body: "Current staff workflows use environment variables first, with an rclone fallback reserved mainly for platform-team or automation use cases.",
          list: [
            "S3_ACCESS_KEY_ID + S3_SECRET_ACCESS_KEY + S3_ENDPOINT",
            `rclone remote named ${site.rcloneRemote}`,
          ],
        },
        {
          title: "Git behavior",
          body: "Dirty working trees only warn. Missing git metadata is a hard failure unless the deploy uses --force, which protects release history by default.",
          list: [
            "Dirty tree: warning only",
            "No git hash: fail unless --force",
            "Force deploy: deploy ID ends with nogit when needed",
          ],
        },
      ],
    },
    {
      title: "Storage Model",
      intro:
        "The sample should help readers understand what the CLI actually writes to storage when they deploy a static constellation.",
      cards: [
        {
          title: "Immutable layout",
          body: "Each deploy gets its own immutable prefix. Preview and production are just mutable alias files that point at deploy IDs, which keeps releases easy to audit.",
          code: storageLayoutExample,
        },
        {
          title: "Deploy metadata and caching",
          body: "The CLI writes deploy metadata under _universe and sets content-type plus cache-control per uploaded object so the static serving path stays predictable.",
          list: [
            "HTML: public, max-age=60, must-revalidate",
            "Fingerprinted assets: public, max-age=31536000, immutable",
            "Other assets: public, max-age=3600",
          ],
        },
      ],
    },
  ],
};
