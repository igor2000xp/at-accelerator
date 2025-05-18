import { TvShow } from './../models/api-interface';
import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowTableComponent } from '../tv-show-table/tv-show-table.component';
import { ApiService } from '../api/services/api.service';

@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [CommonModule, TvShowTableComponent],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
})
export class SearchViewComponent {
  protected dataSearch!: Signal<TvShow[]>;
  private api = inject(ApiService);

  constructor() {
    this.onClickHandler();
  }

  onClickHandler(search = '', event?: Event) {
    event?.preventDefault();
    this.dataSearch = this.api.getTvShows(search);
  }
}
