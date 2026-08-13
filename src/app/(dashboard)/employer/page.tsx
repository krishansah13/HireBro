import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EmployerPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "employer") {
        redirect("/");
    }

    return (
        <div>
            <h1>Employer Dashboard</h1>
            <p>Welcome {session.user.name}</p>
        </div>
    );
}