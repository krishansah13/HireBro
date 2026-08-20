"use client"

import { createJob, JobActionState, publishJob, updateJob } from "@/lib/actions/jobs";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

type JobWriteFormProps = {
    mode: "create" | "edit";
    jobId?: string;
    initial?: {
        title: string;
        description: string;
        location: string;
        type: string;
        isRemote: boolean;
        salaryMin: number;
        salaryMax: number;
        expiresAt: string;
        status?: string;
    }
}
const STEPS = [
    "Role", "Location", "Compensation", "Review"
];

const initialState: JobActionState = {
    ok: false
}

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}
            className="rounded-xl bg-[#2e46ba] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
        >
            {pending ? "Saving..." : label}
        </button>
    )
}

function toDateInput(value?: string) {
    if (!value) return "";
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
}

export default function JobWriteForm({
    mode, jobId, initial
}: JobWriteFormProps) {
    const router = useRouter();
    const action = mode === "create" ? createJob : updateJob;
    const [state, formAction] = useActionState(action, initialState);
    const [publishState, publishAction] = useActionState(publishJob, initialState);
    const [step, setStep] = useState(0);

    const [title, setTitle] = useState(initial?.title || "");
    const [description, setDescription] = useState(initial?.description || "");
    const [location, setLocation] = useState(initial?.location ?? "");
    const [type, setType] = useState(initial?.type ?? "full-time");
    const [isRemote, setIsRemote] = useState(initial?.isRemote ? "true" : "false");
    const [salaryMin, setSalaryMin] = useState(String(initial?.salaryMin ?? ""));
    const [salaryMax, setSalaryMax] = useState(String(initial?.salaryMax ?? ""));
    const [expiresAt, setExpiresAt] = useState(toDateInput(initial?.expiresAt));

    useEffect(() => {
        if (state.ok) router.push("/employer");
    }, [state.ok, router]);

    useEffect(() => {
        if (publishState.ok) router.push("/employer");
    }, [publishState.ok, router]);

    return (
        <div className="space-y-6">
            <ol className="flex gap-2 text-xs font-medium text-gray-500">
                {STEPS.map((label, i) => (
                    <li
                        key={label}
                        className={`rounded-full px-3 py-1 ${i === step ? "bg-[#eef0ff] text-[#2e46ba]" : "bg-gray-100"
                            }`}
                    >
                        {i + 1}. {label}
                    </li>
                ))}
            </ol>
            {(state.error || publishState.error) && (
                <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {state.error || publishState.error}
                </p>
            )}
            <form action={formAction} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
                {jobId ? <input type="hidden" name="jobId" value={jobId} /> : null}
                {step === 0 && (
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Title
                            <input
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                            />
                        </label>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                            <textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={8}
                                required
                                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                            />
                        </label>
                    </div>
                )}
                {step === 1 && (
                    <div className="space-y-4">
                        <input type="hidden" name="title" value={title} />
                        <input type="hidden" name="description" value={description} />
                        <label className="block text-sm font-medium text-gray-700">
                            Location
                            <input
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                            />
                        </label>
                        <label className="block text-sm font-medium text-gray-700">
                            Type
                            <select
                                name="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                            >
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </label>
                        <label className="block text-sm font-medium text-gray-700">
                            Work mode
                            <select
                                name="isRemote"
                                value={isRemote}
                                onChange={(e) => setIsRemote(e.target.value)}
                                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                            >
                                <option value="false">On-site</option>
                                <option value="true">Remote</option>
                            </select>
                        </label>
                    </div>
                )}
                {step === 2 && (
                    <div className="space-y-4">
                        <input type="hidden" name="title" value={title} />
                        <input type="hidden" name="description" value={description} />
                        <input type="hidden" name="location" value={location} />
                        <input type="hidden" name="type" value={type} />
                        <input type="hidden" name="isRemote" value={isRemote} />
                        <label className="block text-sm font-medium text-gray-700">
                            Min salary (INR)
                            <input
                                name="salaryMin"
                                type="number"
                                value={salaryMin}
                                onChange={(e) => setSalaryMin(e.target.value)}
                                required
                                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                            />
                        </label>
                        <label className="block text-sm font-medium text-gray-700">
                            Max salary (INR)
                            <input
                                name="salaryMax"
                                type="number"
                                value={salaryMax}
                                onChange={(e) => setSalaryMax(e.target.value)}
                                required
                                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                            />
                        </label>
                        <label className="block text-sm font-medium text-gray-700">
                            Expires on
                            <input
                                name="expiresAt"
                                type="date"
                                value={expiresAt}
                                onChange={(e) => setExpiresAt(e.target.value)}
                                required
                                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2"
                            />
                        </label>
                    </div>
                )}
                {step === 3 && (
                    <div className="space-y-3 text-sm text-gray-700">
                        <input type="hidden" name="title" value={title} />
                        <input type="hidden" name="description" value={description} />
                        <input type="hidden" name="location" value={location} />
                        <input type="hidden" name="type" value={type} />
                        <input type="hidden" name="isRemote" value={isRemote} />
                        <input type="hidden" name="salaryMin" value={salaryMin} />
                        <input type="hidden" name="salaryMax" value={salaryMax} />
                        <input type="hidden" name="expiresAt" value={expiresAt} />
                        <p><strong>Title:</strong> {title}</p>
                        <p><strong>Location:</strong> {location} · {isRemote === "true" ? "Remote" : "On-site"}</p>
                        <p><strong>Type:</strong> {type}</p>
                        <p><strong>Salary:</strong> {salaryMin} – {salaryMax}</p>
                        <p><strong>Expires:</strong> {expiresAt}</p>
                    </div>
                )}
                <div className="flex flex-wrap gap-3">
                    {step > 0 && (
                        <button
                            type="button"
                            onClick={() => setStep((s) => s - 1)}
                            className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                        >
                            Back
                        </button>
                    )}
                    {step < 3 && (
                        <button
                            type="button"
                            onClick={() => setStep((s) => s + 1)}
                            className="rounded-xl bg-[#eef0ff] px-5 py-2.5 text-sm font-semibold text-[#2e46ba]"
                        >
                            Continue
                        </button>
                    )}
                    {step === 3 && (
                        <>
                            <input type="hidden" name="publish" value="false" />
                            <SubmitButton label={mode === "create" ? "Save draft" : "Save changes"} />
                        </>
                    )}
                </div>
            </form>
            {step === 3 && (
                <form action={mode === "create" ? formAction : publishAction}>
                    {jobId ? <input type="hidden" name="jobId" value={jobId} /> : null}
                    {mode === "create" && (
                        <>
                            <input type="hidden" name="title" value={title} />
                            <input type="hidden" name="description" value={description} />
                            <input type="hidden" name="location" value={location} />
                            <input type="hidden" name="type" value={type} />
                            <input type="hidden" name="isRemote" value={isRemote} />
                            <input type="hidden" name="salaryMin" value={salaryMin} />
                            <input type="hidden" name="salaryMax" value={salaryMax} />
                            <input type="hidden" name="expiresAt" value={expiresAt} />
                            <input type="hidden" name="publish" value="true" />
                        </>
                    )}
                    <SubmitButton
                        label={
                            initial?.status === "published" ? "Already published" : "Publish role"
                        }
                    />
                </form>
            )}
        </div>
    );
}
