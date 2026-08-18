import { auth } from "@/auth";

export default async function EmployerPage() {
  const session = await auth();

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-medium tracking-wide text-gray-400">EMPLOYER</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
        Posted roles
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
        Welcome{session?.user?.name ? `, ${session.user.name}` : ""}. Job
        listing, posting, and the applicant pipeline land in later tasks. This
        shell is ready.
      </p>
    </div>
  );
}
