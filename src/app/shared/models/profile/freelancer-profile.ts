import {Education} from "./education";

export class FreelancerProfile {
  _id: string;
  profilePic: string;
  displayName: string;
  userName: string;
  description: string;
  skills: string[];
  education: Education[];

  constructor(_id:string, profilePic:string, displayName:string, userName:string, description:string, skills:string[], education:Education[]){
    this._id = _id;
    this.profilePic = profilePic;
    this.displayName = displayName;
    this.userName = userName;
    this.description = description;
    this.skills = skills;
    this.education = education;
  }
}


