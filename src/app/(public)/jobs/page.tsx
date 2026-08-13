import { getJobs } from "@/lib/job-query";
import { jobQuerySchema } from "@/lib/validation";

type JobSearchProps = {
    q?:string,
    location?:string,
    type?:string,
    remote?:string,
    sort?:string,
    page?:number
}


export default async function JobSearch({searchParams} : {searchParams : JobSearchProps}) {
    const params = await searchParams;
    const parsed = jobQuerySchema.parse(params); 
    
    const result = await getJobs({
        q : parsed.q,
        location: parsed.location,
        type : parsed.type,
        remote : 
            (parsed.remote === "true") ? true : (parsed.remote === "false" ? false : undefined),
        sort : parsed.sort ?? "newest",
        page : parsed.page,
        limit: 10
    })
    return <main>
        <h1>
            Jobs
        </h1>
        <p>
            Found {result.total} jobs
        </p>
        {result.jobs.map((job)=>(
                <article key={job._id.toString()}>
                    <h2>{job.title}</h2>
                    <p>{job.location}</p>
                    <p>{job.description}</p>
                    <hr/>
                </article>
            ))
        }
       
    </main>
} 