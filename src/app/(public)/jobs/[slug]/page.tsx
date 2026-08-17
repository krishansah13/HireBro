import { notFound } from "next/navigation";
import { getJobBySlug } from "@/lib/job-query";

export default async function JobDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const job = await getJobBySlug(slug);

    if (!job) {
        notFound();
    }

    const company =
        job.companyId && typeof job.companyId === "object"
            ? job.companyId
            : null;

    const jobType =
        job.type.charAt(0).toUpperCase() + job.type.slice(1);

    return (
        <main className="min-h-screen bg-white px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gray-50 shadow-sm">

                {/* Header */}
                <section className="relative overflow-hidden bg-white">
                    {/* Decorative background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3, 3, 40, 0.1),transparent_35%)]" />

                    <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:py-16">
                        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

                            <div className="max-w-3xl">
                                {/* Brand */}
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white">
                                        {company?.name?.charAt(0).toUpperCase() ?? "H"}
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {company?.name || "Company"}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            HIRELANE JOBS
                                        </p>
                                    </div>
                                </div>

                                <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                                    {job.title}
                                </h1>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                                        <svg
                                            className="h-4 w-4 text-gray-400"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                            <circle cx="12" cy="10" r="2.5" />
                                        </svg>
                                        {job.location}
                                    </span>

                                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-gray">
                                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                                        {jobType}
                                    </span>

                                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                        {job.remote ? "Remote" : "On-site"}
                                    </span>
                                </div>
                            </div>

                            {/* Apply button - desktop */}
                            <div className="hidden sm:block">
                                <button className="rounded-xl bg-gray-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 transition hover:bg-gray-800 hover:cursor-pointer">
                                    Apply for this job
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_320px] lg:py-14">

                    {/* Main content */}
                    <article className="rounded-2xl  bg-white p-6 shadow-sm sm:p-8">

                        <div>
                            <h2 className="text-xl font-bold text-gray-950">
                                About the role
                            </h2>

                            <div className="mt-5 whitespace-pre-line text-[15px] leading-7 text-gray-600">
                                {job.description}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-10 h-px bg-gray-100" />

                        <div>
                            <h2 className="text-xl font-bold text-gray-950">
                                Job details
                            </h2>

                            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Location
                                    </dt>
                                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                                        {job.location}
                                    </dd>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Employment type
                                    </dt>
                                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                                        {jobType}
                                    </dd>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Work arrangement
                                    </dt>
                                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                                        {job.remote ? "Remote" : "On-site"}
                                    </dd>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Company
                                    </dt>
                                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                                        {company?.name || "—"}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:sticky lg:top-6 lg:h-fit">
                        <div className="rounded-2xl  bg-white p-6 shadow-sm">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-950 text-lg font-bold text-white">
                                {company?.name?.charAt(0).toUpperCase() ?? "H"}
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-gray-950">
                                {company?.name || "Company"}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {job.location}
                            </p>
                            <div className="my-6 h-px bg-gray-100" />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Employment
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {jobType}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Location
                                    </span>
                                    <span className="max-w-[160px] text-right font-medium text-gray-900">
                                        {job.location}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Workplace
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {job.remote ? "Remote" : "On-site"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Salary Structure
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {job.salaryMin?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} - {job.salaryMax?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} per year
                                    </span>
                                </div>
                            </div>

                            <button className="mt-7 w-full rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 hover:cursor-pointer">
                                Apply for this job
                            </button>

                            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                                Apply through Hirelane and take the next step
                                in your career.
                            </p>
                        </div>
                    </aside>
                </section>

                {/* Mobile CTA */}
                <div className="sticky bottom-0 -t bg-white/95 p-4 backdrop-blur sm:hidden">
                    <button className="w-full rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-semibold text-white shadow-lg hover:cursor-pointer">
                        Apply for this job
                    </button>
                </div>
            </div>
        </main>
    );
}