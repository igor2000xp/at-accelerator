import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { TvShow } from 'src/app/models/api-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavCrudService {
  private favData = signal<TvShow[]>([]);
  public favDataSignal = this.favData.asReadonly();
  private localStorageService = inject(LocalStorageService);
  private readonly KEY = environment.FAVORITES_KEY;

  constructor() {
    effect(() => this.localStorageService.setFavoritesStore(this.KEY, this.favData()));
    // this.loadFavorites();
  }

  // private loadFavorites(): void {
  //   const stored = this.localStorageService.getFavoritesStore<TvShow[]>(this.KEY) || [];
  //   this.favData.set(stored);
  // }

  // getLocalStorageFavorites(): Signal<TvShow[]> {
  //   // this.favData.set(this.localStorageService.getFavoritesStore<TvShow[]>('fa
  //   return this.favDataSignal;
  // }

  addToFavorites(show: TvShow): void {
    // const favorites = this.getLocalStorageFavorites();
    // favorites().push(show);
    // this.localStorageService.setFavoritesStore('favorites', favorites());

    // const currentFavorites = this.favData();
    // this.favData.set([...currentFavorites, show]);

    this.favData.update(data => [...data, show]);
    // this.localStorageService.setFavoritesStore(this.KEY, this.favData());
  }

  removeFromFavorites(show: TvShow): void {
    //   // const newFavorites = this.getLocalStorageFavorites();
    //   // newFavorites().filter(item => item.id !== show.id);
    //   // this.localStorageService.setFavoritesStore('favorites', newFavorites());

    //   const currentFavorites = this.favData();
    //   const newFavorites = currentFavorites.filter(item => item.id !== show.id);
    //   this.favData.set(newFavorites);
    this.favData.update(data => [...data.filter(item => item.id !== show.id)]);

    // this.localStorageService.setFavoritesStore(this.KEY, this.favData());
  }

  emptyFavorites(): void {
    this.favData.set([]);
    this.localStorageService.cleanFavoritesStore(this.KEY);
  }
}
