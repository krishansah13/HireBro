"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated" && !!session?.user;
    const dashboardHref =
        session?.user.role === "employer" ? "/employer" : "/dashboard";

    return (
        <nav className="flex items-center justify-between bg-white/80 px-8 py-4 shadow-2xl">
            <Link href="/" className="flex items-center gap-3">
                <Image
                    src="/images/hirelane_brand_mark.png"
                    alt="HireLane"
                    width={30}
                    height={30}
                />
                <h1 className="text-xl font-semibold tracking-tight text-[#2E46BA]">
                    Hirelane
                </h1>
            </Link>

            <div className="hidden items-center gap-6 sm:flex">
                <Link
                    href="/jobs"
                    className="text-sm font-medium text-gray-950 transition hover:text-[#2E46BA]"
                >
                    Find Jobs
                </Link>
                <Link
                    href="/jobs"
                    className="text-sm font-medium text-gray-950 transition hover:text-[#2E46BA]"
                >
                    Companies
                </Link>
                <Link
                    href={isAuthenticated && session.user.role === "employer" ? "/employer" : "/login"}
                    className="text-sm font-medium text-gray-950 transition hover:text-[#2E46BA]"
                >
                    Post a Job
                </Link>
            </div>

            <div className="flex items-center gap-3">
                {status === "loading" ? (
                    <div className="h-10 w-24 animate-pulse rounded-md bg-gray-100" />
                ) : isAuthenticated ? (
                    <>
                        <Link
                            href={dashboardHref}
                            className="hidden max-w-[140px] truncate text-sm font-medium text-gray-700 sm:block"
                        >
                            {session.user.name}
                        </Link>
                        <Link
                            href={dashboardHref}
                            className="rounded-md border border-[#2E46BA] px-5 py-2 text-sm font-medium text-[#2E46BA] transition hover:bg-[#2E46BA]/5"
                        >
                            Dashboard
                        </Link>
                        <button
                            type="button"
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="rounded-md bg-[#2E46BA] px-6 py-2 text-sm font-medium text-white"
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <Link
                        href="/login"
                        className="rounded-md border border-[#2E46BA] bg-[#2E46BA] px-6 py-2 text-sm font-medium text-white"
                    >
                        Sign in
                    </Link>
                )}
            </div>
        </nav>
    );
}
