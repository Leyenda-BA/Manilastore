import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Separador } from "../separador/separador";
import { BuscadorB } from '../buscador-b/buscador-b';
import { ApiBebidas } from '../servicios/api-bebidas';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../servicios/carrito';
import { Router } from '@angular/router';
import { Bebida } from '../entidades/bebida';

@Component({
  selector: 'app-bebidas',
  imports: [Separador, BuscadorB, CommonModule],
  templateUrl: './bebidas.html',
  styleUrl: './bebidas.css',
})
export class Bebidas implements OnInit {
  datosApi: Bebida[] = [];
  datosFiltrados: Bebida[] = [];
  detallesBebida: Bebida | null = null;
  private terminoNombre = '';
  private terminoIngrediente = '';
  private tipoActivo = '';
  private categoriaActiva = '';

  constructor(
    private ApiBebidas: ApiBebidas,
    private zone: NgZone,
    private carrito: CarritoService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.VerApi();
  }

  VerApi() {
    this.ApiBebidas.recibirDatos().subscribe(bebidas => {
      this.zone.run(() => {
        this.datosApi = bebidas;
        this.datosFiltrados = bebidas;
        this.cd.detectChanges();
      });
    });
  }

  private aplicarFiltros() {
    this.datosFiltrados = this.datosApi.filter(b =>
      (!this.tipoActivo || b.tipo === this.tipoActivo) &&
      (!this.categoriaActiva || b.categoria === this.categoriaActiva) &&
      (!this.terminoNombre || b.nombre?.toLowerCase().includes(this.terminoNombre)) &&
      (!this.terminoIngrediente || b.ingredientes.some(i => i.toLowerCase().includes(this.terminoIngrediente)))
    );
  }

  buscarPorNombre(termino: string) {
    this.terminoNombre = termino.toLowerCase();
    this.aplicarFiltros();
  }

  buscarPorIngrediente(termino: string) {
    this.terminoIngrediente = termino.toLowerCase();
    this.aplicarFiltros();
  }

  filtrarPorTipo(tipo: string) {
    this.tipoActivo = tipo;
    this.aplicarFiltros();
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaActiva = categoria;
    this.aplicarFiltros();
  }

  agregarAlCarrito(bebida: Bebida) {
    this.carrito.agregar({ nombre: bebida.nombre, imagen: bebida.imagen, precio: bebida.precio });
    alert(`${bebida.nombre} agregado al carrito`);
  }
  
verDetalles(bebida: Bebida){
    this.detallesBebida = bebida;
  }
}