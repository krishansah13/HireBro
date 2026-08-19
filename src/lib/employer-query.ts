import Job from "./models/Job";
import { connectToDatabase } from "./utils/db";
import { serialize } from "./utils/serialize";
import { objectIdSchema } from "./validation";

export async function getCompanyJobs(companyId: string) {
    await connectToDatabase();
    const jobs = await Job.find({ companyId }).sort({ updatedAt: -1 }).lean();
    return serialize(jobs);
}

export async function getCompanyJobById(companyId: string, jobId: string) {
    const idParsed = objectIdSchema.safeParse(jobId);

    if (!idParsed.success) return null;
    
    await connectToDatabase();
    
    const job = await Job.findOne({ _id: idParsed.data, companyId }).lean();
    return serialize(job);
}