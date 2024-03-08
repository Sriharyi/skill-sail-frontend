import {Education} from "./education";

export class FreelancerProfile {
  id: string;
  profilePic: string;
  displayName: string;
  userName: string;
  description: string;
  skills: string[];
  educations: Education[];

  constructor(id:string, profilePic:string, displayName:string, userName:string, description:string, skills:string[], educations:Education[]){
    this.id = id;
    this.profilePic = profilePic;
    this.displayName = displayName;
    this.userName = userName;
    this.description = description;
    this.skills = skills;
    this.educations = educations;
  }

  public static createInitial(): FreelancerProfile {
    return new FreelancerProfile(
      '', 
      '', 
      '', 
      '', 
      '', 
      [], 
      []  
    );
  }
}


