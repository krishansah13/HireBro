import { JobSearchProps } from "@/types/JobTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

function buildUrl(params: JobSearchProps, page: number) {
    const searchParams = new URLSearchParams();

    if (params.q) {
        searchParams.set("q", params.q);
    }

    if (params.location) {
        searchParams.set("location", params.location);
    }

    if (params.type) {
        searchParams.set("type", params.type);
    }

    if (params.remote) {
        searchParams.set("remote", params.remote);
    } 

    if (params.sort) {
        searchParams.set("sort", params.sort);
    }

    searchParams.set("page", String(page));

    return `/jobs?${searchParams.toString()}`;
}

export default function Pagination({
    page,
    totalPages,
    params,
}: {
    page: number;
    totalPages: number;
    params: JobSearchProps;
}) {
    if (totalPages <= 1) {
        return null;
    }
    return (
        <div className="mt-10 flex items-center justify-center gap-2">
            {page > 1 ? (
                <Link
                    href={buildUrl(params, page - 1)}
                    className="flex h-10 items-center gap-2 rounded-xl 200 bg-white px-4 text-sm hover:bg-gray-50"
                >
                    <ChevronLeft size={16} />
                    Previous
                </Link>
            ) : (
                <span className="flex h-10 items-center gap-2 rounded-xl 100 px-4 text-sm text-gray-300">
                    <ChevronLeft size={16} />
                    Previous
                </span>
            )}

            <div className="flex items-center gap-1">
                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                )
                    .filter(
                        (pageNumber) =>
                            pageNumber === 1 ||
                            pageNumber === totalPages ||
                            Math.abs(pageNumber - page) <= 1
                    )
                    .map((pageNumber, index, pages) => {
                        const previousPage = pages[index - 1];

                        const showEllipsis =
                            previousPage &&
                            pageNumber - previousPage > 1;

                        return (
                            <div key={pageNumber} className="flex items-center gap-1" >
                                {showEllipsis && (
                                    <span className="px-2 text-gray-400">
                                        ...
                                    </span>
                                )}

                                <Link
                                    href={buildUrl(params, pageNumber)}
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm ${pageNumber === page
                                        ? "bg-[#2E46BA] text-white"
                                        : "200 bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    {pageNumber}
                                </Link>
                            </div>
                        );
                    })}
            </div>

            {page < totalPages ? (
                <Link
                    href={buildUrl(params, page + 1)}
                    className="flex h-10 items-center gap-2 rounded-xl 200 bg-white px-4 text-sm hover:bg-gray-50"
                >
                    Next
                    <ChevronRight size={16} />
                </Link>
            ) : (
                <span className="flex h-10 items-center gap-2 rounded-xl 100 px-4 text-sm text-gray-300">
                    Next
                    <ChevronRight size={16} />
                </span>
            )}
        </div>
    );
}
