import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { TvShow } from '../models/api.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css'],
})
export class TvShowTableComponent {
  $tv_shows: Observable<TvShow[]>;

  constructor(private apiService: ApiService) {
    this.$tv_shows = this.apiService.getShows();
  }

  // Add any additional methods or properties needed for the component
}
