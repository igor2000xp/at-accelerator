import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { TvShow } from 'src/app/models/api-interface';

@Injectable({
  providedIn: 'root',
})
export class FavToggleService {
  private localStorageService = inject(LocalStorageService);

  // constructor() { }

  getLocalStorageFavorites(): TvShow[] {
    return this.localStorageService.getFavoritesStore<TvShow[]>('favorites') || [];
  }

  addToFavorites(show: TvShow): void {
    const favorites = this.getLocalStorageFavorites();
    favorites.push(show);
    this.localStorageService.setFavoritesStore('favorites', favorites);
  }

  removeFromFavorites(show: TvShow): void {
    const newFavorites = this.getLocalStorageFavorites().filter(item => item.id !== show.id);
    this.localStorageService.setFavoritesStore('favorites', newFavorites);
  }

  emptyFavorites(): void {
    this.localStorageService.setFavoritesStore('favorites', []);
  }
}
