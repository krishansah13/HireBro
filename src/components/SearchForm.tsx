import { JobSearchProps } from "@/types/JobTypes";
import { Search, MapPin, ArrowRight } from "lucide-react";

export default function SearchForm({
    params,
}: {
    params: JobSearchProps;
}) {
    return (
        <form
            action="/jobs"
            method="GET"
            className="flex w-full flex-col rounded-2xl bg-[#fbf9ff] p-3 shadow-[0_4px_12px_rgba(0,0,0,0.10)] sm:h-[70px] sm:flex-row sm:items-center sm:p-0 sm:px-3"
        >
            {/* Job search */}
            <div className="flex h-12 flex-1 items-center sm:h-full">
                <Search
                    size={16}
                    strokeWidth={2.2}
                    className="ml-3 mr-3 shrink-0 text-[#484855] sm:ml-5 sm:mr-5"
                />

                <input
                    name="q"
                    type="search"
                    defaultValue={params.q}
                    placeholder="Job title, keywords, or company"
                    className="h-full w-full bg-transparent text-[16px] font-normal outline-none placeholder:text-[#a5a4ae]"
                />
            </div>

            {/* Divider */}
            <div className="hidden h-[38px] w-px bg-[#c9c6d1] sm:block" />
            <div className="mx-3 h-px bg-[#c9c6d1] sm:hidden" />

            {/* Location */}
            <div className="flex h-12 flex-1 items-center sm:h-full">
                <MapPin
                    size={16}
                    strokeWidth={2.2}
                    className="ml-3 mr-3 shrink-0 text-[#484855] sm:ml-8 sm:mr-5"
                />

                <input
                    name="location"
                    type="text"
                    defaultValue={params.location}
                    placeholder="City, state, or country"
                    className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-[#a5a4ae]"
                />
            </div>

            {params.type && (
                <input type="hidden" name="type" value={params.type} />
            )}

            {params.remote && (
                <input
                    type="hidden"
                    name="remote"
                    value={params.remote}
                />
            )}

            {params.sort && (
                <input
                    type="hidden"
                    name="sort"
                    value={params.sort}
                />
            )}

            {/* Button */}
            <button
                type="submit"
                className="mt-2 flex h-12 w-full shrink-0 items-center justify-center gap-4 rounded-[14px] bg-[#1739ad] text-[16px] font-semibold text-white transition hover:bg-[#12329c] sm:mt-0 sm:w-32"
            >
                Search
                <ArrowRight size={22} />
            </button>
        </form>
    );
}