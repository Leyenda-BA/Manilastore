import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorC } from './buscador-c';

describe('BuscadorC', () => {
  let component: BuscadorC;
  let fixture: ComponentFixture<BuscadorC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorC],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorC);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
