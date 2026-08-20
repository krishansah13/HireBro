"use client"

import { type PipelineActionState, updateApplicationStage } from "@/lib/actions/pipeline"
import { allowedNextStages } from "@/lib/stage-transitions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialStage:PipelineActionState = {ok : false};

function SubmitButton({label} : {label: string}) {
    const {pending} =useFormStatus();
    return (
        <button type = "submit" disabled={pending} className="rounded-lg bg-[#eef0ff] px-3 py-1.5 text-xs font-semibold text-[#2e46ba] hover:bg-indigo-100 disabled:opacity-70">
            {pending ? "Moving...":label}
        </button>
    );
}

export default function StageMoveForm({applicationId, currentStage} : {applicationId : string, currentStage : string}) {
    const [state, formAction] = useActionState(updateApplicationStage, initialStage)
    const next = allowedNextStages(currentStage);
    if(next.length === 0) {
        return <p className="text-xs text-gray-400">
            Terminal Stage
        </p>
    }
    return (
        <div className="space-y-2">
            {state.error?(
                <p className="text-xs text-rose-600"> {state.error}</p>
            ):null}
            <div className="flex flex-wrap gap-2">
                {
                    next.map((stage)=>(
                        <form key ={stage} action={formAction}>
                            <input type="hidden" name="applicationId" value={applicationId}/>
                            <input type="hidden" name="stage" value={stage}/>
                            <SubmitButton label = {stage==="rejected"?"Reject": `Move to ${stage}`}/>
                        </form>
                    ))
                }
            </div>
        </div>
    )
}