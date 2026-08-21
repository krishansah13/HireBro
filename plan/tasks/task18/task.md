# Task 18 — Production deploy + smoke tests

**Status:** pending

## Scope

- README: local run, seed, env vars, public API, demo accounts
- Production: hosted MongoDB, `AUTH_SECRET`, Cloudinary, SMTP (`SMTP_*`) — all server-only
- Smoke: login as both roles, apply with a real PDF, move a stage (email), confirm a newly published job appears on `/jobs` without redeploy

## Done when

- README is Hirelane-specific (not create-next-app boilerplate)
- App builds (`next build`)
- Deploy notes exist; production URL if credentials allow
