import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // constructor() { }
  setFavoritesStore<T>(key: string, obj: T) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  getFavoritesStore<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
