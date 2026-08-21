import { getJobById } from "@/lib/job-query";
import { objectIdSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export const dynamic="force-dynamic";

export async function GET(_request:Request, {params} : {params : Promise<{id : string}>}){
    const {id} = await params;
    const idParsed = objectIdSchema.safeParse(id);

    if(!idParsed.success) {
        return NextResponse.json({error : "Invalid id"}, {status: 400});
    }
    const job = await getJobById(idParsed.data);
    if(!job) {
        return NextResponse.json({error : "Job Not Found"}, {status: 404});
    }
    return NextResponse.json(job,{
        headers : {
            "Cache-Control" : "no-store"
        }
    })
}