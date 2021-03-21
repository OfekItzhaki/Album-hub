import { TestBed } from '@angular/core/testing';

import { HashGuardService } from './hash-guard.service';

describe('HashGuardService', () => {
  let service: HashGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
