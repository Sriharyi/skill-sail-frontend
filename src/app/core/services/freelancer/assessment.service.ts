import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AssessmentDto, CanTakeTest, TakeAssessment } from "src/app/shared/models/freelancer/assessment";
import { environment } from "src/environments/environment.development";
import { UserService } from "../user.service";

@Injectable({
    providedIn: 'root'
})
export class AssessmentService {

    private readonly apiUrl: string = `${environment.DOMAIN}/assessments`

    constructor(private http: HttpClient, private userService: UserService) {
    }


    //user can take assessment
    canUserTakeAssessment(skillId: string): Observable<CanTakeTest> {
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


    //submit assessment
    submitAssessment(assessmentId: string, updatedData: AssessmentDto) {
        updatedData.freelancerId = this.userService.getUserId();
        return this.http.put<AssessmentDto>(`${this.apiUrl}/${assessmentId}`, updatedData);
    }


}

