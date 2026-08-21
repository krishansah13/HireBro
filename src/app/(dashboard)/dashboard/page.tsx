import Link from "next/link";
import { requireSeeker } from "@/lib/session";
import { getMyApplications } from "@/lib/application-query";
import StageBadge from "@/components/StageBadge";
import { formatJobType } from "@/lib/utils/format";

function formatDate(value?: string | Date) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function DashboardPage() {
  const user = await requireSeeker();
  const applications = await getMyApplications(user.id);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-medium tracking-wide text-gray-400">
          SEEKER
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
          Your applications
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
          Track every role you have applied to and see where it sits in the
          pipeline.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No applications yet
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Browse open roles and submit your first application.
          </p>
          <Link
            href="/jobs"
            className="mt-5 inline-flex rounded-xl bg-[#2e46ba] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Find jobs
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {applications.map((application) => {
            const job =
              application.jobId && typeof application.jobId === "object"
                ? application.jobId
                : null;
            const company =
              job?.companyId && typeof job.companyId === "object"
                ? job.companyId
                : null;

            return (
              <li key={String(application._id)}>
                <Link
                  href={`/dashboard/applications/${application._id}`}
                  className="block rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-base font-semibold text-gray-950">
                        {job?.title ?? "Role unavailable"}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {company?.name ?? "Company"}
                        {job?.location ? ` · ${job.location}` : ""}
                        {job?.type ? ` · ${formatJobType(job.type)}` : ""}
                      </p>
                    </div>
                    <StageBadge stage={application.stage} />
                  </div>
                  <p className="mt-3 text-xs text-gray-400">
                    Applied {formatDate(application.appliedAt)}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}