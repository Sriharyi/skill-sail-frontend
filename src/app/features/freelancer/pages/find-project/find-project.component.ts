import { Component } from '@angular/core';
import { ProjectService } from "../../../../core/services/employer/project.service";
import { Page, ProjectResponse } from "../../../../shared/models/employer/project-create";
import { Project } from "../../../../shared/models/freelancer/project";
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject,takeUntil } from 'rxjs';

@Component({
  selector: 'app-find-project',
  templateUrl: './find-project.component.html',
  styleUrls: ['./find-project.component.scss']
})
export class FindProjectComponent {

  first: number = 0;
  rows: number = 12;
  totalrecords: number = 0;
  searchTerm: any;
  projects: Project[] = [];
  private readonly debounceTimeMs = 300;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private projectService: ProjectService, private router: Router) {

  }

  ngOnInit() {
    this.loadProjects(this.first, this.rows);
    this.searchSubject
      .pipe(
        debounceTime(this.debounceTimeMs),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.search();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  loadProjects(page: number, rows: number) {
    this.projectService.getPaginatedProjects(page, rows).subscribe({
      next: (response: Page<ProjectResponse>) => {
        this.projects = response.content.map((project) => Project.fromJson(project));
        this.totalrecords = response.totalElements;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  search() {
    this.loadSearchProjects(this.searchTerm, this.first, this.rows);
  }

  onSearch(event: KeyboardEvent) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchValue);
  }

  loadSearchProjects(searchText: any, first: number, rows: number) {
    this.projectService.searchProjects(searchText, first, rows).subscribe({
      next: (response: Page<ProjectResponse>) => {
        this.projects = response.content.map((project) => Project.fromJson(project));
        this.totalrecords = response.totalElements;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onPageChange($event: any) {
    if (this.searchTerm) {
      this.loadSearchProjects(this.searchTerm, $event.first, $event.rows);
    } else {
      this.loadProjects($event.page, $event.rows);
    }
  }
  openProject(project: Project) {
    this.router.navigate(['freelancer/project', project.id]);
  }
}
