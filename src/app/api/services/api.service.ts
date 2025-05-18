import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { ApiInterface, TvShow } from 'src/app/models/api-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private loading = signal<boolean>(false);
  public isLoading = this.loading.asReadonly();
  private tvShows = signal<TvShow[]>([]);

  private httpp = inject(HttpClient);

  getTvShows(searchString = ''): Signal<TvShow[]> {
    this.loading.set(true);
    this.httpp.get<ApiInterface>(`search?q=${searchString}&page=1`).subscribe(res => {
      this.tvShows.set(res.tv_shows);
      this.loading.set(false);
    });
    return this.tvShows.asReadonly();
  }
}
