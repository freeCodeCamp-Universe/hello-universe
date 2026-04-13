# Hello World

Test constellation for validating the Universe static deploy pipeline.

## Prerequisites

- Node 20+
- [universe-cli](../universe-cli) built (`npx tsup` in that repo)
- S3 credentials for R2 bucket `gxy-static-1` (see below)

## Setup Credentials

You need an R2 API token scoped to the `gxy-static-1` bucket.

### Create R2 API Token

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select the account that owns `gxy-static-1`
3. Go to **R2 Object Storage** > **API Tokens**
4. Click **Create API token**
5. Set:
   - Name: `universe-cli-dev`
   - Permissions: **Object Read & Write**
   - Scope: **Specific bucket** > `gxy-static-1`
6. Click **Create API Token**
7. Save the three values shown (secret is shown only once):
   - Access Key ID
   - Secret Access Key
   - Endpoint URL (`https://<account-id>.r2.cloudflarestorage.com`)

### Option A: Environment Variables

```sh
cp .env.example .env
```

Edit `.env` with the values from above:

```sh
S3_ACCESS_KEY_ID=<access key id>
S3_SECRET_ACCESS_KEY=<secret access key>
S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
```

Load them:

```sh
source .env
```

### Option B: rclone Remote (persistent across sessions)

```sh
rclone config
```

1. `n` — new remote
2. Name: `gxy-static`
3. Type: `s3`
4. Provider: `Cloudflare`
5. Access Key ID: paste from above
6. Secret Access Key: paste from above
7. Region: leave blank
8. Endpoint: paste from above
9. Accept defaults for everything else

Verify:

```sh
rclone ls gxy-static:gxy-static-1 --max-depth 1
```

## Build and Deploy

```sh
npm install
npm run build
node ../universe-cli/dist/index.js static deploy
```

## Promote and Rollback

```sh
node ../universe-cli/dist/index.js static promote
node ../universe-cli/dist/index.js static rollback --confirm
```

## Verify

After deploy, check the R2 bucket for:

```
gxy-static-1/hello-world/deploys/{YYYYMMDD-HHMMSS-git7}/
gxy-static-1/hello-world/preview
gxy-static-1/hello-world/_universe/deploys/{id}.json
```

After promote, check:

```
gxy-static-1/hello-world/production
```
