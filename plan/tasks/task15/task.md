# Task 15 — Public jobs API

**Status:** pending

## Scope

- `GET /api/jobs` — same filter/sort/page contract as `/jobs`, shared `getJobs`
- `GET /api/jobs/[id]` — one published job
- Zod validation; 400 on bad params; 404 when missing
- Document the contract in README

## Done when

- UI and API cannot drift because they share `job-query.ts`
- Status codes are correct
