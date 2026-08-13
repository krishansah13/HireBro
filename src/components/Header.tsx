import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";
import Search from "./Search";
import Navbar from "./Navbar";

export default function Header() {
    return (
            <header className="sticky top-0 z-50 w-full border-b bg-black backdrop-blur text-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex flex-1 items-center">
                        <Link href="/" className="text-xl font-bold tracking-tight text-white">
                            Hire<span className="text-zinc-200">Lane</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <Navbar/>
                    <Profile />
                </div>
            <h1>
                Find Your Dream Job Here
            </h1>
            <Search />
        </header>
    )
}
