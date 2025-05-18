import { TestBed } from '@angular/core/testing';

import { FavToggleService } from './fav-toggle.service';

describe('FavToggleService', () => {
  let service: FavToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
