import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { SkillDto } from "../../../../shared/models/admin/skill-dto";
import { SkillService } from "../../../../core/services/admin/skill.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-manage-skill',
  templateUrl: './manage-skill.component.html',
  styleUrls: ['./manage-skill.component.scss']
})
export class ManageSkillComponent {
  displayedColumns: string[] = ['S.No', 'skillName', 'skillDescription', 'skillCategory', 'Enable', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<SkillDto>();
  isChecked = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private changeDetectorRef: ChangeDetectorRef, private skillService: SkillService, private router: Router) {
  }

  ngOnInit(): void {
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

 
  //enable / diable skill
  enableSkill(skillId: string) {
    this.skillService.enableSkill(skillId, this.isChecked).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => console.error(err),
    });
  }


  //naviate to edit page with skill id /admin/skills/id/edit
  editSkill(id: string) {
    this.router.navigate([`/admin/skills/${id}/edit`]);
  }

  deleteSkill(id: string) {
    this.skillService.deleteSkill(id).subscribe({
      next: (data) => {
        this.loadPage(this.paginator.pageIndex, this.paginator.pageSize);
      },
      error: (err) => console.error(err),
    });
  }
  
}
