# Task 13 — Employer post, edit, publish

**Status:** in progress

## Scope

- `/employer` lists jobs for `session.user.companyId`
- `/employer/jobs/new` multi-step form (Server Actions + `useActionState`)
- `/employer/jobs/[id]/edit` for the same company
- Publish from draft
- On publish/edit: `revalidateTag("jobs")` and `revalidateTag("job:{slug}")`

Ownership is `companyId` in the query, not a UI-only check.

## Done when

- Employer can create a draft, publish it, and edit it
- Another company's job id 404s
- Public list/detail pick up the write without a redeploy

## Progress

### Done

- [`src/lib/employer-query.ts`](../../src/lib/employer-query.ts) — `getCompanyJobs` / `getCompanyJobById` scoped to `companyId`
- [`src/components/JobStatusBadge.tsx`](../../src/components/JobStatusBadge.tsx) — draft / published / expired badge
- [`src/app/(dashboard)/employer/page.tsx`](../../src/app/(dashboard)/employer/page.tsx) — company job list + links to new/edit

### In progress

- Server Actions (`createJob` / `updateJob` / `publishJob` + `revalidateJobBoard`)

### Still todo

- `/employer/jobs/new` multi-step form (`useActionState`)
- `/employer/jobs/[id]/edit`
- End-to-end: draft → publish → public board updates without redeploy
