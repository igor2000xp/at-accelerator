import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShow } from '../models/api-interface';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css'],
})
export class TvShowTableComponent {
  @Input() data!: Signal<TvShow[]>;
}
