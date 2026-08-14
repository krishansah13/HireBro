"use client"
import { Search } from "lucide-react"

export default function SearchBar() {
    return (
        <div className="flex justify-center z-10">
            <div className="m-2 w-3/4 bg-white rounded-full px-6 py-2 flex justify-between">
                <Search className="m-2  text-gray-500" />
                <input type="text" placeholder="Job Title or keyword" className="px-6 py-2 focus:border-0 w-[80%] text-black placeholder:text-gray-400 focus:ring-0 focus:outline-none" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        console.log("Search", e.currentTarget.value)
                    }
                }} />
                <button type="submit" className="bg-linear-to-br from-[#000000] via-[#0e0e6e] to-[#000000] px-6 py-2 rounded-full font-bold">Search</button>
            </div>
        </div>
    )
}