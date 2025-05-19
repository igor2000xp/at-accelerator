import { Component, inject, signal } from '@angular/core';
import { FavCrudService } from './services/fav-crud.service';

@Component({
  selector: 'app-favorites-view',
  // standalone: true,
  // imports: [TvShowTableComponent],
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css'],
})
export class FavoritesViewComponent {
  private favCrudService = inject(FavCrudService);

  protected favData = this.favCrudService.getLocalStorageFavorites();
  protected isLoading = signal<boolean>(false).asReadonly();

  onClickHandler() {
    this.favCrudService.emptyFavorites();
  }
}
