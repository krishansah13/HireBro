import Link from "next/link"

export default function Navbar(): React.ReactNode {
    return (
        <nav className="hidden items-center gap-10 md:flex w-1/3 justify-between">
            <Link
                href="/jobs"
                className="text-sm font-medium hover:text-gray-950"
            >
                Find Jobs
            </Link>

            <Link
                href="/about"
                className="text-sm font-medium hover:text-gray-200 hover:underline"
            >
                About Us
            </Link>
        </nav>)
}