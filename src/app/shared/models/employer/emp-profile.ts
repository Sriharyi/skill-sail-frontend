export class EmployerProfile {
    id: number;
    companyLogo: string;
    companyName: string;
    companyEmail: string;
    companyWebsite: string;
    companyDescription: string;
    companyLocation: string;
    companyIndustry: string;

    constructor(id: number, companyLogo: string, companyName: string, companyEmail: string, companyWebsite: string, companyDescription: string, companyLocation: string, companyIndustry: string) {
        this.id = id;
        this.companyLogo = companyLogo;
        this.companyName = companyName;
        this.companyEmail = companyEmail;
        this.companyWebsite = companyWebsite;
        this.companyDescription = companyDescription;
        this.companyLocation = companyLocation;
        this.companyIndustry = companyIndustry;
    }
    
    public static createEmpty(): EmployerProfile {
        return new EmployerProfile(
            0, // Default id
            '', // Default companyLogo
            '', // Default companyName
            '', // Default companyEmail
            '', // Default companyWebsite
            '', // Default companyDescription
            '', // Default companyLocation
            ''  // Default companyIndustry
        );
    }

    public static fromJson(json: any): EmployerProfile {
        return new EmployerProfile(json.id, json.companyLogo, json.companyName, json.companyEmail, json.companyWebsite, json.companyDescription, json.companyLocation, json.companyIndustry);
    }

    public toJson(): any {
        return {
            id: this.id,
            companyLogo: this.companyLogo,
            companyName: this.companyName,
            companyEmail: this.companyEmail,
            companyWebsite: this.companyWebsite,
            companyDescription: this.companyDescription,
            companyLocation: this.companyLocation,
            companyIndustry: this.companyIndustry
        };
    }

    public static fromJsonList(json: any): EmployerProfile[] {
        return json.map(EmployerProfile.fromJson);
    }
   
}