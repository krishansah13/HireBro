import { getMyApplicationStageHistory } from "@/lib/application-query";
import { notFound } from "next/navigation";
import StageBadge from "./StageBadge";

function formatWhen(value?: string | Date) {
    if (!value) return "-";
    return new Date(value).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default async function ApplicationStageHistory({
    userId, applicationId
}: { userId: string, applicationId: string }) {
    const data = await getMyApplicationStageHistory(userId, applicationId);
    if (!data) notFound();
    const history = [...(data.stageHistory ?? [])].sort(
        (a, b) => new Date(a.changedAt).getTime() - new Date(b.changedAt).getTime(),
    )
    if (history.length === 0) {
        return <p className="text-sm text-gray-500">No stage history yet</p>
    }
    return (
        <ol className="space-y-4">
            {
                history.map((entry, index) => (
                    <li key={`${entry.stage} - ${index}`} className="flex gap-3">
                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2e46ba]" />
                        <div>
                            <StageBadge stage={entry.stage} />
                            <p className="mt-1 text-xs text-gray-500">
                                {formatWhen(entry.changedAt)}
                            </p>
                        </div>
                    </li>
                ))
            }
        </ol>
    )
}