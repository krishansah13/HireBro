import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div>
            <header>
                <h1>Hirelane Dashboard</h1>
                <p>Welcome, {session.user.name}</p>
            </header>

            <main>{children}</main>
        </div>
    );
}