import { Component, OnInit } from '@angular/core';
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
export class TvShowTableComponent implements OnInit {
  $tv_shows: Observable<TvShow[]> = new Observable<TvShow[]>();

  constructor(private apiService: ApiService) {}

  public updateView() {
    this.$tv_shows = this.apiService.$apiObserver;
  }
  ngOnInit(): void {
    this.$tv_shows = this.apiService.$apiObserver;
    this.apiService.getShows();
  }
}
