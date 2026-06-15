# juhana.wtf

My (yet another) new website, build with SvelteKit and Tailwind CSS!

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# Or start the server and open the app in a new browser tab
pnpm dev --open
```

## Building

To create a production version of your app:

```bash
pnpm build # Build for local testing
docker build -t juhana-wtf . # Docker for production
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Docker

```bash
docker run -e PUBLIC_PLAUSIBLE_DOMAIN=juhana.wtf -d -p 3000:3000 juhana-wtf # Run, remember to use in compose too (environment block or env_file)
docker stop juhana-wtf && docker rm juhana-wtf # Remove
```

## Database

Newsletter and campaign state use Postgres through Kysely.

Required environment variable:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/juhana_wtf
```

Run migrations explicitly:

```bash
pnpm db:migrate
```

Migrations are not run automatically on app startup. Public blog pages should keep working even when the database is not configured.

## Newsletter

Subscriptions are hidden and disabled unless all required configuration is present:

```bash
SUBSCRIPTIONS_ENABLED=true
DATABASE_URL=postgres://user:password@localhost:5432/juhana_wtf
PUBLIC_SITE_URL=https://juhana.wtf
PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
POSTMARK_SERVER_TOKEN=...
POSTMARK_TRANSACTIONAL_STREAM=outbound
POSTMARK_BROADCAST_STREAM=broadcast
POSTMARK_FROM_EMAIL=newsletter@juhana.wtf
```

`PUBLIC_SITE_URL` defaults to `https://juhana.wtf` if omitted. `POSTMARK_FROM_EMAIL` must be a verified dedicated sender in Postmark.

Manual campaign commands use post slugs:

```bash
pnpm blog:campaign:preview -- welcome
pnpm blog:campaign:preview -- welcome you@example.com
pnpm blog:campaign:queue -- welcome
pnpm blog:campaign:process -- welcome
pnpm blog:campaign:retry -- welcome
```

Campaign targeting is fixed to the post theme. Failed deliveries are only retried when explicitly re-queued with `blog:campaign:retry`.

## Blogs

Format like this:

```md
---
title: 'Your Post Title'
description: 'A brief description'
date: '2025-12-29'
theme: 'builder-notes'
draft: false
author: 'Your Name'
---
```
