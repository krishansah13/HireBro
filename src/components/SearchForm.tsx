import { JobSearchProps } from "@/types/JobTypes";

export default function SearchForm({params}: {params: JobSearchProps;}) {
    return (
        <form action="/jobs" method="GET" className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
                <input name="q" type="search" placeholder="Search jobs, skills, or keywords..." defaultValue={params.q} className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-black"/>
            </div>

            <div className="relative sm:w-56">
                <input name="location" type="text" placeholder="Location" defaultValue={params.location} className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-black"
                />
            </div>

            {/* Preserve existing filters */}
            {params.type && (
                <input type="hidden" name="type" value={params.type} />
            )}

            {params.remote && (
                <input type="hidden" name="remote" value={params.remote}/>
            )}

            {params.sort && (
                <input type="hidden" name="sort" value={params.sort}/>
            )}

            <button type="submit" className="h-12 rounded-xl bg-linear-100 from-gray-800 via-gray-600 to-mauve-900 px-7 text-sm font-medium text-white transition hover:scale-105 cursor-pointer h">
                Search
            </button>
        </form>
    );
}
