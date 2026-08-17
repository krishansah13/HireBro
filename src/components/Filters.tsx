"use client";

import { JobSearchProps } from "@/types/JobTypes";
import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Filters({
    params,
}: {
    params: JobSearchProps;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [type, setType] = useState(params.type ?? "");
    const [remote, setRemote] = useState(
        params.remote ?? "any"
    );
    const [sort, setSort] = useState(
        params.sort ?? "newest"
    );

    
    useEffect(() => {
        setType(searchParams.get("type") ?? "");
        setRemote(searchParams.get("remote") ?? "any");
        setSort(searchParams.get("sort") ?? "newest");
    }, [searchParams]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newParams = new URLSearchParams();

        const q = searchParams.get("q");
        const location = searchParams.get("location");

        if (q) {
            newParams.set("q", q);
        }

        if (location) {
            newParams.set("location", location);
        }

        if (type) {
            newParams.set("type", type);
        }

        if (remote !== "any") {
            newParams.set("remote", remote);
        }

        if (sort) {
            newParams.set("sort", sort);
        }

        newParams.set("page", "1");

        router.push(`${pathname}?${newParams.toString()}`);
    }

    function handleClear() {
        const newParams = new URLSearchParams();

        const q = searchParams.get("q");
        const location = searchParams.get("location");

        if (q) {
            newParams.set("q", q);
        }

        if (location) {
            newParams.set("location", location);
        }

        newParams.set("page", "1");


        setType("");
        setRemote("any");
        setSort("newest");

        router.push(`${pathname}?${newParams.toString()}`);
    }

    return (
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={17} />

                    <h2 className="font-semibold">
                        Filters
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs text-gray-400 hover:text-black"
                >
                    Clear
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-7"
            >
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
                                    checked={type === value}
                                    onChange={(e) =>
                                        setType(e.target.value)
                                    }
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
                        {/* Any */}
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                            <input
                                type="radio"
                                name="remote"
                                value="any"
                                checked={remote === "any"}
                                onChange={() =>
                                    setRemote("any")
                                }
                                className="h-4 w-4 accent-black"
                            />

                            Any
                        </label>

                        {/* Remote */}
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                            <input
                                type="radio"
                                name="remote"
                                value="true"
                                checked={remote === "true"}
                                onChange={() =>
                                    setRemote("true")
                                }
                                className="h-4 w-4 accent-black"
                            />

                            Remote
                        </label>

                        {/* On-site */}
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                            <input
                                type="radio"
                                name="remote"
                                value="false"
                                checked={remote === "false"}
                                onChange={() =>
                                    setRemote("false")
                                }
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
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value)
                        }
                        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-black"
                    >
                        <option value="newest">
                            Newest
                        </option>

                        <option value="oldest">
                            Oldest
                        </option>
                    </select>
                </div>

                {/* Apply */}
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
