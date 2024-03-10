export interface TakeAssessment {
    skillId: string;
    freelancerId: string;
}

export interface CanTakeTest{
    canTake:boolean;
    message:string;
}

export interface AssessmentDto {
    id: string;
    skillId: string;
    freelancerId: string;
    status: string;
    score: number;
}