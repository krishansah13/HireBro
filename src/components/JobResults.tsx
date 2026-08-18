import { getJobs } from "@/lib/job-query";
import { JobSearchProps } from "@/types/JobTypes";
import JobSection from "./JobSection";
import Pagination from "./Pagination";


export default async function JobResults({ currentParams }: { currentParams: JobSearchProps }) {
    const remote = currentParams.remote === "true" ? true : currentParams.remote === "false" ? false : null;

    const result = await getJobs({
        q: currentParams.q,
        location: currentParams.location,
        type: currentParams.type as | "part-time" | "full-time" | "internship" | "contract" | undefined,
        remote: remote??undefined,
        sort: (currentParams.sort as "newest" | "oldest" | undefined),
        page: currentParams.page,
        limit: 10,
    });

    const  currentPage = result.page??1;
    const totalPages = Math.ceil(result.total/10);

    return (
        <>
        <JobSection result = {result}/>
        {
            result.jobs.length>0 && totalPages >1 && (
                <div>
                    <Pagination page = {currentPage} totalPages = {totalPages} params = {currentParams}/>
                </div>
            )
        }
        </>
    )
}