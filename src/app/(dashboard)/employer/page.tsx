import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EmployerPage() {
    const session = await auth();

    if (!session || session.user.role !== "employer") {
        redirect("/login");
    }

    return (
        <div>
            <h1>Employer Dashboard</h1>
            <p>Welcome {session.user.name}</p>
        </div>
    );
}