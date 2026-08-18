export default function FooterSection() {
    return (
        <footer className="bg-[#f7f5ff]">
            <div className="mx-auto max-w-7xl px-8 py-16">
                {/* Top links */}
                <div className="flex gap-32">
                    {/* Candidates */}
                    <div>
                        <h3 className="text-sm font-medium text-[#17151c]">
                            For Candidates
                        </h3>

                        <div className="mt-3 flex flex-col gap-2">
                            <a
                                href="/jobs"
                                className="text-xs text-[#3f3b4a] transition-colors hover:text-[#4f46e5]"
                            >
                                Browse Jobs
                            </a>

                            <a
                                href="/career-advice"
                                className="text-xs text-[#3f3b4a] transition-colors hover:text-[#4f46e5]"
                            >
                                Career Advice
                            </a>
                        </div>
                    </div>

                    {/* Employers */}
                    <div>
                        <h3 className="text-sm font-medium text-[#17151c]">
                            For Employers
                        </h3>

                        <div className="mt-3 flex flex-col gap-2">
                            <a
                                href="/pricing"
                                className="text-xs text-[#3f3b4a] transition-colors hover:text-[#4f46e5]"
                            >
                                Pricing
                            </a>

                            <a
                                href="/hiring-solutions"
                                className="text-xs text-[#3f3b4a] transition-colors hover:text-[#4f46e5]"
                            >
                                Hiring Solutions
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-[#dcd8ea]" />

                {/* Bottom */}
                <div className="flex items-center justify-between">
                    <p className="text-xs text-[#3f3b4a]">
                        &copy; {new Date().getFullYear()} Hirelane. Modern Recruitment Excellence.
                    </p>

                    <div className="flex items-center gap-7">
                        <a
                            href="/privacy"
                            className="text-xs text-[#3f3b4a] transition-colors hover:text-[#4f46e5]"
                        >
                            Privacy
                        </a>

                        <a
                            href="/terms"
                            className="text-xs text-[#3f3b4a] transition-colors hover:text-[#4f46e5]"
                        >
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}