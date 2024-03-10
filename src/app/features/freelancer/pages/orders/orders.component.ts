import { Component } from '@angular/core';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ProjectService } from "../../../../core/services/employer/project.service";
import { ProjectCard } from "../../../../shared/models/freelancer/project";
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  private destroy$: Subject<void> = new Subject<void>();

  projects: ProjectCard[] = [];
  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.loadProjects();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProjects() {
    this.projectService.getAcceptedProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.projects = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

}
