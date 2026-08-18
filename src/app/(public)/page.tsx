import type { Metadata } from "next";
import LandingHero from "@/components/LandingHero";
import LandingCompanies from "@/components/LandingCompanies";
import LandingCategories from "@/components/LandingCategories";
import LandingFeatured from "@/components/LandingFeatured";
import LandingHowItWorks from "@/components/LandingHowItWorks";
import LandingEmployerCta from "@/components/LandingEmployerCta";
import { getLandingContent } from "@/lib/job-query";
import { Job } from "@/types/JobTypes";

export const metadata: Metadata = {
    title: "Hirelane | Find work that fits you",
    description:
        "Discover roles from companies hiring now, apply from one place, or post a job in minutes.",
};

export default async function Home() {
    const { jobs, stats, companies } = await getLandingContent();

    return (
        <main className="flex-1 bg-white">
            <LandingHero stats={stats} />
            <LandingCompanies companies={companies} />
            <LandingCategories />
            <LandingFeatured jobs={jobs as Job[]} total={stats.openRoles} />
            <LandingHowItWorks />
            <LandingEmployerCta />
        </main>
    );
}
