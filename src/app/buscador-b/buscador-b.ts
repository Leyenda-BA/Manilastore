import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador-b',
  imports: [FormsModule],
  templateUrl: './buscador-b.html',
  styleUrl: './buscador-b.css',
})
export class BuscadorB {
  @Output() buscarNombre = new EventEmitter<string>();
  @Output() buscarIngrediente = new EventEmitter<string>();
  @Output() filtrarTipo = new EventEmitter<string>();
  @Output() filtrarCategoria = new EventEmitter<string>();

  nombre = '';
  ingrediente = '';

  onBuscarNombre() { this.buscarNombre.emit(this.nombre.trim()); }
  onBuscarIngrediente() { this.buscarIngrediente.emit(this.ingrediente.trim()); }
  onFiltrarTipo(valor: string) { this.filtrarTipo.emit(valor); }
  onFiltrarCategoria(valor: string) { this.filtrarCategoria.emit(valor); }
}
