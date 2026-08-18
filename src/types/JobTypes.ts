export type JobSearchProps = {
    q?: string;
    location?: string;
    type?: string;
    remote?: string;
    sort?: string;
    page?: number;
};

export type Job = {
    _id: string | { toString(): string };
    title: string;
    slug: string;
    location: string;
    description: string;
    type?: string;
    remote?: boolean;
    isRemote?: boolean;
    createdAt?: string | Date;

    companyId: {
        name: string;
        logo?: string;
        logoURL?: string;
    };
};
