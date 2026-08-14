import Link from "next/link";
import Navbar from "./Navbar";
import Profile from "./Profile";
import { LucideBriefcaseBusiness, MailBadge } from "lucide-react";
import SearchBar from "./Search";

export default function Header() {
    return (
        <header className="bg-black text-white px-6 py-2">
            <div className="flex gap-10 rounded-full px-6 py-2">
                {/* logo */}
                <div className="w-1/3 flex gap-3 text-xl font-extrabold uppercase">
                    <span className="text-xl font-extrabold uppercase">
                        HireLane
                    </span>
                    <LucideBriefcaseBusiness />
                </div>
                <Navbar />
                <Profile />
            </div>
            <div className="flex gap-3 justify-center m-5 font-extrabold text-2xl">
                FIND YOUR DREAM JOB
                <MailBadge className="h-8 text-2xl font-extrabold"/>
            </div>
            <SearchBar />
        </header>
    )
}