import Image from "next/image";
export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white/80 shadow-2xl">
            <div className="flex items-center gap-3">
                    <Image src="/images/hirelane_brand_mark.png" alt="HireLane" width={30} height={30} />
                <h1 className="text-xl font-semibold tracking-tight text-[#2E46BA]">
                    Hirelane
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-gray-950  active:underline">Find Jobs</div>
                <div className="text-sm font-medium text-gray-950  active:underline">Companies</div>
                <div className="text-sm font-medium text-gray-950  active:underline">Post a Job</div>
            </div>

            <div className="flex items-center gap-3">
                <button className="bg-[#2E46BA] text-white px-6 py-2 rounded-md border border-[#2E46BA]">Signin</button>
            </div>
        </nav>
    );
}
