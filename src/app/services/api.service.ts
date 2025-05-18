import { ApiInterface, TvShow } from './../models/api.interface';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public $searchObserver: Observable<TvShow[]>;

  private searchSubject = new BehaviorSubject<TvShow[]>([]);
  constructor(private http: HttpClient) {
    this.$searchObserver = this.getSearchesResults();
  }

  getSearchesResults(searchString = '') {
    this.$searchObserver = this.http.get<ApiInterface>(`search?q=${searchString}&page=1 `).pipe(
      map((response: ApiInterface) => response.tv_shows)

      // Note: The browser would log pretty much like that by default, so don't really need that code.
      // catchError(err => this.handleError(err))
    );
    return this.$searchObserver;
  }

  // private handleError(error: HttpErrorResponse): Observable<never> {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }
}
