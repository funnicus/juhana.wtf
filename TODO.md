# Blog Infrastructure Upgrade Plan

## Goal

Upgrade the current SvelteKit blog from a single Markdown feed into a structured publishing and audience system.

The blog should remain simple and git-native for writing, while gaining better topic organization, themed feeds, and mailing list infrastructure.

## Current State

* SvelteKit app
* Blog posts stored as Markdown files
* Single blog feed
* Runs on my own server
* Exposed publicly through Cloudflare

## Target Architecture

```txt
Internet
  ↓
Cloudflare DNS / WAF / Tunnel / Turnstile
  ↓
Self-hosted server
  ├─ SvelteKit app container
  ├─ Postgres container
  ├─ cloudflared container
  ├─ backup job/container
  └─ optional worker/cron container
```

## Core Principle

Do **not** move blog posts into the database yet.

Keep posts as Markdown files in git.

Use Postgres only for dynamic audience infrastructure:

* newsletter subscribers
* theme preferences
* double opt-in state
* unsubscribe tokens
* email campaign/delivery logs
* possible future comments or reactions

## Blog Content Model

Add structured frontmatter to Markdown posts.

Example:

```yaml
---
title: "AI Coding Tools Are Great Until Architecture Matters"
slug: "ai-coding-tools-architecture"
date: "2026-06-15"
description: "Notes from using AI heavily in real software work."
themes: 
  - builder-notes
tags:
  - ai
  - game development
language: "en"
draft: false
featured: true
---
```

## Initial Theme Taxonomy

Implement the blog around these main themes:

```txt
builder-notes               (Building things: code, infra, tools, systems, experiments)
from-agency-to-studio       (Entrepreneurial journey: consulting, studios, games, business lessons)
myth-meaning-direction      (Philosophical, spiritual, mythic, and future-oriented essays)
personal-operating-system   (Life systems: finances, goals, routines, networking, productivity)
creative-practice           (Art, writing, game ideas, sketches, visual experiments, creative process)
```

Suggested display names:

```txt
Builder Notes
From Agency to Studio
Myth, Meaning and Direction
Personal Operating System
Creative Practice
```

## Blog Routes

Add or improve routes like:

```txt
/blog
/blog/[slug]
/blog/theme/[theme]
```

Optional later:

```txt
/blog/language/[language]
/blog/audience/[audience]
```

## Feeds

Generate RSS feeds for:

```txt
/feed.xml
/feed/builder-notes.xml
/feed/ai-realism.xml
/feed/from-agency-to-studio.xml
/feed/games-as-worlds.xml
/feed/myth-meaning-direction.xml
/feed/personal-operating-system.xml
```

The main feed should include all non-draft posts.

Theme feeds should include posts matching that theme.

## Mailing List

Add a simple mailing list system.

Required v1 features:

1. Subscribe form
2. Theme preference selection
3. Double opt-in
4. Unsubscribe link
5. Delivery log
6. Manual/admin-triggered campaign sending

Avoid building a full newsletter platform initially.

No complex analytics, drip campaigns, dashboards, or segmentation yet.

## Suggested Database Tables

```sql
subscribers
  id
  email
  status -- pending, active, unsubscribed
  created_at
  confirmed_at
  unsubscribe_token
  confirmation_token

themes
  id
  slug
  name
  description

subscriber_theme_preferences
  subscriber_id
  theme_id

email_campaigns
  id
  post_slug
  subject
  status -- draft, queued, sent, failed
  created_at
  sent_at

email_deliveries
  id
  campaign_id
  subscriber_id
  status -- queued, sent, failed
  provider_message_id
  error
  sent_at
```

## Admin Flow

Prefer a simple CLI or protected admin endpoint before building a full admin UI.

Example CLI ideas:

```bash
blogctl subscribers list
blogctl campaign create my-post-slug
blogctl campaign preview my-post-slug --email me@example.com
blogctl campaign send my-post-slug --theme ai-realism
```

## Cloudflare Infrastructure

Use OpenTofu/Terraform (I'd prefer OpenTofu) for Cloudflare resources where practical.

Potential resources:

* DNS records
* Cloudflare Tunnel
* tunnel hostname routing
* Turnstile for subscribe/contact forms
* email sender / email routing configuration where supported
* Access policies for protected admin routes
* Workers/Queues later if needed

Some resources already exist on my account through click-ops. Pull those for the initial setup if possibly and evolve it from there.

## Containerization

Add or improve Docker setup.

Expected services:

```yaml
services:
  app:
    image: blog-app
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:18
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  cloudflared:
    image: cloudflare/cloudflared
    command: tunnel run
    restart: unless-stopped

  backup:
    image: blog-backup
    restart: unless-stopped
```

Exact implementation can vary based on the existing project structure.

## Backups

Add backup support before relying on subscriber data. You can use https://github.com/offen/docker-volume-backup.

Minimum requirements:

* daily Postgres dump
* encrypted archive if stored remotely
* off-server storage
* restore instructions
* tested restore command/script

A database without a tested restore path should not be considered safe.

## Suggested Implementation Order

1. Inspect the current SvelteKit app structure.
2. Containerize the current app without changing behavior.
3. Add frontmatter schema validation for posts.
4. Add theme taxonomy.
5. Add theme pages.
6. Add main RSS feed if missing.
7. Add themed RSS feeds.
8. Add Postgres.
9. Add subscriber schema.
10. Add subscribe form.
11. Add Turnstile protection.
12. Add double opt-in.
13. Add unsubscribe flow.
14. Add manual campaign sending.
15. Add delivery logs.
16. Add Cloudflare Tunnel container if not already containerized.
17. Add OpenTofu/Terraform skeleton for Cloudflare.
18. Add backups.
19. Only then consider admin UI improvements.

## Constraints

* Keep the publishing system simple.
* Markdown remains the source of truth for posts.
* Do not overbuild the newsletter system.
* Avoid making the blog dependent on the database for public reading.
* Prefer boring, reliable infrastructure.
* Make changes incrementally and test each step.
* Ask before introducing major architectural dependencies.

## Desired Outcome

The result should be a structured personal publishing system where readers can browse and subscribe by theme.

The system should support both practical technical writing and deeper philosophical essays without forcing every reader into one chaotic feed.

# Other TODOs

1. Check SEO and GEO optimization text. Is it personal enough?
