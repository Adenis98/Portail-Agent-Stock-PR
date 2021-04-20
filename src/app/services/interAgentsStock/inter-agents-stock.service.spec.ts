import { TestBed } from '@angular/core/testing';

import { InterAgentsStockService } from './inter-agents-stock.service';

describe('InterAgentsStockService', () => {
  let service: InterAgentsStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterAgentsStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
