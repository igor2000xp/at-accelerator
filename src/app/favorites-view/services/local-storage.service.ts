import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setFavoritesStore<T>(key: string, obj: T): void {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  getFavoritesStore<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  cleanFavoritesStore(key: string): void {
    localStorage.removeItem(key);
  }
}
