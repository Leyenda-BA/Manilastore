import { TestBed } from '@angular/core/testing';

import { ApiBebidas } from './api-bebidas';

describe('ApiBebidas', () => {
  let service: ApiBebidas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBebidas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
