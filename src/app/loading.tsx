import { Briefcase } from "lucide-react";

function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={`animate-pulse rounded-xl bg-gray-200/80 ${className ?? ""}`}
            aria-hidden
        />
    );
}

function JobCardSkeleton() {
    return (
        <div className="flex min-h-80 flex-col rounded-2xl bg-linear-130 from-zinc-900 to-zinc-700 p-6">
            <div className="flex items-start justify-between">
                <Skeleton className="h-12 w-12 rounded-xl bg-white/10" />
                <Skeleton className="h-3 w-14 rounded-lg bg-white/10" />
            </div>

            <div className="mt-6 flex-1 space-y-3">
                <Skeleton className="h-6 w-4/5 rounded-lg bg-white/10" />
                <Skeleton className="h-4 w-2/5 rounded-lg bg-white/10" />

                <div className="mt-5 flex flex-wrap gap-2">
                    <Skeleton className="h-7 w-20 rounded-lg bg-white/10" />
                    <Skeleton className="h-7 w-24 rounded-lg bg-white/10" />
                    <Skeleton className="h-7 w-16 rounded-lg bg-white/10" />
                </div>

                <div className="mt-5 space-y-2">
                    <Skeleton className="h-3 w-full rounded bg-white/10" />
                    <Skeleton className="h-3 w-full rounded bg-white/10" />
                    <Skeleton className="h-3 w-3/4 rounded bg-white/10" />
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <Skeleton className="h-3 w-20 rounded bg-white/10" />
                <Skeleton className="h-4 w-4 rounded bg-white/10" />
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <main
            className="min-h-screen m-6 rounded-2xl bg-gray-50 shadow-2xs"
            aria-busy="true"
            aria-label="Loading content"
        >
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                {/* Brand indicator */}
                <div className="mb-10 flex flex-col items-center">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
                        <Briefcase size={24} className="relative z-10" />
                        <span className="absolute inset-0 animate-ping rounded-2xl bg-black/30" />
                    </div>
                    <p className="mt-4 text-sm font-medium tracking-wide text-gray-400">
                        Loading HireLane
                    </p>
                </div>

                {/* Hero skeleton */}
                <section className="mx-auto max-w-3xl text-center">
                    <Skeleton className="mx-auto h-4 w-28" />
                    <Skeleton className="mx-auto mt-4 h-10 w-full max-w-md" />
                    <Skeleton className="mx-auto mt-4 h-4 w-full max-w-sm" />
                    <Skeleton className="mx-auto mt-2 h-4 w-4/5 max-w-xs" />
                </section>

                {/* Search skeleton */}
                <section className="mx-auto mt-10 max-w-5xl">
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Skeleton className="h-11 flex-1" />
                            <Skeleton className="h-11 flex-1" />
                            <Skeleton className="h-11 w-full sm:w-28" />
                        </div>
                    </div>
                </section>

                {/* Jobs grid skeleton */}
                <section className="mt-12">
                    <div className="mb-6 flex items-end justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
                        <div className="hidden space-y-4 lg:block">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="mt-4 h-10 w-full" />
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <JobCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
