import { inject, Injectable, Signal, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { TvShow } from 'src/app/models/api-interface';

@Injectable({
  providedIn: 'root',
})
export class FavCrudService {
  private favData = signal<TvShow[]>([]);
  public favDataSignal = this.favData.asReadonly();
  private localStorageService = inject(LocalStorageService);

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const stored = this.localStorageService.getFavoritesStore<TvShow[]>('favorites') || [];
    this.favData.set(stored);
  }

  getLocalStorageFavorites(): Signal<TvShow[]> {
    // this.favData.set(this.localStorageService.getFavoritesStore<TvShow[]>('fa
    return this.favDataSignal;
  }

  addToFavorites(show: TvShow): void {
    // const favorites = this.getLocalStorageFavorites();
    // favorites().push(show);
    // this.localStorageService.setFavoritesStore('favorites', favorites());
    const currentFavorites = this.favData();
    this.favData.set([...currentFavorites, show]);
    this.localStorageService.setFavoritesStore('favorites', this.favData());
  }

  removeFromFavorites(show: TvShow): void {
    // const newFavorites = this.getLocalStorageFavorites();
    // newFavorites().filter(item => item.id !== show.id);
    // this.localStorageService.setFavoritesStore('favorites', newFavorites());
    const currentFavorites = this.favData();
    const newFavorites = currentFavorites.filter(item => item.id !== show.id);
    this.favData.set(newFavorites);
    this.localStorageService.setFavoritesStore('favorites', this.favData());
  }

  emptyFavorites(): void {
    this.favData.set([]);
    this.localStorageService.cleanFavoritesStore('favorites');
  }
}
