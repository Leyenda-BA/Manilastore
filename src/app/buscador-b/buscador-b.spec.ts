import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorB } from './buscador-b';

describe('BuscadorB', () => {
  let component: BuscadorB;
  let fixture: ComponentFixture<BuscadorB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorB],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorB);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
