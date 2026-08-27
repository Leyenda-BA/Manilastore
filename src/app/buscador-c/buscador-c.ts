import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador-c',
  imports: [FormsModule],
  templateUrl: './buscador-c.html',
  styleUrl: './buscador-c.css',
})
export class BuscadorC {
  @Output() buscarNombre = new EventEmitter<string>();
  @Output() buscarIngrediente = new EventEmitter<string>();

  nombre = '';
  ingrediente = '';

  onBuscarNombre() { this.buscarNombre.emit(this.nombre.trim()); }
  onBuscarIngrediente() { this.buscarIngrediente.emit(this.ingrediente.trim()); }
}