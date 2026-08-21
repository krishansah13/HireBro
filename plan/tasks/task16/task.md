# Task 16 — Resend stage-change email

**Status:** pending

## Scope

`src/lib/email.ts` sends one email to the applicant when an employer changes stage. Called from the pipeline Server Action. `RESEND_API_KEY` stays server-only. Do not fail the stage write if email send fails; log the error.

## Done when

- A real stage change triggers an email send
- Keys are not imported in Client Components
