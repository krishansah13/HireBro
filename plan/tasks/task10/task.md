# Task 10 — Cloudinary resume upload

**Status:** pending

## Scope

`POST /api/upload` accepts a PDF from an authenticated seeker, uploads via Cloudinary with server env, returns `{ url }`. Keys never reach the client.

- `src/lib/upload.ts`
- `src/app/api/upload/route.ts`
- `next.config.ts` `remotePatterns` as needed

## Done when

- Unauthenticated / employer requests are rejected
- Non-PDF is rejected
- Success returns a Cloudinary URL
