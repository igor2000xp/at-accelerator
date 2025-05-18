import { TvShowTableComponent } from './../tv-show-table/tv-show-table.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { TvShow } from '../models/api.interface';

@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [CommonModule, TvShowTableComponent, FormsModule],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
})
export class SearchViewComponent {
  $dataSearch: Observable<TvShow[]>;

  constructor(private apiService: ApiService) {
    this.$dataSearch = this.apiService.getSearchesResults();
  }

  onClickHandler(searchString = '', event: Event) {
    event.preventDefault();
    this.$dataSearch = this.apiService.getSearchesResults(searchString);
  }
}
