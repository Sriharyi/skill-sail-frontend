import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { EmployerBidResponse } from "../../../shared/models/employer/employer-bid";
import { BidRequest, BidResponse, FreelancerBidResponse } from "../../../shared/models/freelancer/bid";
import { UserService } from "../user.service";


@Injectable({
  providedIn: 'root'
})
export class BidService {


  private readonly apiUrl = `${environment.DOMAIN}/bids`

  constructor(private http: HttpClient, private userService: UserService) {
  }

  //create a bid
  createBid(bid: BidRequest) {
    bid.freelancerId = this.userService.getUserId();
    return this.http.post<BidResponse>(this.apiUrl, bid);
  }

  //get all bids for a project
  getBidsByProjectId(projectId: string) {
    return this.http.get<EmployerBidResponse[]>(`${this.apiUrl}/project/${projectId}`);
  }

  hireFreelancer(bidId: string) {
    return this.http.put(`${this.apiUrl}/${bidId}/hire`, {});
  }

  getBidsByFreelancerId() {
    const freelancerId = this.userService.getUserId();
    return this.http.get<FreelancerBidResponse[]>(`${this.apiUrl}/freelancer/${freelancerId}`);
  }

  isalreadyBidded(id: string) {
    const freelancerId = this.userService.getUserId();
    return this.http.get<boolean>(`${this.apiUrl}/project/${id}/freelancer/${freelancerId}`);
  }
}

