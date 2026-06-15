# Newsletter Architecture

The newsletter system adds dynamic audience infrastructure without moving posts into the database.

Public blog reading must keep working without database, Turnstile, or Postmark config.

## Required Environment

Subscriptions are hidden and disabled unless all required config is present:

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

`PUBLIC_SITE_URL` defaults to `https://juhana.wtf`, but production should set it explicitly.

## Database

Postgres is accessed through Kysely.

Run migrations explicitly:

```bash
pnpm db:migrate
```

Migrations are not run on app startup.

## Subscription Flow

1. Reader submits email and at least one theme.
2. Turnstile token is verified server-side.
3. Email is normalized to lowercase.
4. Confirmation and unsubscribe tokens are generated.
5. Only token hashes are stored.
6. Theme choices are stored as pending preferences.
7. Postmark sends a confirmation email.
8. Confirmation replaces active preferences with pending preferences.

Public subscribe responses do not reveal whether an email already exists.

Unsubscribe links unsubscribe from all themes.

## Campaign Flow

Campaign commands use post slugs:

```bash
pnpm blog:campaign:preview -- welcome
pnpm blog:campaign:preview -- welcome you@example.com
pnpm blog:campaign:queue -- welcome
pnpm blog:campaign:process -- welcome
pnpm blog:campaign:retry -- welcome
```

Targeting is deterministic:

```txt
post_slug -> post.theme -> active subscribers with that theme
```

There are no targeting overrides in v1.

`process` handles queued deliveries only. Failed deliveries are retried only after `blog:campaign:retry` re-queues them.

## Postmark

Use separate streams:

- transactional stream for confirmation email
- broadcast stream for post campaign email

Webhooks are intentionally deferred.
