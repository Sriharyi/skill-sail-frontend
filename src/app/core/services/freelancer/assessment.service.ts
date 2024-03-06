import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { UserService } from "../user.service";
import { AssessmentDto, CanTakeTest, TakeAssessment } from "src/app/shared/models/freelancer/assessment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AssessmentService {

    private readonly apiUrl: string = `${environment.DOMAIN}/assessments`

    constructor(private http: HttpClient, private userService: UserService) {
    }


    //user can take assessment
    canUserTakeAssessment(skillId: string):Observable<CanTakeTest> {
        const userId = this.userService.getUserId();
        const params = new HttpParams()
            .set('freelancerId', userId)
            .set('skillId', skillId);
        return this.http.get<CanTakeTest>(`${this.apiUrl}/cantake`, { params });
    }

    //take assessment
    takeAssessment(skillId: string) {
        const userId = this.userService.getUserId();
        const request: TakeAssessment = {
            skillId: skillId,
            freelancerId: userId
        }
        return this.http.post<AssessmentDto>(`${this.apiUrl}`, request);
    }


}

