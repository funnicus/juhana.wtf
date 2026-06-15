# Newsletter Infrastructure Handoff

This repo implements the application pieces. Shared infrastructure belongs in the infra monorepo.

## App Commits

- `1e3b91f feat(blog): add themed publishing surface`
- `6025e06 feat(db): add newsletter database foundation`
- `598aef3 feat(newsletter): add double opt-in subscriptions`
- `073c22d feat(newsletter): add manual campaign delivery`

Primary plan: `TODO.md`

## Production Environment

```bash
SUBSCRIPTIONS_ENABLED=true
DATABASE_URL=postgres://...
PUBLIC_SITE_URL=https://juhana.wtf
PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
POSTMARK_SERVER_TOKEN=...
POSTMARK_TRANSACTIONAL_STREAM=...
POSTMARK_BROADCAST_STREAM=...
POSTMARK_FROM_EMAIL=newsletter@juhana.wtf
```

## Deploy Order

1. Provision Postgres.
2. Configure off-server backups before enabling subscriptions.
3. Configure Postmark sender and streams.
4. Configure Cloudflare Turnstile.
5. Deploy app without `SUBSCRIPTIONS_ENABLED=true`.
6. Run `pnpm db:migrate`.
7. Verify restore path for backups.
8. Set `SUBSCRIPTIONS_ENABLED=true`.
9. Restart or redeploy app.

## Cloudflare

- Keep DNS, Tunnel, and Access policy resources in the infra monorepo.
- Provision Turnstile for the subscribe form.
- Pass the site key as `PUBLIC_TURNSTILE_SITE_KEY`.
- Pass the secret key as `TURNSTILE_SECRET_KEY`.

## Postmark

- Verify a dedicated sender such as `newsletter@juhana.wtf`.
- Create or identify transactional and broadcast streams.
- Pass stream IDs through env vars.
- Defer webhooks.

## Backups

Subscriptions must not be enabled until backups exist.

Minimum:

- daily Postgres dump
- off-server storage
- encryption if stored remotely
- documented restore command
- tested restore into a clean DB

The app repo does not implement backups.
