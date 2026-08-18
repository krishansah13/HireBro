import Link from "next/link";
import { ArrowLeft, Briefcase, MapPinOff } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen m-6 rounded-2xl bg-gray-50 shadow-2xs">
            <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col items-center justify-center px-6 py-10 lg:px-8">
                <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
                        <Briefcase size={24} />
                    </div>

                    <p className="mt-8 text-sm font-medium tracking-wide text-gray-400">
                        ERROR 404
                    </p>

                    <h1 className="mt-3 text-6xl font-semibold tracking-tight text-gray-950">
                        404
                    </h1>

                    <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                        <MapPinOff size={22} className="text-gray-500" />
                    </div>

                    <h2 className="mt-5 text-xl font-semibold tracking-tight text-gray-900">
                        Page not found
                    </h2>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                        The page you&apos;re looking for doesn&apos;t exist or may
                        have been moved. Head back and keep exploring opportunities.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/jobs"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            <Briefcase size={16} />
                            Browse jobs
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <ArrowLeft size={16} />
                            Back to home
                        </Link>
                    </div>
                </div>

                <p className="mt-8 text-sm text-gray-400">
                    Hire<span className="text-gray-500">Lane</span>
                </p>
            </div>
        </main>
    );
}
