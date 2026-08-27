import { Component } from '@angular/core';
import { Carrusel } from '../carrusel/carrusel';
import { Informacion } from '../informacion/informacion';
import { Contacto } from '../contacto/contacto';
import { Recomendado } from '../recomendado/recomendado';

@Component({
  selector: 'app-inicio',
  imports: [Carrusel, Informacion, Contacto, Recomendado],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {}
