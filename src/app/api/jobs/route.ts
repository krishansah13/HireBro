import { getJobs, toJobQuery } from "@/lib/job-query";
import { jobQuerySchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const parsed=jobQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
    if(!parsed.success) {
        return NextResponse.json(
            {error : parsed.error.issues[0]?.message??"Invalid query"},
            {status:400},
        )
    }
    const result = await getJobs(toJobQuery(parsed.data,10));
    return NextResponse.json(result, {
        headers : {
            "Cache-Control" : "no-store" 
        }
    })
}