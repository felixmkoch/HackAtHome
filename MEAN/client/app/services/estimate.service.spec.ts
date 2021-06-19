import { TestBed } from '@angular/core/testing';

import { EstimateService } from './estimate.service';

describe('EstimateService', () => {
  let service: EstimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
