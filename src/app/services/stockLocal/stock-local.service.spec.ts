import { TestBed } from '@angular/core/testing';

import { StockLocalService } from './stock-local.service';

describe('StockLocalService', () => {
  let service: StockLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
