# Task 14 — Applicant pipeline

**Status:** pending

## Scope

`/employer/jobs/[id]/applicants` grouped by stage. Role-checked Server Action moves an applicant only along allowed transitions. Job must belong to the employer's `companyId`.

## Done when

- Employer sees applicants for their job only
- Invalid jumps (e.g. applied → offer) are rejected
- Foreign job id 404s
