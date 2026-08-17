import { JobSearchProps } from "@/types/JobTypes";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export default function Filters({params}:{params: JobSearchProps;}) {
    return (
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={17} />

                    <h2 className="font-semibold">
                        Filters
                    </h2>
                </div>

                <Link
                    href="/jobs"
                    className="text-xs text-gray-400 hover:text-black"
                >
                    Clear
                </Link>
            </div>

            <form
                action="/jobs"
                method="GET"
                className="space-y-7"
            >
                {/* Preserve search */}
                {params.q && (
                    <input
                        type="hidden"
                        name="q"
                        value={params.q}
                    />
                )}

                {params.location && (
                    <input
                        type="hidden"
                        name="location"
                        value={params.location}
                    />
                )}

                {/* Job Type */}
                <div>
                    <h3 className="mb-3 text-sm font-medium">
                        Job type
                    </h3>

                    <div className="space-y-3">
                        {[
                            ["full-time", "Full-time"],
                            ["part-time", "Part-time"],
                            ["contract", "Contract"],
                            ["internship", "Internship"],
                        ].map(([value, label]) => (
                            <label
                                key={value}
                                className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
                            >
                                <input
                                    type="radio"
                                    name="type"
                                    value={value}
                                    defaultChecked={params.type === value}
                                    className="h-4 w-4 accent-black"
                                />

                                {label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Work mode */}
                <div>
                    <h3 className="mb-3 text-sm font-medium">
                        Work mode
                    </h3>

                    <div className="space-y-3">
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                            <input
                                type="radio"
                                name="remote"
                                value=""
                                defaultChecked={!params.remote}
                                className="h-4 w-4 accent-black"
                            />

                            Any
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                            <input
                                type="radio"
                                name="remote"
                                value="true"
                                defaultChecked={params.remote === "true"}
                                className="h-4 w-4 accent-black"
                            />

                            Remote
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                            <input
                                type="radio"
                                name="remote"
                                value="false"
                                defaultChecked={params.remote === "false"}
                                className="h-4 w-4 accent-black"
                            />

                            On-site
                        </label>
                    </div>
                </div>

                {/* Sort */}
                <div>
                    <h3 className="mb-3 text-sm font-medium">
                        Sort by
                    </h3>

                    <select
                        name="sort"
                        defaultValue={params.sort ?? "newest"}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-black"
                    >
                        <option value="newest">
                            Newest
                        </option>

                        <option value="oldest">
                            Oldest
                        </option>

                        <option value="relevant">
                            Most relevant
                        </option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="h-11 w-full rounded-xl bg-black text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    Apply filters
                </button>
            </form>
        </aside>
    );
}
