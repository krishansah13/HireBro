import type { ComponentPropsWithoutRef } from "react";

type SkeletonProps = ComponentPropsWithoutRef<"div"> & {
    variant?: "default" | "subtle";
};

function Skeleton({
    className = "",
    variant = "default",
    ...props
}: SkeletonProps) {
    const variantClass =
        variant === "subtle" ? "bg-gray-100" : "bg-gray-200/80";

    return (
        <div
            className={`animate-pulse rounded-md ${variantClass} ${className}`}
            aria-hidden
            {...props}
        />
    );
}

function JobCardSkeleton() {
    return (
        <div className="flex min-h-[116px] items-center gap-5 rounded-xl bg-white px-6 py-5 shadow-xs">
            <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />

            <div className="min-w-0 flex-1 space-y-3">
                <Skeleton className="h-4 w-2/5 max-w-xs" />
                <Skeleton className="h-3 w-3/5 max-w-sm" />
                <div className="flex flex-wrap gap-1.5">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-14 rounded-md" />
                </div>
            </div>

            <div className="hidden shrink-0 items-center gap-5 lg:flex">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-9 w-24 rounded-md" />
            </div>
        </div>
    );
}

function FilterSidebarSkeleton() {
    return (
        <aside className="hidden h-fit space-y-7 rounded-2xl p-5 lg:block">
            <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-10" />
            </div>

            <Skeleton className="h-px w-full" variant="subtle" />

            <div className="space-y-3">
                <Skeleton className="h-4 w-16" />
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                ))}
            </div>

            <div className="space-y-3">
                <Skeleton className="h-4 w-20" />
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                ))}
            </div>

            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-xl" />
        </aside>
    );
}

export default function Loading() {
    return (
        <main aria-busy="true" aria-label="Loading content">
            <span className="sr-only">Loading HireLane</span>

            <div className="h-100 bg-linear-100 from-white via-white to-indigo-400 p-7">
                <section className="w-full text-center">
                    <Skeleton className="mx-auto h-4 w-28" />
                    <Skeleton className="mx-auto mt-4 h-12 w-full max-w-md rounded-lg" />
                    <Skeleton className="mx-auto mt-4 h-4 w-full max-w-xl" />
                </section>

                <section className="mx-auto mt-10 max-w-5xl">
                    <Skeleton
                        className="h-[70px] w-full rounded-2xl"
                        variant="subtle"
                    />
                </section>
            </div>

            <section className="min-h-[500px] bg-white p-7">
                <div className="mb-6 flex items-end justify-between lg:hidden">
                    <Skeleton className="h-4 w-16" />
                </div>

                <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
                    <FilterSidebarSkeleton />

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-40" />
                            <Skeleton className="h-4 w-56" />
                        </div>

                        <div className="flex flex-col gap-5">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <JobCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
