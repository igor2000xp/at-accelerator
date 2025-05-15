import { ApiInterface, TvShow } from './../models/api.interface';
import { catchError, Observable, map, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiSubject = new BehaviorSubject<TvShow[]>([]);
  public $apiObserver = this.apiSubject.asObservable();
  constructor(private http: HttpClient) {
    this.getShows();
    // this.$apiObserver = this.http.get<ApiInterface>('search').pipe(
    //   map(response => response.tv_shows),
    //   catchError(err => this.handleError(err))
    // );
  }

  getShows() {
    this.http
      .get<ApiInterface>('search')
      .pipe(
        map(response => response.tv_shows),
        catchError(err => this.handleError(err))
      )
      .subscribe(data => this.apiSubject.next(data));
    // return this.$apiObserver;
    // return this.http.get<ApiInterface>('search').pipe(
    //   map(response => response.tv_shows),
    //   catchError(err => this.handleError(err))
    // );
  }

  getUpdatedShows(): Observable<TvShow[]> {
    return this.$apiObserver;
  }

  getSearchesResults(searchString: string) {
    this.http
      .get<ApiInterface>(`search?q=${searchString}&page=1 `)
      .pipe(
        map((response: ApiInterface) => response.tv_shows),
        catchError(err => this.handleError(err))
      )
      .subscribe((data: TvShow[]) => this.apiSubject.next(data));
    // this.$apiObserver = this.http.get<ApiInterface>(`search?q=${searchTerm}&page=1 `).pipe(
    //   map(response => response.tv_shows),
    //   catchError(err => this.handleError(err))
    // );
    // return this.$apiObserver;
    // return this.http.get<ApiInterface>(`search?q=${searchTerm}&page=1 `).pipe(
    //   map(response => response.tv_shows),
    //   catchError(err => this.handleError(err))
    // );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
