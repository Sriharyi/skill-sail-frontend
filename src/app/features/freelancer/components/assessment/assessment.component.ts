import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SkillService } from 'src/app/core/services/admin/skill.service';
import { SkillDto } from 'src/app/shared/models/admin/skill-dto';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent {
  displayedColumns: string[] = ['S.No', 'skillName', 'skillDescription', 'skillCategory', 'action'];
  dataSource = new MatTableDataSource<SkillDto>();

  constructor(private skillService: SkillService) {

  }

  takeAssessment(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
