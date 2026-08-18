type LandingCompany = {
    name: string;
    slug: string;
};

const markColors = [
    "bg-[#2E46BA] text-white",
    "bg-indigo-100 text-[#2E46BA]",
    "bg-[#f1eff7] text-[#4338a8]",
    "bg-[#1739ad] text-white",
    "bg-white text-[#2E46BA] ring-1 ring-[#dcd8ea]",
    "bg-indigo-50 text-[#1739ad]",
];

export default function LandingCompanies({
    companies,
}: {
    companies: LandingCompany[];
}) {
    if (companies.length === 0) {
        return null;
    }

    return (
        <section className="border-b border-[#eeeaf8] bg-[#f7f5ff]">
            <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
                <p className="text-center text-xs font-medium uppercase tracking-wide text-gray-400">
                    Teams hiring on Hirelane
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                    {companies.map((company, index) => (
                        <div
                            key={company.slug}
                            className="flex items-center gap-2.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-[#dcd8ea]/80"
                        >
                            <span
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${markColors[index % markColors.length]}`}
                            >
                                {company.name.charAt(0).toUpperCase()}
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                                {company.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
