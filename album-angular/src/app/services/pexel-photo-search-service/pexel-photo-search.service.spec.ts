import { TestBed } from '@angular/core/testing';

import { PexelPhotoSearchService } from './pexel-photo-search.service';

describe('PexelPhotoSearchService', () => {
  let service: PexelPhotoSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PexelPhotoSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
