# Hello World

Test constellation for validating the Universe static deploy pipeline.

## Prerequisites

- Node 20+
- [universe-cli](../universe-cli) built (`npx tsup` in that repo)
- R2 credentials (see Setup below)

## Setup

You need an R2 API token scoped to the `gxy-static-1` bucket.

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com) > R2 Object Storage > API Tokens
2. Create API Token: **Object Read & Write**, bucket `gxy-static-1`
3. Save the Access Key ID, Secret Access Key, and Endpoint URL

```sh
cp .env.example .env
# Fill in the three values
source .env
```

## Development

```sh
npm install
npm run dev
```

## Deploy

```sh
npm run build
node ../universe-cli/dist/index.js static deploy
```

This uploads `dist/` to R2 and sets the preview alias. The deploy ID is printed on success.

## Go Live

```sh
node ../universe-cli/dist/index.js static promote
```

Promotes the current preview to production. The site goes live at https://hello-world.freecode.camp within 5 minutes.

## Rollback

```sh
node ../universe-cli/dist/index.js static rollback --confirm
```

Reverts production to the previous deploy.

## Verify

After promote, check your site:

```sh
curl -s https://hello-world.freecode.camp
```
