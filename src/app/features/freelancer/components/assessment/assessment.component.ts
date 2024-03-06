import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SkillService } from 'src/app/core/services/admin/skill.service';
import { AssessmentService } from 'src/app/core/services/freelancer/assessment.service';
import { SkillDto } from 'src/app/shared/models/admin/skill-dto';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent {
  displayedColumns: string[] = ['S.No', 'skillName', 'skillDescription', 'skillCategory', 'action'];
  dataSource = new MatTableDataSource<SkillDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private skillService: SkillService, private changeDetectorRef: ChangeDetectorRef,private assesmentService:AssessmentService) {

  }

  
  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.page.subscribe({
        next: (page: any) => this.loadPage(page.pageIndex, page.pageSize)
      });
      this.loadPage(0, 2);
    }
    this.changeDetectorRef.detectChanges();
  }

  takeAssessment(skillId: string) {

    if(this.isUserAllowedToTakeAssessment(skillId)){
      this.assesmentService.takeAssessment(skillId).subscribe({
        next: (response) => {
          if (response) {
            alert('Assessment taken successfully');
          }
        }
      });
    }
  
  }
  isUserAllowedToTakeAssessment(skillId: string) {
    let isAllowed = false;
    this.assesmentService.canUserTakeAssessment(skillId).subscribe({
      next: (response) => {
        if (response) {
          isAllowed = true;
        } 
      }
    });
    return isAllowed;
  }

  loadPage(pageIndex: number, pageSize: number) {
    this.skillService.getSkillsByPage(pageIndex, pageSize).subscribe(
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
