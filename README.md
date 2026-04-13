# Hello World

Test constellation for validating the Universe static deploy pipeline.

## Prerequisites

- `universe` CLI binary ([Install](https://github.com/freeCodeCamp-Universe/universe-cli#install))
- R2 credentials (see Setup below)

## Setup

Get an R2 API token from the platform team, or create one:

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
universe static deploy
```

This uploads `dist/` to R2 and sets the preview alias. The deploy ID is printed on success.

## Go Live

```sh
universe static promote
```

Promotes the current preview to production. The site goes live at https://hello-world.freecode.camp within 5 minutes.

## Rollback

```sh
universe static rollback --confirm
```

Reverts production to the previous deploy.

## Verify

After promote, check your site:

```sh
curl -s https://hello-world.freecode.camp
```
