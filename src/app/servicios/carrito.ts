import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrito {
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items = new BehaviorSubject<ItemCarrito[]>([]);
  items$ = this.items.asObservable();

  agregar(item: Omit<ItemCarrito, 'cantidad'>) {
    const actuales = this.items.value;
    const existente = actuales.find(i => i.nombre === item.nombre);

    if (existente) {
      existente.cantidad++;
      this.items.next([...actuales]);
    } else {
      this.items.next([...actuales, { ...item, cantidad: 1 }]);
    }
  }

  quitar(nombre: string) {
    this.items.next(this.items.value.filter(i => i.nombre !== nombre));
  }

  obtenerItems(): ItemCarrito[] {
    return this.items.value;
  }

  limpiar() {
    this.items.next([]);
  }

  total(): number {
    return this.items.value.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
    
  }
  generarPrecioAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  incrementar(nombre: string) {
  const actuales = this.items.value;
  const item = actuales.find(i => i.nombre === nombre);
  if (item) {
    item.cantidad++;
    this.items.next([...actuales]);
  }
}

decrementar(nombre: string) {
  const actuales = this.items.value;
  const item = actuales.find(i => i.nombre === nombre);
  if (!item) return;

  if (item.cantidad > 1) {
    item.cantidad--;
    this.items.next([...actuales]);
  } else {
    this.quitar(nombre);
  }
}
}