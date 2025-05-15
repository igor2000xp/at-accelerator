import { TvShowTableComponent } from './../tv-show-table/tv-show-table.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [CommonModule, TvShowTableComponent, FormsModule],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
})
export class SearchViewComponent {
  constructor(private apiService: ApiService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input: string = (form.querySelector('#name') as HTMLInputElement).value;
    this.apiService.getSearchesResults(input);
  }
}
