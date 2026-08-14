import { getJobs } from "@/lib/job-query";
import { jobQuerySchema } from "@/lib/validation";

type JobSearchProps = {
    q?: string,
    location?: string,
    type?: string,
    remote?: string,
    sort?: string,
    page?: number
}

export default async function JobSearch({ searchParams }: { searchParams: JobSearchProps }) {
    const params = await searchParams;
    const parsed = jobQuerySchema.parse(params);

    const result = await getJobs({
        q: parsed.q,
        location: parsed.location,
        type: parsed.type,
        remote:
            (parsed.remote === "true") ? true : (parsed.remote === "false" ? false : undefined),
        sort: parsed.sort ?? "newest",
        page: parsed.page,
        limit: 10
    })
    return (
        <main className="border-2 border-black px-6 py-2 bg-gray-800 text-white">
            <h1 className="text-4xl font-bold">
                Recommend Jobs
            </h1>
            <p>
                Found {result.total} jobs
            </p>
            <div className="flex gap-2">
                <aside className="w-1/6 rounded-2xl px-4 py-3 bg-gray-100 text-black ">
                    <header className="flex justify-between font-extrabold text-gray-500">
                        Search Filters
                        <span className="text-amber-600 text-sm">
                            Clear All
                        </span>
                    </header>

                    <div id="jobType" className="p-3 rounded-xl">
                        <p className="font-bold text-xl">
                            Job Types
                        </p>
                        <div className="rounded-xl px-3 flex flex-col gap-2 mt-2">
                            <p>
                                <input type="checkbox" name="fullTime" id="fullTime" /> <span> Full Time </span>
                            </p>
                            <p>
                                <input type="checkbox" name="partTime" id="partTime" /> <span> Part Time </span>
                            </p>
                            <p>
                                <input type="checkbox" name="internship" id="internship" /> <span> Internship </span>
                            </p>
                            <p>
                                <input type="checkbox" name="contractual" id="contractual" /> <span> Contractual</span>
                            </p>
                        </div>
                    </div>

                    <div id="location" className="p-3 rounded-xl">
                        <h1 className="text-xl font-bold">
                            Location
                        </h1>
                        <div className="rounded-xl px-3 flex flex-col gap-2 mt-2">
                            <p>
                                <input type="checkbox" name="fullTime" id="fullTime" /> <span> Bengaluru</span>
                            </p>
                            <p>
                                <input type="checkbox" name="partTime" id="partTime" /> <span> Hyderabad </span>
                            </p>
                            <p>
                                <input type="checkbox" name="internship" id="internship" /> <span> Gurugram </span>
                            </p>
                            <p>
                                <input type="checkbox" name="contractual" id="contractual" /> <span> Mumbai </span>
                            </p>
                            <p>
                                <input type="checkbox" name="contractual" id="contractual" /> <span> Pune </span>
                            </p>
                            <p>
                                <input type="checkbox" name="remote" id="remote" />
                                <span> Remote,  India </span>
                            </p>
                        </div>
                    </div>

                    <div id="sort" className="px-3 rounded-xl flex gap-3 border py-1 justify-around">
                        <h1>
                            Sort By: 
                        </h1>
                            <select name="option" id="option" className="border rounded-xl px-2 py-1 bg-gray-600 text-white">
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                    </div>
                </aside>
                <div className="px-2 py-2 border-2 border-white rounded-2xl w-5/6">
                    {result.jobs.map((job) => (
                        <article key={job._id.toString()}>
                            <h2>{job.title}</h2>
                            <h3>{job.companyId.name}</h3>
                            <p>{job.location}</p>
                            <p>{job.salaryMin}</p>
                            <p>{job.description}</p>
                            <hr />
                        </article>
                    ))
                    }
                </div>
            </div>
        </main>
    )
} 