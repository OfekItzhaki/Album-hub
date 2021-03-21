import { TestBed } from '@angular/core/testing';

import { LocalImagesService } from './local-images.service';

describe('LocalImagesService', () => {
  let service: LocalImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
