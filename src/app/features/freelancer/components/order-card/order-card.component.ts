import { Component, Input } from '@angular/core';
import { ProjectCard } from "../../../../shared/models/freelancer/project";

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {

  @Input()
  project!: ProjectCard;
   constructor() {
   }

    ngOnInit() {
    }
}
