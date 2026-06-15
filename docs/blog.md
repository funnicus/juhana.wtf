# Blog Architecture

The blog is a git-native publishing system. Markdown files remain the source of truth; the database is not involved in public reading.

## Post Files

Posts live in `src/routes/blog/posts/*.md`.

The filename is the canonical slug:

```txt
src/routes/blog/posts/welcome.md -> /blog/welcome
```

Do not add a separate required `slug` frontmatter field.

## Frontmatter

Required:

```yaml
---
title: 'Your Post Title'
description: 'A brief description'
date: '2026-06-15'
theme: builder-notes
draft: false
---
```

Optional:

```yaml
author: 'Juhana Kuparinen'
tags:
  - ai-realism
image: '/me.webp'
featured: true
```

A post is public only when:

```txt
draft !== true && date <= now
```

Drafts still need valid frontmatter.

## Themes

Every post has exactly one primary `theme`. Tags are metadata only in v1 and do not get public archive pages.

Theme config lives in `src/lib/blog/themes.ts`.

Current themes:

- `builder-notes`
- `from-agency-to-studio`
- `myth-meaning-direction`
- `personal-operating-system`
- `creative-practice`

## Routes

Public routes:

```txt
/blog
/blog/[slug]
/blog/theme/[theme]
```

Legacy post routes redirect permanently:

```txt
/blog/posts/[slug] -> /blog/[slug]
```

Not implemented in v1:

```txt
/blog/tag/[tag]
/blog/language/[language]
/blog/audience/[audience]
```

## Feeds

Feeds:

```txt
/feed.xml
/feed/builder-notes.xml
/feed/from-agency-to-studio.xml
/feed/myth-meaning-direction.xml
/feed/personal-operating-system.xml
/feed/creative-practice.xml
```

The main feed contains all published posts. Theme feeds contain published posts for that theme only.
