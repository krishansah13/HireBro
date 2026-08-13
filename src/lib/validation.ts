import {z} from "zod"

export const jobQuerySchema=z.object({
    q: z.string().optional(),
    location: z.string(),
    type: z.string().optional(),
    remote: z.enum(["true","false"]).optional(),
    sort: z.enum(["newest","oldest"]).optional(),
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1)
});


