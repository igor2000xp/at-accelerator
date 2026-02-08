// import { TestBed } from '@angular/core/testing';

// import { apiInterceptor } from './api-interceptor';

// describe('ApiInterceptorService', () => {
//   let service: typeof apiInterceptor;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(apiInterceptor);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


// api-interceptor.spec.ts
import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { apiInterceptor } from './api-interceptor';
import { environment } from 'src/environments/environment.development';

describe('apiInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // register functional interceptor
        provideHttpClient(withInterceptors([apiInterceptor])),
        // enable HttpTestingController
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prefix request URL with environment.apiUrl', () => {
    http.get('/search?q=test&page=1').subscribe();

    const req = httpMock.expectOne(
      `${environment.apiUrl}/search?q=test&page=1`,
    );
    expect(req.request.url).toBe(
      `${environment.apiUrl}/search?q=test&page=1`,
    );
    req.flush({}); // complete request
  });

  it('should propagate HttpErrorResponse from server', () => {
    let capturedError: HttpErrorResponse | undefined;

    http.get('/search?q=test&page=1').subscribe({
      next: () => fail('should error'),
      error: err => (capturedError = err),
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/search?q=test&page=1`,
    );
    req.flush(
      { message: 'Not found' },
      { status: 404, statusText: 'Not Found' },
    );

    expect(capturedError).toBeTruthy();
    expect(capturedError?.status).toBe(404);
  });
});
