import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading = this.loadingService.loading$;
  constructor(private loadingService: LoadingService) { }
}
