import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SkillDto} from "../../../../shared/models/admin/skill-dto";
import {SkillService} from "../../../../core/services/admin/skill.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-skill',
  templateUrl: './manage-skill.component.html',
  styleUrls: ['./manage-skill.component.scss']
})
export class ManageSkillComponent {
  displayedColumns: string[] = ['S.No', 'skillName', 'skillDescription', 'Enable','Edit','Delete'];
  dataSource = new MatTableDataSource<SkillDto>();
  isChecked = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private changeDetectorRef: ChangeDetectorRef, private skillService: SkillService,private router:Router) {
  }

  ngOnInit(): void {
    console.log(this.paginator);
  }

  ngAfterViewInit() {
    console.log(this.paginator);
    if (this.paginator) {
      this.paginator.page.subscribe({
        next: (page: any) => this.loadPage(page.pageIndex, page.pageSize)
      });
      this.loadPage(0, 5);
    }
    this.changeDetectorRef.detectChanges();
  }

  loadPage(pageIndex: number, pageSize: number) {

    this.getSkillDto(pageIndex, pageSize);
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

  getSkillDto(pageIndex: number, pageSize: number){
    const pageObject = {
      content: [] as SkillDto[],
      totalElements: 0,
      number: 0,
      size: 0
    }

    const skillObj: SkillDto = {
      id: '1',
      skillName: 'Angular',
      skillDescription: 'Frontend Framework',
    }

    for(let i=0; i<5; i++){
      pageObject.content.push(skillObj);
    }

    pageObject.totalElements = 5;
    pageObject.number = 0;
    pageObject.size = 5;


    this.dataSource.data = pageObject.content;
    this.paginator.length = pageObject.totalElements;
    this.paginator.pageIndex = pageObject.number;
    this.paginator.pageSize = pageObject.size;
  }

  //enable / diable skill
  enableSkill(skillId: string) {
      this.skillService.enableSkill(skillId,this.isChecked).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => console.error(err),
      });
  }


  //naviate to edit page with skill id /admin/skills/id/edit
  editSkill(id:string) {

    this.router.navigate([`/admin/skills/${id}/edit`]);

  }

  deleteSkill(id:string) {
    this.skillService.deleteSkill(id).subscribe({
      next: (data) => {
        this.loadPage(this.paginator.pageIndex, this.paginator.pageSize);
      },
      error: (err) => console.error(err),
    });
  }
}
