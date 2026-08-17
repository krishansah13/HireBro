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
            className="flex h-[70px] w-full items-center rounded-2xl bg-[#fbf9ff] px-3 shadow-[0_4px_12px_rgba(0,0,0,0.10)]"
        >
            {/* Job search */}
            <div className="flex h-full flex-1 items-center">
                <Search
                    size={16}
                    strokeWidth={2.2}
                    className="ml-5 mr-5 shrink-0 text-[#484855]"
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
            <div className="h-[38px] w-px bg-[#c9c6d1]" />

            {/* Location */}
            <div className="flex h-full flex-1 items-center">
                <MapPin
                    size={16}
                    strokeWidth={2.2}
                    className="ml-8 mr-5 shrink-0 text-[#484855]"
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
                className="flex h-12 w-32 shrink-0 items-center justify-center gap-4 rounded-[14px] bg-[#1739ad] text-[16px] font-semibold text-white transition hover:bg-[#12329c]"
            >
                Search
                <ArrowRight size={22} />
            </button>
        </form>
    );
}