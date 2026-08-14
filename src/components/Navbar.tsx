import Link from "next/link";

const links = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/about", label: "About" },
];

export default function Navbar() {
    return (
        <nav className="flex w-1/3 items-center justify-center gap-10">
            {links.map((link) => (
                <Link key={link.href} href={link.href} className="group relative font-bold tracking-[-0.01em] text-[#ffe8e8] transition-colors duration-200 hover:text-white">
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-[#859bb6] transition-all duration-300 group-hover:w-6" />
                </Link>
            ))}
        </nav>
    );
}