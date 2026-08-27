import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Separador } from "../separador/separador";
import { BuscadorC } from "../buscador-c/buscador-c";
import { ApiComida } from '../servicios/api-comida';
import { CarritoService } from '../servicios/carrito';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Comida } from '../entidades/comida';

@Component({
  selector: 'app-comidas',
  imports: [Separador, BuscadorC, CommonModule],
  templateUrl: './comidas.html',
  styleUrl: './comidas.css',
})
export class Comidas implements OnInit {
  datosApi: Comida[] = [];
  datosFiltrados: Comida[] = [];
  categorias: string[] = [];
  categoriaActiva = '';
  detallesComida: Comida | null = null;

  constructor(
    private ApiComida: ApiComida,
    private zone: NgZone,
    private carrito: CarritoService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.VerApi();
  }

  VerApi() {
    this.ApiComida.recibirDatos().subscribe(comidas => {
      this.zone.run(() => {
        this.datosApi = comidas;
        this.categorias = [...new Set(comidas.map(c => c.categoria).filter(Boolean))];
        this.categoriaActiva = this.categorias[0] ?? '';
        this.filtrarPorCategoria(this.categoriaActiva);
        this.cd.detectChanges();
      });
    });
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaActiva = categoria;
    this.datosFiltrados = this.datosApi.filter(c => c.categoria === categoria);
  }

  buscarPorNombre(termino: string) {
    if (!termino) { this.filtrarPorCategoria(this.categoriaActiva); return; }
    this.datosFiltrados = this.datosApi.filter(c =>
      c.nombre?.toLowerCase().includes(termino.toLowerCase())
    );
  }

  buscarPorIngrediente(termino: string) {
    if (!termino) { this.filtrarPorCategoria(this.categoriaActiva); return; }
    const t = termino.toLowerCase();
    this.datosFiltrados = this.datosApi.filter(c =>
      c.ingredientes.some(ing => ing.toLowerCase().includes(t))
    );
  }

  agregarAlCarrito(comida: Comida) {
    this.carrito.agregar({ nombre: comida.nombre, imagen: comida.imagen, precio: comida.precio });
    this.router.navigate(['/Carrito']);
    alert(`${comida.nombre} agregado al carrito`);
  }
  verDetalles(comida: Comida){
    this.detallesComida = comida;
  }
}