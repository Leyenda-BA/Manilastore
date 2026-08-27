import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formulario } from "../formulario/formulario";
import { CarritoService, ItemCarrito } from '../servicios/carrito';

@Component({
  selector: 'app-carrito',
  imports: [Formulario, CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {
  items: ItemCarrito[] = [];

  constructor(private carrito: CarritoService) {}

  ngOnInit(): void {
    this.carrito.items$.subscribe(items => this.items = items);
  }

  quitar(nombre: string) {
    this.carrito.quitar(nombre);
  }

  get total() {
    return this.carrito.total();
  }
  incrementar(nombre: string) {
  this.carrito.incrementar(nombre);
}

decrementar(nombre: string) {
  this.carrito.decrementar(nombre);
}
}