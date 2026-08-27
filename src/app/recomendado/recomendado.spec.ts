import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recomendado } from './recomendado';

describe('Recomendado', () => {
  let component: Recomendado;
  let fixture: ComponentFixture<Recomendado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recomendado],
    }).compileComponents();

    fixture = TestBed.createComponent(Recomendado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
