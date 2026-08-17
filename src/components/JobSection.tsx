import { JobSearchProps, Job } from "@/types/JobTypes";
import { SlidersHorizontal } from "lucide-react";
import Filters from "./Filters";
import EmptyState from "./EmptyState";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { getJobs } from "@/lib/job-query";

type JobSearchResult = Awaited<ReturnType<typeof getJobs>>;

export default function JobSection({
    result,
    currentParams,
}: {
    result: JobSearchResult;
    currentParams: JobSearchProps;
}) {
    const currentPage = result.page ?? 1;
    const totalPages = Math.ceil(result.total / 10);

    return (
        <section className="min-h-[500px] bg-white p-7 shadow-2xl">
            <div className="mb-6 flex items-end justify-between">

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
                    {result.jobs.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="space-y-5">
                            <div>
                                <p className="m-1 text-2xl text-gray-950 font-extrabold">
                                    {result.total.toLocaleString()}{" "}
                                    {result.total === 1 ? "open role" : "open roles"}
                                </p>
                                <p className="m-1 text-sm text-gray-950">
                                    Showing {result.jobs.length} of {result.total.toLocaleString()} open roles
                                </p>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {result.jobs.map((job: Job) => (
                                    <JobCard key={job._id.toString()} job={job} />
                                ))}
                            </div>
                        </div>
                    )}

                    {result.jobs.length > 0 && totalPages > 1 && (
                        <Pagination page={currentPage} totalPages={totalPages} params={currentParams} />
                    )}
                </div>
            </div>
        </section>
    );
}