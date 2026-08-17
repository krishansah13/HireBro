import { Job } from "@/types/JobTypes";
import { Briefcase } from "lucide-react";
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


export default function JobCard({
    job,
}: {
    job: Job;
}) {
    return (
        <Link href={`/jobs/${job.slug}`} className="group block">
            <article className="flex min-h-80 flex-col rounded-2xl bg-linear-130 from-zinc-900  to-zinc-700 to p-6 transition duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg text-white">
                {/* Company */}
                <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gray-100 text-lg font-semibold text-gray-700">
                        {job.companyId.logo ? (
                            <img
                                src={job.companyId.logo}
                                alt={job.companyId.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            job.companyId.name
                                .charAt(0)
                                .toUpperCase()
                        )}
                    </div>

                    {job.createdAt && (
                        <span className="text-xs text-gray-300">
                            {formatDate(job.createdAt)}
                        </span>
                    )}
                </div>

                {/* Main content */}
                <div className="mt-6 flex-1">
                    <h2 className="line-clamp-2 text-xl font-semibold tracking-tight text-gray-100 transition group-hover:text-gray-300">
                        {job.title}
                    </h2>

                    <p className="mt-2 text-sm font-medium text-gray-300">
                        {job.companyId.name}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                        <span className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600">
                            {job.location}
                        </span>

                        {job.type && (
                            <span className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs capitalize text-gray-600">
                                <Briefcase size={13} />
                                {job.type}
                            </span>
                        )}

                        {job.remote && (
                            <span className="rounded-lg bg-green-50 px-2.5 py-1.5 text-xs font-medium text-green-700">
                                Remote
                            </span>
                        )}
                    </div>

                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-300">
                        {job.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xs text-gray-200">
                        View details
                    </span>

                    <span className="text-sm font-medium transition group-hover:translate-x-1">
                        →
                    </span>
                </div>
            </article>
        </Link>
    );
}