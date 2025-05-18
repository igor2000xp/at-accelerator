import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShow } from '../models/api.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css'],
})
export class TvShowTableComponent {
  @Input() $tv_shows!: Observable<TvShow[]>;

  constructor(private apiService: ApiService) {}
}
