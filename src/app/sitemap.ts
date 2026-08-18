import type { MetadataRoute } from "next";
import { getPublishedJobSlugs } from "@/lib/job-query";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const jobs = await getPublishedJobSlugs();

  const jobEntries: MetadataRoute.Sitemap = jobs.map(
    (job: { slug: string; updatedAt?: string | Date }) => ({
      url: `${baseUrl}/jobs/${job.slug}`,
      lastModified: job.updatedAt ? new Date(job.updatedAt) : new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    }),
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...jobEntries,
  ];
}
