import { Job } from "@/types/JobTypes";
import { Briefcase, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

function formatDate(date?: string | Date) {
    if (!date) return "";

    const value = new Date(date);
    const now = new Date();

    const diff = now.getTime() - value.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
        return `${Math.max(minutes, 1)}m ago`;
    }

    if (hours < 24) {
        return `${hours}h ago`;
    }

    if (days < 7) {
        return `${days}d ago`;
    }

    return value.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function JobCard({ job }: { job: Job }) {
    return (
        <Link href={`/jobs/${job.slug}`} className="group block">
            <article
                className="
                    shadow-xs
                    flex
                    min-h-[116px]
                    items-center
                    gap-5
                    rounded-xl
                    bg-white
                    px-6
                    py-5
                    transform-gpu
                    transition-all
                    duration-200
                    ease-out
                    hover:-translate-y-1
                    hover:shadow-[0_10px_30px_rgba(76,61,130,0.10)]
                "
            >
                {/* Company logo */}
                <div
                    className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        bg-white
                        text-sm
                        font-semibold
                        text-gray-600
                        shadow-[0_1px_4px_rgba(0,0,0,0.04)]
                        ring-1
                        ring-gray-100
                    "
                >
                    {job.companyId.logo || job.companyId.logoURL ? (
                        <img
                            src={job.companyId.logo || job.companyId.logoURL}
                            alt={job.companyId.name}
                            className="h-full w-full object-contain p-2"
                        />
                    ) : (
                        job.companyId.name.charAt(0).toUpperCase()
                    )}
                </div>

                {/* Main content */}
                <div className="min-w-0 flex-1">
                    {/* Title */}
                    <div className="flex items-center gap-2">
                        <h2
                            className="
                                truncate
                                text-[15px]
                                font-semibold
                                tracking-[-0.01em]
                                text-[#17151c]
                            "
                        >
                            {job.title}
                        </h2>

                        {job.createdAt &&
                            new Date().getTime() -
                                new Date(job.createdAt).getTime() <
                                7 * 24 * 60 * 60 * 1000 && (
                                <span
                                    className="
                                        shrink-0
                                        rounded-full
                                        bg-[#e9e9ff]
                                        px-2
                                        py-0.5
                                        text-[10px]
                                        font-medium
                                        text-[#4f46b5]
                                    "
                                >
                                    New
                                </span>
                            )}
                    </div>

                    {/* Company + location + type */}
                    <div
                        className="
                            mt-1.5
                            flex
                            flex-wrap
                            items-center
                            gap-x-2
                            gap-y-1
                            text-[12px]
                            text-gray-500
                        "
                    >
                        <span className="font-medium text-gray-700">
                            {job.companyId.name}
                        </span>

                        <span className="text-gray-300">•</span>

                        <span className="flex items-center gap-1">
                            <MapPin size={11} />
                            {job.location}
                        </span>

                        {job.type && (
                            <>
                                <span className="text-gray-300">•</span>

                                <span className="flex items-center gap-1">
                                    <Briefcase size={11} />
                                    <span className="capitalize">
                                        {job.type}
                                    </span>
                                </span>
                            </>
                        )}

                        {(job.remote ?? job.isRemote) && (
                            <>
                                <span className="text-gray-300">•</span>
                                <span>Remote</span>
                            </>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {job.type && (
                            <span
                                className="
                                    rounded-md
                                    bg-[#f1eff7]
                                    px-2
                                    py-1
                                    text-[10px]
                                    font-medium
                                    text-gray-600
                                "
                            >
                                {job.type}
                            </span>
                        )}

                        {(job.remote ?? job.isRemote) && (
                            <span
                                className="
                                    rounded-md
                                    bg-[#f1eff7]
                                    px-2
                                    py-1
                                    text-[10px]
                                    font-medium
                                    text-gray-600
                                "
                            >
                                Remote
                            </span>
                        )}
                    </div>
                </div>

                {/* Right side */}
                <div className="flex shrink-0 items-center gap-5">
                    {job.createdAt && (
                        <span className="hidden text-[11px] text-gray-400 lg:block">
                            {formatDate(job.createdAt)}
                        </span>
                    )}

                    <span
                        className="
                            flex
                            h-9
                            items-center
                            gap-1.5
                            rounded-md
                            bg-white
                            px-4
                            text-[11px]
                            font-medium
                            text-[#4338a8]
                            transition-colors
                            group-hover:bg-[#faf9ff]
                        "
                    >
                        View Role

                        <ArrowUpRight
                            size={13}
                            className="
                                transition-transform
                                duration-200
                                group-hover:-translate-y-0.5
                                group-hover:translate-x-0.5
                            "
                        />
                    </span>
                </div>
            </article>
        </Link>
    );
}