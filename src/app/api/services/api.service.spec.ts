import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { ApiInterface, TvShow } from '../../models/api-interface';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tv shows, update signals, and handle loading state', () => {
    const mockTvShows: TvShow[] = [
      {
        id: 1,
        name: 'Test Show',
        permalink: 'test-show',
        start_date: '2023-01-01',
        end_date: null,
        country: 'US',
        network: 'Test Network',
        status: 'Running',
        image_thumbnail_path: 'path/to/image.jpg',
      },
    ];

    const mockResponse: ApiInterface = {
      total: 1,
      page: 1,
      pages: 1,
      tv_shows: mockTvShows,
    };

    const searchString = 'test';

    // Initial state
    expect(service.isLoading()).toBeFalse();

    // Call the method
    const tvShowsSignal = service.getTvShows(searchString);

    // Should set loading to true immediately
    expect(service.isLoading()).toBeTrue();

    // Expect the HTTP request
    const req = httpMock.expectOne(`search?q=${searchString}&page=1`);
    expect(req.request.method).toBe('GET');

    // Respond to the request
    req.flush(mockResponse);

    // Should update signal and set loading to false
    expect(tvShowsSignal()).toEqual(mockTvShows);
    expect(service.isLoading()).toBeFalse();
  });
});
