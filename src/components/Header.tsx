import Link from "next/link";
import Navbar from "./Navbar";
import Profile from "./Profile";
import { LucideBriefcaseBusiness, MailBadge } from "lucide-react";
import SearchBar from "./Search";
import Image from "next/image";

export default function Header() {
    return (
        <header className="relative overflow-hidden bg-linear-to-br from-[#000000] via-[#04043d] to-[#000000] text-white px-6 py-4">

            {/* Ambient background glow */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
            <div className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            {/* Subtle center glow */}
            <div className="absolute inset-0 bg-[radial-linear(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_45%)] pointer-events-none" />

            {/* Main content */}
            <div className="relative z-10">
                {/* Navbar */}
                <div className="flex items-center gap-10 rounded-full border border-white/10 bg-white/3 backdrop-blur-xl px-6 py-3 shadow-lg shadow-black/20">

                    {/* Logo */}
                    <div className="w-1/3 flex items-center gap-3 text-xl font-extrabold uppercase tracking-tight">
                        <span className="bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
                            HireLane
                        </span>

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10">
                            <LucideBriefcaseBusiness className="h-4 w-4 text-white/80" />
                        </div>
                    </div>

                    <Navbar />

                    <Profile />
                </div>

                {/* Hero heading */}
                <div className="relative mt-14 mb-7 text-center">

                    <div className="flex items-center justify-center gap-3">
                        <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                            <span className="text-white">
                                FIND YOUR
                            </span>{" "}
                            <span className="bg-linear-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                DREAM JOB
                            </span>
                        </h1>

                        <MailBadge className="h-8 w-8 text-blue-400" />
                    </div>

                    <p className="mx-auto mt-3 max-w-xl text-sm text-white/40">
                        Discover opportunities that match your skills, ambitions, and
                        career goals.
                    </p>
                </div>

                {/* Search */}
                <div className="mx-auto max-w-4xl pb-6">
                    <div className="rounded-2xlp-2 shadow-2xl shadow-black/30 backdrop-blur-xl">
                        <SearchBar />
                    </div>
                </div>

            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        </header>
    );
}