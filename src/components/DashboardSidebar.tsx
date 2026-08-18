"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FileText, LayoutDashboard, PlusCircle, Users } from "lucide-react";
import { signOut } from "next-auth/react";

type DashboardSidebarProps = {
  role: "seeker" | "employer";
  name: string;
};

const seekerLinks = [
  { href: "/dashboard", label: "Applications", icon: LayoutDashboard },
];

const employerLinks = [
  { href: "/employer", label: "Posted roles", icon: Briefcase },
  { href: "/employer/jobs/new", label: "Post a job", icon: PlusCircle },
];

export default function DashboardSidebar({ role, name }: DashboardSidebarProps) {
  const pathname = usePathname();
  const links = role === "employer" ? employerLinks : seekerLinks;

  return (
    <aside className="flex w-full flex-col border-b border-gray-200 bg-white lg:w-60 lg:border-b-0 lg:border-r">
      <div className="px-5 py-5">
        <p className="text-xs font-medium tracking-wide text-gray-400">
          {role === "employer" ? "EMPLOYER" : "SEEKER"}
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-gray-950">{name}</p>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-6">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/dashboard" &&
              link.href !== "/employer" &&
              pathname.startsWith(link.href));
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-[#eef0ff] text-[#2E46BA]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
              }`}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
        {role === "seeker" && pathname.startsWith("/dashboard/applications/") && (
          <span className="inline-flex items-center gap-2 rounded-lg bg-[#eef0ff] px-3 py-2 text-sm font-medium text-[#2E46BA]">
            <FileText size={16} />
            Application
          </span>
        )}
        {role === "employer" && pathname.includes("/applicants") && (
          <span className="inline-flex items-center gap-2 rounded-lg bg-[#eef0ff] px-3 py-2 text-sm font-medium text-[#2E46BA]">
            <Users size={16} />
            Applicants
          </span>
        )}
      </nav>

      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-auto hidden rounded-none border-t border-gray-100 px-5 py-3 text-left text-sm text-gray-500 hover:bg-gray-50 lg:block"
      >
        Sign out
      </button>
    </aside>
  );
}
