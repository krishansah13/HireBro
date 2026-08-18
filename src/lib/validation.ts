import { z } from "zod";

export const jobQuerySchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  type: z.enum(["part-time", "contract", "full-time", "internship"]).optional(),
  remote: z.enum(["true", "false", "any"]).optional(),
  sort: z.enum(["newest", "oldest"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional(),
});

export const objectIdSchema = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid id");

export const applySchema = z.object({
  jobId: objectIdSchema,
  resumeURL: z.string().url(),
  coverNote: z.string().max(2000).optional(),
});

export const jobWriteSchema = z
  .object({
    title: z.string().trim().min(3).max(120),
    description: z.string().trim().min(20).max(8000),
    location: z.string().trim().min(2).max(120),
    type: z.enum(["part-time", "contract", "full-time", "internship"]),
    isRemote: z.enum(["true", "false"]),
    salaryMin: z.coerce.number().int().positive(),
    salaryMax: z.coerce.number().int().positive(),
    expiresAt: z.string().min(1),
    publish: z.enum(["true", "false"]).optional(),
  })
  .refine((data) => data.salaryMax >= data.salaryMin, {
    message: "Maximum salary must be at least the minimum salary",
    path: ["salaryMax"],
  });

export const jobIdSchema = z.object({
  jobId: objectIdSchema,
});

export const stageSchema = z.enum([
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
]);

export const updateStageSchema = z.object({
  applicationId: objectIdSchema,
  stage: stageSchema,
});

export type JobQueryInput = z.infer<typeof jobQuerySchema>;
export type ApplicationStage = z.infer<typeof stageSchema>;
