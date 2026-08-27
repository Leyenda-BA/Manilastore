import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiComida } from '../servicios/api-comida';
import { ApiBebidas } from '../servicios/api-bebidas';
import { CarritoService } from '../servicios/carrito';
import { Comida } from '../entidades/comida';
import { Bebida } from '../entidades/bebida';
import { Bebidas } from '../bebidas/bebidas';

@Component({
  selector: 'app-recomendado',
  imports: [CommonModule],
  templateUrl: './recomendado.html',
  styleUrl: './recomendado.css',
})
export class Recomendado implements OnInit {
  platoRecomendado: Comida | null = null;
  coctelRecomendado: Bebida | null = null;
  itemSeleccionado: Comida | Bebida | null = null;

  constructor(
    private apiComida: ApiComida,
    private apiBebidas: ApiBebidas,
    private carrito: CarritoService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.apiComida.obtenerAleatoria().subscribe(c => {
      this.platoRecomendado = c;
      this.cd.detectChanges();
    });

    this.apiBebidas.obtenerAleatoria().subscribe(b => {
      this.coctelRecomendado = b;
      this.cd.detectChanges();
    });
  }

  verDetalles(item: Comida | Bebida) {
    this.itemSeleccionado = item;
  }

  agregarAlCarrito(item: Comida | Bebida) {
    this.carrito.agregar({ nombre: item.nombre, imagen: item.imagen, precio: item.precio });
    this.router.navigate(['/Carrito']);
    alert(`${item.nombre} agregado al carrito`);
  }
}
