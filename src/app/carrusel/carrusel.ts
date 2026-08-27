import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ApiComida } from '../servicios/api-comida';
import { ApiBebidas } from '../servicios/api-bebidas';

interface ItemCarrusel {
  nombre: string;
  imagen: string;
  frase: string;
}

@Component({
  selector: 'app-carrusel',
  imports: [CommonModule],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.css',
})
export class Carrusel implements OnInit {
  items: ItemCarrusel[] = [];

  private frases = [
    'Sabores en su máxima expresión',
    'El arte de comer bien',
    'Textura, aroma y elegancia',
    'Alta cocina en cada bocado',
    'Una experiencia para el paladar',
    'Simplicidad elevada a la perfección'
  ];

  constructor(
    private apiComida: ApiComida,
    private apiBebidas: ApiBebidas,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    forkJoin({
      comidas: this.apiComida.obtenerVariasAleatorias(6),
      bebidas: this.apiBebidas.obtenerVariasAleatorias(6)
    }).subscribe(({ comidas, bebidas }) => {
      const alternado: ItemCarrusel[] = [];
      for (let i = 0; i < 6; i++) {
        alternado.push({ nombre: comidas[i].nombre, imagen: comidas[i].imagen, frase: this.frases[i] });
        alternado.push({ nombre: bebidas[i].nombre, imagen: bebidas[i].imagen, frase: this.frases[i] });
      }
      this.items = [...alternado, ...alternado];
      this.cd.detectChanges();
    });
  }
}