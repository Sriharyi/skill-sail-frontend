import { FormControl } from "@angular/forms";

export interface BidForm{
  bidAmount:FormControl<number | null>;
  proposal:FormControl<string | null>;
}

export interface BidRequest {
  projectId:string;
  freelancerId:string;
  bidAmount:number;
  proposal:string;
}

export class BidResponse{
  id:string;
  projectId:string;
  freelancerProfileId:string;
  bidAmount:number;
  proposal:string;
  status:string;

  constructor(id:string,projectId:string,freelancerProfileId:string,bidAmount:number,proposal:string,status:string){
    this.id = id;
    this.projectId = projectId;
    this.freelancerProfileId = freelancerProfileId;
    this.bidAmount = bidAmount;
    this.proposal = proposal;
    this.status = status;
  }
  static fromJson(data:any):BidResponse{
    return {
      id:data.id,
      projectId:data.projectId,
      freelancerProfileId:data.freelancerProfileId,
      bidAmount:data.bidAmount,
      proposal:data.proposal,
      status:data.status
    }
  }
}


export interface FreelancerBidResponse{
      id:string;
      projectId:string;
      projectName:string;
      companyName:string;
      bidDeadline:Date;
      bidAmount:number;
      status:string;
}
