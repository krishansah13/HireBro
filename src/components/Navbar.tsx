import { Briefcase, User, Bell } from "lucide-react";
import SearchBar from "./SearchForm";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-black text-white">
                    <Briefcase size={20} />
                </div>

                <h1 className="text-xl font-semibold tracking-tight">
                    Hire<span className="text-gray-400">Lane</span>
                </h1>
            </div>


            {/* Actions */}
            <div className="flex items-center gap-3">
                <button className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition hover:text-black">
                    <Bell size={19} />
                </button>

                <div className="h-7 w-px bg-gray-200" />

                <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition hover:text-black">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 text-black">
                        <User size={18} />
                    </div>

                    <div className="hidden md:block text-left">
                        <p className="text-sm font-medium">Profile</p>
                        <p className="text-xs text-gray-400">My account</p>
                    </div>
                </button>
            </div>
        </nav>
    );
}
