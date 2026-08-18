import { Suspense } from "react";
import { jobQuerySchema } from "@/lib/validation";
import { JobSearchProps } from "@/types/JobTypes";
import HeroSection from "@/components/HeroSection";
import Filters from "@/components/Filters";
import JobResults from "@/components/JobResults";

function JobsFallback() {
  return (
    <div className="min-h-100 animate-pulse space-y-4 p-2">
      <div className="h-8 w-48 rounded bg-gray-100" />
      <div className="h-24 rounded-xl bg-gray-100" />
      <div className="h-24 rounded-xl bg-gray-100" />
      <div className="h-24 rounded-xl bg-gray-100" />
    </div>
  );
}

export default async function JobSearch({
  searchParams,
}: {
  searchParams: Promise<JobSearchProps>;
}) {
  const params = await searchParams;
  const parsed = jobQuerySchema.parse(params);

  const currentParams: JobSearchProps = {
    q: parsed.q,
    location: parsed.location,
    type: parsed.type,
    remote: parsed.remote,
    sort: parsed.sort,
    page: parsed.page,
  };

  const suspenseKey = JSON.stringify(currentParams);

  return (
    <main>
      <HeroSection params={currentParams} />

      <section className="min-h-125 bg-white p-7">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <div className="hidden lg:block">
            <Filters params={currentParams} />
          </div>

          <Suspense key={suspenseKey} fallback={<JobsFallback />}>
            <JobResults currentParams={currentParams} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}