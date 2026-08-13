import Job from "./models/Job";
import { connectToDatabase } from "./utils/db";

export type JobQuery = {
  q?: string;
  location: string;
  type?: string;
  remote?: boolean;
  sort?: "newest" | "oldest";
  page?: number;
  limit?: number;
};

export async function getJobs(query: JobQuery) {
  await connectToDatabase();

  const { q, location, type, remote, sort, page, limit } = query;

  const filter: Record<string, unknown> = {
    status: "published",
  };

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
    ];
  }

  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  if (type) {
    filter.type = type;
  }

  if (remote !== undefined) {
    filter.isRemote = remote;
  }
  const sortOption: Record<string, 1 | -1> = sort === "oldest" ? { publishedAt: 1 } : { publishedAt: -1 };
  const currentPage = page ?? 1;
  const pageLimit = limit ?? 10;
  const skip = (currentPage - 1) * pageLimit;

  const [jobs, total] = await Promise.all([
    Job.find(filter).sort(sortOption).skip(skip).limit(pageLimit).lean(),
    Job.countDocuments(filter),
  ]);

  return {
    jobs,
    total,
    page: currentPage,
    limit: pageLimit,
    totalPages: Math.ceil(total / pageLimit),
  };
}
