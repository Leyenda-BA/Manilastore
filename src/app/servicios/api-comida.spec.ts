import { TestBed } from '@angular/core/testing';

import { ApiComida } from './api-comida';

describe('ApiComida', () => {
  let service: ApiComida;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiComida);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
