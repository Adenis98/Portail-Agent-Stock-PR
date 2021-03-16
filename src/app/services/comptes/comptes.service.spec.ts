import { TestBed } from '@angular/core/testing';

import { GetcomptesService } from './comptes.service';

describe('GetcomptesService', () => {
  let service: GetcomptesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetcomptesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
