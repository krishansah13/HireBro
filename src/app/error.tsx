"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, Briefcase, RefreshCw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="min-h-screen m-6 rounded-2xl bg-gray-50 shadow-2xs">
            <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col items-center justify-center px-6 py-10 lg:px-8">
                <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
                        <Briefcase size={24} />
                    </div>

                    <p className="mt-8 text-sm font-medium tracking-wide text-gray-400">
                        SOMETHING WENT WRONG
                    </p>

                    <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                        <AlertTriangle size={22} className="text-red-500" />
                    </div>

                    <h1 className="mt-5 text-2xl font-semibold tracking-tight text-gray-950">
                        We hit a snag
                    </h1>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                        An unexpected error occurred while loading this page.
                        Try again, or head back to keep browsing opportunities.
                    </p>

                    {error.digest && (
                        <p className="mx-auto mt-4 max-w-sm truncate rounded-lg bg-gray-50 px-3 py-2 font-mono text-xs text-gray-400">
                            Reference: {error.digest}
                        </p>
                    )}

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            <RefreshCw size={16} />
                            Try again
                        </button>

                        <Link
                            href="/jobs"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <Briefcase size={16} />
                            Browse jobs
                        </Link>
                    </div>

                    <Link
                        href="/"
                        className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-800"
                    >
                        <ArrowLeft size={14} />
                        Back to home
                    </Link>
                </div>

                <p className="mt-8 text-sm text-gray-400">
                    Hire<span className="text-gray-500">Lane</span>
                </p>
            </div>
        </main>
    );
}
