import { Component, Input } from '@angular/core';
import { ProjectResponse } from "../../../../shared/models/employer/project-create";

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
    @Input() project: ProjectResponse;

    constructor() {
        this.project = {
            id: '',
            freelancerProfileId: '',
            title: '',
            description: '',
            employerProfileId: '',
            category: '',
            skills: [],
            budget: 0,
            deadline: new Date(),
            bidDeadline: new Date(),
            status: ''
        }
    }
}
