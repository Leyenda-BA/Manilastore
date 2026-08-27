import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Separador } from './separador';

describe('Separador', () => {
  let component: Separador;
  let fixture: ComponentFixture<Separador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Separador],
    }).compileComponents();

    fixture = TestBed.createComponent(Separador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
