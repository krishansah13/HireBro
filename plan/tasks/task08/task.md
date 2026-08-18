# Task 08 — Public SEO, cache, streaming

**Status:** pending

## Scope

1. `/jobs/[slug]`: `generateStaticParams`, `generateMetadata`, ISR `revalidate` window.
2. `src/app/sitemap.ts` and `src/app/robots.ts` for published jobs.
3. Wrap `/jobs` results in `Suspense` so header/filters paint while results stream.
4. Tag cached reads: `jobs` and `job:{slug}` in `job-query.ts`.
5. Fix `job.remote` → `isRemote`; format salary as INR.

## Done when

- Direct load of a published slug has title/description metadata
- Sitemap lists published jobs
- `/jobs` streams the list independently of the hero
- Job detail shows Remote/On-site from `isRemote` and INR salaries
