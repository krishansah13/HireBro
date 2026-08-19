# Task 13 — Employer post, edit, publish

**Status:** pending

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
