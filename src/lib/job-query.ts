import Job from "./models/Job";
import Company from "./models/Company";
import { connectToDatabase } from "./utils/db";

export type JobQuery = {
  q?: string;
  location?: string;
  type?: "part-time" | "full-time" | "internship" | "contract";
  remote?: boolean;
  sort?: "newest" | "oldest";
  page?: number;
  limit?: number;
};

export async function getJobs(query: JobQuery) {
  await connectToDatabase();

  const { q, location, type, remote, sort = "newest", page, limit } = query;

  const filter: Record<string, unknown> = {
    status: "published",
  };
  if (q) {
    const matchingCompanies = await Company.find({
      name: {
        $regex: q,
        $options: "i",
      },
    }).select("_id");

    const companyIds = matchingCompanies.map((company) => company._id);

    filter.$or = [
      {
        title: {
          $regex: q,
          $options: "i",
        },
      },
      {
        description: {
          $regex: q,
          $options: "i",
        },
      },
      {
        location: {
          $regex: q,
          $options: "i",
        },
      },
      {
        companyId: {
          $in: companyIds,
        },
      },
    ];
  }
  if (location) {
    filter.location = {
      $regex: location,
      $options: "i",
    };
  }

  if (type) {
    filter.type = type;
  }

  if (remote !== undefined) {
    filter.isRemote = remote;
  }
  const sortOption: Record<string, 1 | -1> =
    sort === "oldest" ? { publishedAt: 1 } : { publishedAt: -1 };
  const currentPage = page ?? 1;
  const pageLimit = limit ?? 10;
  const skip = (currentPage - 1) * pageLimit;

  const [jobs, total] = await Promise.all([
    Job.find(filter)
      .populate("companyId", "name logoURL slug")
      .sort(sortOption)
      .skip(skip)
      .limit(pageLimit)
      .lean(),
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

export async function getJobBySlug(slug: string) {
  await connectToDatabase();

  const job = await Job.findOne({
    slug,
    status: "published",
  })
    .populate("companyId", "name logoURL slug")
    .lean();

  return job;
}