# Blog Infrastructure Upgrade Plan

## Goal

Upgrade the current SvelteKit blog from a single chronological Markdown list into a structured publishing and audience system.

The blog should remain simple and git-native for writing, while gaining clear editorial themes, theme-specific feeds, and mailing list infrastructure.

## Current State

- SvelteKit app
- Blog posts stored as Markdown files
- Single blog page/feed surface
- Runs on my own server
- Exposed publicly through Cloudflare

## Core Principles

- Do **not** move blog posts into the database yet.
- Keep posts as Markdown files in git.
- Each published post has exactly one primary editorial theme.
- Tags are metadata only in v1, not public archive pages.
- Public reading must not depend on Postgres, email, Turnstile, or other dynamic infrastructure.
- Use Postgres only for dynamic audience infrastructure.
- Keep changes incremental and test each step.
- Ask before introducing major architectural dependencies.

## Implementation Scope Split

### In This Repository

Implement the SvelteKit and application database parts:

- blog metadata model
- theme taxonomy/config
- `/blog` hub page
- `/blog/[slug]` canonical post routes
- redirects from `/blog/posts/[slug]`
- `/blog/theme/[theme]` pages
- main RSS feed
- theme RSS feeds
- Postgres/Kysely schema and migrations
- subscription UI/backend
- Turnstile-gated subscribe endpoint
- double opt-in
- unsubscribe-all flow
- manual campaign scripts
- Postmark integration
- delivery logs

### Outside This Repository

Handle shared infrastructure separately, likely in the broader infra monorepo:

- Cloudflare DNS
- Cloudflare Tunnel
- Cloudflare Access policies
- Turnstile resource provisioning
- production Docker Compose/deployment wiring
- off-server backups
- restore scripts and restore testing

This repo should still document the required deployment contract: env vars, database migration command, backup requirement, Turnstile requirement, and Postmark requirement.

## Blog Content Model

Add structured frontmatter to Markdown posts.

Use the Markdown filename as the canonical slug. Do not add a required `slug` field yet.

Required v1 fields:

```yaml
---
title: 'AI Coding Tools Are Great Until Architecture Matters'
date: '2026-06-15'
description: 'Notes from using AI heavily in real software work.'
theme: builder-notes
draft: false
---
```

Optional fields:

```yaml
author: 'Juhana Kuparinen'
tags:
  - ai-realism
  - architecture
image: '/me.webp'
featured: true
```

Visibility rule:

```txt
published = draft !== true && date <= now
```

Drafts must still have valid frontmatter.

Default language internally to `en`; do not add public language routes or required language frontmatter in v1.

## Theme Taxonomy

Themes are primary editorial categories. Every post has exactly one theme.

Keep theme definitions in source-controlled TypeScript config, not in Postgres.

### `builder-notes`

Display name: `Builder Notes`

Practical engineering writing: implementation notes, code, architecture, infrastructure, tooling, debugging, and tradeoff reasoning.

Not here: business lessons from building a company, creative process without technical substance, or philosophical essays about technology.

### `from-agency-to-studio`

Display name: `From Agency to Studio`

Entrepreneurship from the inside: lessons from consulting, client work, indie business, and the path toward owned creative products and a game studio.

Not here: personal budgeting/routines unless directly tied to business, or technical implementation unless the main lesson is entrepreneurial.

### `myth-meaning-direction`

Display name: `Myth, Meaning & Direction`

Intuitive essays on meaning, myth, technology, spirituality, and where human life may be heading.

Not here: tactical AI tooling, implementation analysis, productivity systems, or practical business operations.

### `personal-operating-system`

Display name: `Personal Operating System`

Life systems first: money, routines, health, goals, decision-making, relationships/networking, attention, habits, and personal infrastructure.

Not here: engineering workflow unless it is mainly about life systems, or business operations unless mainly about entrepreneurship.

### `creative-practice`

Display name: `Creative Practice`

Behind-the-scenes creative process and experiments: sketches, visual experiments, writing process, game ideas, art workflows, guides, constraints, taste, references, and iteration notes.

Not here: technical game engine implementation unless mainly engineering, or studio/business strategy unless mainly entrepreneurship.

## Blog Routes

Use:

```txt
/blog
/blog/[slug]
/blog/theme/[theme]
```

Redirect old post URLs:

```txt
/blog/posts/[slug] -> /blog/[slug]
```

Do not add v1 routes for:

```txt
/blog/tag/[tag]
/blog/language/[language]
/blog/audience/[audience]
```

## Blog Hub

`/blog` should be a theme directory first, not only a chronological archive.

Recommended structure:

- theme directory with positioning copy
- latest 3-5 published posts across all themes
- link to the all-post RSS feed
- link to each theme page/feed

## Theme Pages

Each theme page should have:

- clear positioning copy
- theme-specific visual treatment, starting with light accent styling
- post list for that theme
- theme RSS link
- subscription CTA once subscriptions are enabled

Use one reusable subscribe component later. On a theme page, it should default to that theme while still allowing the reader to choose other themes.

## Feeds

Generate RSS feeds for:

```txt
/feed.xml
/feed/builder-notes.xml
/feed/from-agency-to-studio.xml
/feed/myth-meaning-direction.xml
/feed/personal-operating-system.xml
/feed/creative-practice.xml
```

The main feed includes all published posts.

Theme feeds include posts matching that theme.

`ai-realism` and `games-as-worlds` are tags/subseries, not top-level theme feeds.

## Mailing List

Add a simple mailing list system after the blog/theme/DB foundation is in place.

Required v1 features:

1. Subscribe form
2. Theme preference selection
3. At least one theme required
4. Turnstile protection
5. Double opt-in
6. Unsubscribe-all link
7. Delivery log
8. Manual/admin-triggered campaign sending

Avoid building a full newsletter platform initially.

No complex analytics, drip campaigns, dashboards, segmentation UI, or Postmark webhooks in v1.

## Subscription Availability

Subscriptions must be explicitly enabled.

Required before accepting subscriptions:

- `SUBSCRIPTIONS_ENABLED=true`
- database configured
- Turnstile configured
- Postmark configured
- off-server backups configured outside this repo

If subscriptions are disabled:

- public blog pages still work
- subscribe UI is hidden
- subscribe endpoints fail closed
- server logs explain the missing dependency

## Database

Use Postgres.

Use Kysely for typed queries and migrations.

Accepted dependencies for the database slice:

- `kysely`
- `pg`
- `tsx`
- `@types/pg`

Do not use `kysely-ctl` in v1. Use repo-local scripts such as `pnpm db:migrate`.

Migrations should be explicit only; do not auto-run migrations on app startup.

Use one database and the default `public` schema in v1.

## Database Tables

Keep theme definitions in code, not in a `themes` table.

Suggested tables:

```sql
subscribers
  id
  email -- normalized lowercase, unique
  status -- pending, active, unsubscribed
  created_at
  updated_at
  confirmed_at
  confirmation_token_hash
  confirmation_expires_at
  unsubscribe_token_hash

subscriber_theme_preferences
  subscriber_id
  theme_slug -- DB check constraint for known theme slugs

email_campaigns
  id
  post_slug
  post_theme
  subject -- snapshot of post title
  status -- draft, queued, sending, sent, failed
  created_at
  queued_at
  sent_at

email_deliveries
  id
  campaign_id
  subscriber_id
  status -- queued, sending, sent, failed
  attempt_count
  claimed_at
  sent_at
  provider_message_id
  error
```

Use DB check constraints for:

- known theme slugs
- subscriber statuses
- campaign statuses
- delivery statuses

## Subscription Rules

- Normalize emails by trimming and lowercasing.
- Store confirmation and unsubscribe token hashes, not raw tokens.
- Confirmation tokens expire, initially after 7 days.
- Public subscribe form always returns a generic success message.
- Public subscribe form must not reveal whether an email is already subscribed.
- For new, pending, active, or unsubscribed emails, public subscribe sends confirmation.
- Preferences are replaced after confirmation.
- Unsubscribe link unsubscribes from all themes.
- Resubscribe requires double opt-in again.

## Campaign Rules

No targeting overrides in v1.

Campaign targeting is deterministic:

```txt
post slug -> post theme -> active subscribers with that theme preference
```

Campaign email content should require the least work:

- subject = post title snapshot
- body = post description + canonical post link
- footer = unsubscribe link

Do not render full Markdown posts into email in v1.

## Postmark

Use Postmark rather than direct server email.

Use separate streams:

- transactional stream for confirmation/unsubscribe/admin test emails
- broadcast stream for post campaigns

Store provider IDs and errors in `email_deliveries`.

Defer Postmark webhooks to a later version.

## Admin / Operator Flow

Prefer repo-local scripts before a packaged CLI.

Example commands:

```bash
pnpm blog:subscribers:list
pnpm blog:campaign:preview -- my-post you@example.com
pnpm blog:campaign:queue -- my-post
pnpm blog:campaign:process -- my-post
pnpm blog:campaign:retry -- my-post
```

Campaign sending is manual/one-shot in v1.

No always-on worker, queue broker, or cron process in v1.

The database table acts as the queue.

Delivery processing should avoid duplicate sends:

- claim queued rows transactionally
- use `for update skip locked`
- mark rows as `sending`
- send outside the transaction
- update each row to `sent` or `failed`
- failed deliveries require explicit retry

## Suggested Implementation Order

### Pass 1: Plan Update

1. Capture decisions in `TODO.md`.

Suggested commit:

```txt
docs: update blog rework plan
```

### Pass 2: Blog Surface

1. Add theme config.
2. Add frontmatter types and validation helpers.
3. Update existing Markdown posts with `theme` and `draft`.
4. Move canonical post route to `/blog/[slug]`.
5. Add redirects from `/blog/posts/[slug]`.
6. Update sitemap/canonical URLs.
7. Convert `/blog` into a theme hub with latest posts.
8. Add `/blog/theme/[theme]`.
9. Add main RSS feed.
10. Add theme RSS feeds.

Suggested commit:

```txt
feat(blog): add themed publishing surface
```

### Pass 3: Database Foundation

1. Add Kysely/Postgres dependencies.
2. Add DB connection module.
3. Add explicit migration runner.
4. Add initial subscriber/campaign tables.
5. Add DB check constraints.
6. Document required env vars and migration command.

Suggested commit:

```txt
feat(db): add newsletter database foundation
```

### Pass 4: Subscription Flow

1. Add subscription enabled config flag.
2. Add reusable subscribe component.
3. Add Turnstile verification.
4. Add subscribe endpoint.
5. Add confirmation email.
6. Add confirmation route.
7. Add unsubscribe-all route.
8. Keep UI hidden while subscriptions are disabled.

Suggested commit:

```txt
feat(newsletter): add double opt-in subscriptions
```

### Pass 5: Campaign Flow

1. Add Postmark email client.
2. Add campaign preview script.
3. Add campaign queue script.
4. Add campaign process script.
5. Add explicit retry script.
6. Add delivery logging.

Suggested commit:

```txt
feat(newsletter): add manual campaign delivery
```

### Pass 6: Infra Handoff

1. Document Cloudflare requirements.
2. Document Turnstile setup expectations.
3. Document off-server backup requirements.
4. Document restore testing requirement.
5. Generate a handoff for the infra monorepo.

Suggested commit:

```txt
docs: add newsletter infrastructure handoff
```

## Constraints

- Prefer minimal diffs.
- Keep the publishing system simple.
- Markdown remains the source of truth for posts.
- Do not overbuild the newsletter system.
- Avoid making the blog dependent on the database for public reading.
- Prefer boring, reliable infrastructure.
- Make changes incrementally and test each step.
- Ask before introducing major architectural dependencies.

## Desired Outcome

The result should be a structured personal publishing system where readers can browse and subscribe by theme.

The system should support practical technical writing, entrepreneurial notes, creative process, life systems, and deeper philosophical essays without forcing every reader into one chaotic feed.

## Other TODOs

1. Check SEO and GEO optimization text. Is it personal enough?
