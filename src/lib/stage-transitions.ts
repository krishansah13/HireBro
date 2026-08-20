import type { ApplicationStage } from "./validation";
export const STAGE_TRANSITIONS: Record<ApplicationStage, ApplicationStage[]> = {
    applied: ["screening", "rejected"],
    screening: ["interview", "rejected"],
    interview: ["offer", "rejected"],
    offer:[],
    rejected:[]
};

export function allowedNextStages(from: string) : ApplicationStage[] {
    return STAGE_TRANSITIONS[from as ApplicationStage]??[];
}

export function canTransition(from: string, to: string) : boolean {
    return allowedNextStages(from).includes(to as ApplicationStage);
}