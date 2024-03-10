import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { SkillService } from 'src/app/core/services/admin/skill.service';
import { AssessmentService } from 'src/app/core/services/freelancer/assessment.service';
import { SkillDto } from 'src/app/shared/models/admin/skill-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent {

  private destroy = new Subject<void>();
  displayedColumns: string[] = ['S.No', 'skillName', 'skillDescription', 'skillCategory', 'action'];
  dataSource = new MatTableDataSource<SkillDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private skillService: SkillService, private changeDetectorRef: ChangeDetectorRef, private assesmentService: AssessmentService, private router: Router) {

  }


  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.page
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: (page: any) => this.loadPage(page.pageIndex, page.pageSize)
        });
      this.loadPage(0, 2);
    }
    this.changeDetectorRef.detectChanges();
  }

  takeAssessment(skillId: string) {
    this.assesmentService.canUserTakeAssessment(skillId)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response) => {
          if (!response.canTake) {
            Swal.fire('Oops...', response.message, 'error');
          }
          else {
            this.assesmentService.takeAssessment(skillId)
              .pipe(takeUntil(this.destroy))
              .subscribe({
                next: (response) => {
                  console.log(response);
                  const testId = response.id;
                  const skillId = response.skillId;
                  this.router.navigate([`/freelancer/assessment/${testId}`], { queryParams: { skillId: skillId } });
                }
              });
          }
        }
      });


  }


  loadPage(pageIndex: number, pageSize: number) {
    this.skillService.getSkillsByPage(pageIndex, pageSize)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        {
          next: (response) => {
            if (response) {
              this.dataSource.data = response.content;
              this.paginator.length = response.totalElements;
              this.paginator.pageIndex = response.number;
              this.paginator.pageSize = response.size;
            }
          }
        }
      );
  }
}
