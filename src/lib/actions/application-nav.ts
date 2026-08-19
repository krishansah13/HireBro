"use server"

import { auth } from "@/auth"
import { getMyApplicationById } from "../application-query";

export async function getApplicationNavTitle(applicationId: string): Promise<string | null> {
    const session = await auth();
    if (!session?.user || session.user.role !== "seeker") return null;
    const application = await getMyApplicationById(session.user.id, applicationId);
    if (!application) return null;
    const job = application.jobId && typeof application.jobId === "object" ? application.jobId : null;
    return typeof job?.title === "string" ? job.title : null;
}