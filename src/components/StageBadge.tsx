const STAGE_STYLES : Record<string,string>= {
    applied: "bg-indigo-50 text-indigo-700",
    screening: "bg-amber-50 text-amber-800",
    interview: "bg-sky-50 text-sky-800",
    offer: "bg-emerald-50 text-emerald-800",
    rejected: "bg-rose-50 text-rose-700",
}
export default function StageBadge({ stage }: { stage: string }) {
    const label = stage.charAt(0).toUpperCase() + stage.slice(1);
    const styles = STAGE_STYLES[stage] ?? "bg-gray-100 text-gray-700";
    return (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}>
            {label}
        </span>
    )
}