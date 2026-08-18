import { unstable_cache } from "next/cache";
import Job from "./models/Job";
import Company from "./models/Company";
import { connectToDatabase } from "./utils/db";
import { serialize } from "./utils/serialize";

export type JobQuery = {
  q?: string;
  location?: string;
  type?: "part-time" | "full-time" | "internship" | "contract";
  remote?: boolean;
  sort?: "newest" | "oldest";
  page?: number;
  limit?: number;
};

const COMPANY_SELECT = "name logoURL slug website about";

async function queryJobs(query: JobQuery) {
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
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { companyId: { $in: companyIds } },
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
      .populate("companyId", COMPANY_SELECT)
      .sort(sortOption)
      .skip(skip)
      .limit(pageLimit)
      .lean(),
    Job.countDocuments(filter),
  ]);

  return serialize({
    jobs,
    total,
    page: currentPage,
    limit: pageLimit,
    totalPages: Math.ceil(total / pageLimit),
  });
}

export async function getJobs(query: JobQuery) {
  const cacheKey = JSON.stringify({
    q: query.q ?? "",
    location: query.location ?? "",
    type: query.type ?? "",
    remote: query.remote ?? "any",
    sort: query.sort ?? "newest",
    page: query.page ?? 1,
    limit: query.limit ?? 10,
  });

  return unstable_cache(async () => queryJobs(query), ["getJobs", cacheKey], {
    tags: ["jobs"],
  })();
}

async function queryJobBySlug(slug: string) {
  await connectToDatabase();

  const job = await Job.findOne({
    slug,
    status: "published",
  })
    .populate("companyId", COMPANY_SELECT)
    .lean();

  return serialize(job);
}

export async function getJobBySlug(slug: string) {
  return unstable_cache(async () => queryJobBySlug(slug), ["job-slug", slug], {
    tags: ["jobs", `job:${slug}`],
  })();
}

async function queryJobById(id: string) {
  await connectToDatabase();

  const job = await Job.findOne({
    _id: id,
    status: "published",
  })
    .populate("companyId", COMPANY_SELECT)
    .lean();

  return serialize(job);
}

export async function getJobById(id: string) {
  return unstable_cache(async () => queryJobById(id), ["job-id", id], {
    tags: ["jobs"],
  })();
}

async function queryLandingContent() {
  const [featured, companyCount, companies, remoteRoles] = await Promise.all([
    queryJobs({ sort: "newest", limit: 6 }),
    (async () => {
      await connectToDatabase();
      return Company.countDocuments();
    })(),
    (async () => {
      await connectToDatabase();
      return serialize(
        await Company.find({}).select("name logoURL slug").limit(6).lean(),
      );
    })(),
    (async () => {
      await connectToDatabase();
      return Job.countDocuments({ status: "published", isRemote: true });
    })(),
  ]);

  return {
    jobs: featured.jobs,
    stats: {
      openRoles: featured.total,
      companies: companyCount,
      remoteRoles,
    },
    companies,
  };
}

export async function getLandingContent() {
  return unstable_cache(queryLandingContent, ["landing-content"], {
    tags: ["jobs"],
  })();
}

export async function getPublishedJobSlugs() {
  return unstable_cache(
    async () => {
      await connectToDatabase();
      const jobs = await Job.find({ status: "published" }).select("slug updatedAt").lean();
      return serialize(jobs);
    },
    ["published-job-slugs"],
    { tags: ["jobs"] },
  )();
}
