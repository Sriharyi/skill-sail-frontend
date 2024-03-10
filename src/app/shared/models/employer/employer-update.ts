import { FormControl } from "@angular/forms";

export interface EmployerUpdateForm {
    companyName: FormControl<string | null>;
    companyWebsite  : FormControl<string | null>;
    companyDescription: FormControl<string | null>;
    companyLocation: FormControl<string | null>;
    companyIndustry: FormControl<string | null>;
}

export interface EmployerUpdateRequest {
    companyName: string;
    companyWebsite: string;
    companyDescription: string;
    companyLocation: string;
    companyIndustry: string;
}

export interface EmployerUpdateResponse {
    companyName: string;
    companyWebsite: string;
    companyDescription: string;
    companyLocation: string;
    companyIndustry: string;
}