import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShow } from '../models/api-interface';
import { ToggleFavDirective } from '../favorites-view/directives/toggle-fav.directive';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule, ToggleFavDirective],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css'],
})
export class TvShowTableComponent {
  @Input() searchData!: Signal<TvShow[]>;
  @Input() isLoading!: Signal<boolean>;
}
