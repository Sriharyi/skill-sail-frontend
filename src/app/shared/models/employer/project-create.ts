import { FormControl } from "@angular/forms";

export interface ProjectForm{
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    category: FormControl<string | null>;
    skills: FormControl<string[] | null>;
    budget: FormControl<number | null>;
    deadline: FormControl<Date | null>;
    bidDeadline: FormControl<Date | null>;
}

export interface ProjectCreateRequest{
    title: string;
    description: string;
    employerProfileId: string;
    category: string;
    skills: string[];
    budget: number;
    deadline: Date;
    bidDeadline: Date;
}

export interface ProjectResponse {
    id: string;
    freelancerProfileId: string;
    title: string;
    description: string;
    employerProfileId: string;
    category: string;
    skills: string[];
    budget: number;
    deadline: Date;
    bidDeadline: Date;
    status: string;
}
//paginated response
export interface Page<T>{
    content: T[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
}
