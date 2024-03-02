import {Question} from "../freelancer/question";

export interface SkillDto{
    id: string;
    skillName: string;
    skillDescription: string;
    questions?: Question[];
}
