import { TestBed } from '@angular/core/testing';

import { HbcService } from './hbc.service';

describe('HbcService', () => {
  let service: HbcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HbcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
