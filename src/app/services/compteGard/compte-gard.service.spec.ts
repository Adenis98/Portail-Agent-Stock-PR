import { TestBed } from '@angular/core/testing';

import { CompteGardService } from './compte-gard.service';

describe('CompteGardService', () => {
  let service: CompteGardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteGardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
