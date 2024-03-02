import {Question} from "../Freelancer/Question";

export interface SkillDto{
    id: string;
    skillName: string;
    skillDescription: string;
    questions?: Question[];
}
