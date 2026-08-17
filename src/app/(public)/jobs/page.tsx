import { getJobs } from "@/lib/job-query";
import { jobQuerySchema } from "@/lib/validation";
import { JobSearchProps } from "@/types/JobTypes";
import HeroSection from "@/components/HeroSection";
import JobSection from "@/components/JobSection";

export default async function JobSearch({
    searchParams,
}: {
    searchParams: Promise<JobSearchProps>;
}) {
    const params = await searchParams;

    const parsed = jobQuerySchema.parse(params);

    const remote =
        parsed.remote === "true"
            ? true
            : parsed.remote === "false"
              ? false
              : undefined;

    const result = await getJobs({
        q: parsed.q,
        location: parsed.location,
        type: parsed.type,
        remote,
        sort: parsed.sort ?? "newest",
        page: parsed.page,
        limit: 10,
    });

    const currentParams: JobSearchProps = {
        q: parsed.q,
        location: parsed.location,
        type: parsed.type,
        remote: parsed.remote,
        sort: parsed.sort,
    };

    return (
        <main>
            <HeroSection params={currentParams} />

            <JobSection result={result} currentParams={currentParams}/>
        </main>
    );
}