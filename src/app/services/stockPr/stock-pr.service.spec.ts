import { TestBed } from '@angular/core/testing';

import { StockPrService } from './stock-pr.service';

describe('StockPrService', () => {
  let service: StockPrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockPrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
