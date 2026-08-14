"use client"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search.trim()) return;
        const params = new URLSearchParams();
        params.set("q", search.trim());
        router.push(`/jobs?${params.toString()}`);
        setSearch("");
    };
    return (
        <div className="flex justify-center">
            <form className="m-2 w-3/4 bg-white rounded-full px-6 py-2 flex justify-between" onSubmit={handleSearch}>
                <Search className="m-2  text-gray-500" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Job Title or keyword" className="px-6 py-2 focus:border-0 w-[80%] text-black placeholder:text-gray-400 focus:ring-0 focus:outline-none" />
                <button type="submit" className="bg-linear-to-br from-[#000000] via-[#0e0e6e] to-[#000000] px-6 py-2 rounded-full font-bold">Search</button>
            </form>
        </div>
    )
}