import { TestBed } from '@angular/core/testing';

import { PrivateModeService } from './private-mode.service';

describe('PrivateModeService', () => {
  let service: PrivateModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
