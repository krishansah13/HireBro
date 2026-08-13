type JobSearchParams = {
    searchParams: Promise<{
        q?: string,
        location: string,
        type?: string,
        remote?: string,
        sort?: string,
        page?: string
    }>;
}

export default async function JobsPage({ searchParams }: { searchParams: JobSearchParams }) {
    const params = await searchParams;
    console.log(params);
    return (
        <main>
            <h1>
                Jobs
            </h1>
            <pre>
                {JSON.stringify(params, null, 2)}
            </pre>
        </main>
    )
}