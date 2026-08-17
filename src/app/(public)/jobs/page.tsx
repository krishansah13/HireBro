import { SlidersHorizontal } from "lucide-react";

import { getJobs } from "@/lib/job-query";
import { jobQuerySchema } from "@/lib/validation";
import { Job, JobSearchProps } from "@/types/JobTypes";
import SearchForm from "@/components/SearchForm";
import Filters from "@/components/Filters";
import JobCard from "@/components/JobCard";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";


export default async function JobSearch({ searchParams }: { searchParams: JobSearchProps }) {
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

    const currentPage = result.page ?? parsed.page ?? 1;

    const totalPages = result.totalPages ?? Math.ceil(result.total / 10);

    const currentParams: JobSearchProps = {
        q: parsed.q,
        location: parsed.location,
        type: parsed.type,
        remote: parsed.remote,
        sort: parsed.sort,
    };

    return (
        <main className="min-h-screen bg-linear-100 from-white via-white to-indigo-400 shadow-2xl">
            <div className="px-6 py-10 lg:px-8">
                <div>
                    <section className="w-full text-center">
                        <p className="text-sm font-medium text-gray-400">
                            HIRELANE JOBS
                        </p>

                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
                            Find work that fits you.
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                            Discover opportunities from companies looking
                            for people like you.
                        </p>
                    </section>

                    <section className="mx-auto mt-10 max-w-5xl">
                        <SearchForm params={currentParams} />
                    </section>
                </div>

                <section className="mt-12">
                    <div className="mb-6 flex items-end justify-between">
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                                Latest jobs
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {result.total.toLocaleString()}{" "}
                                {result.total === 1 ? "opportunity" : "opportunities"}
                            </p>
                        </div>

                        {/* Mobile filter trigger can be added later */}
                        <div className="flex items-center gap-2 text-sm text-gray-400 lg:hidden">
                            <SlidersHorizontal size={16} />
                            Filters
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
                        {/* Sidebar */}
                        <div className="hidden lg:block">
                            <Filters params={currentParams} />
                        </div>

                        {/* Cards */}
                        <div>
                            {result.jobs.length === 0 ? (<EmptyState />) : (
                                <div className="grid gap-5 md:grid-cols-2">
                                    {result.jobs.map((job: Job) => (
                                        <JobCard key={job._id.toString()} job={job} />
                                    ))}
                                </div>
                            )}

                            {result.jobs.length > 0 && (
                                <Pagination page={currentPage} totalPages={totalPages} params={currentParams} />)}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
