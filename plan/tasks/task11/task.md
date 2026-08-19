# Task 11 — Apply Server Action + form

**Status:** pending

## Scope

Zod-validated Server Action creates an Application (`stage: applied`, history seed). Client form uses `useActionState` / `useFormStatus`. Resume goes client → `/api/upload` → action. Visitors go to login. Duplicate `(jobId, userId)` is rejected. Cover note survives a failed upload.

Wire the form on the full job page and the intercepting modal.

## Done when

- A seeker can apply once per job with a PDF and optional cover note
- A visitor is sent to `/login?callbackUrl=...`
- A second apply returns a validation error, not a second row
