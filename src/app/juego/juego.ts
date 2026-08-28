import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiComida } from '../servicios/api-comida';
import { ApiBebidas } from '../servicios/api-bebidas';
import { Comida } from '../entidades/comida';
import { Bebida } from '../entidades/bebida';

@Component({
  selector: 'app-juego',
  imports: [],
  templateUrl: './juego.html',
  styleUrl: './juego.css',
})
export class Juego implements OnInit {
  platoRecomendado: Comida | null = null;
  coctelRecomendado: Bebida | null = null;
  posicion1: number = 0;
  posicion2: number = 0;
  solucion1: boolean = false;
  solucion2: boolean = false;
  letrero2: string = "";

  constructor(
    private apiComida: ApiComida,
    private apiBebidas: ApiBebidas,
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
    this.posicion1 = Math.floor(Math.random() * 16) + 1;
    do {
      this.posicion2 = Math.floor(Math.random() * 16) + 1;
    } while (this.posicion2 === this.posicion1);
  }
reiniciar(){
  this.ngOnInit();
  this.letrero2 = "";
  this.solucion1 = false;
  this.solucion2 = false;

  for (let i = 1; i <= 16; i++) {
    const img = document.getElementById("mimg" + i) as HTMLImageElement;
    if (img) img.src = "imagenes/juego.jpg";
    img.style.width = "140px";
    img.style.height = "140px";
  }
}

  async descubre2(p: number) {
  const img = document.getElementById("mimg" + p) as HTMLImageElement;
  
  if (this.posicion1 == p) {
    img.src = this.platoRecomendado!.imagen;
    img.style.width = "140px";
    this.solucion1 = true;
  }else if (this.posicion2 == p) {
    img.src = this.coctelRecomendado!.imagen;
    img.style.width = "140px";
    img.style.height = "140px";
    this.solucion2 = true;
  } else {
    img.src = "imagenes/error.png";
    img.style.width = "140px";
    img.style.height = "140px";
  }

  if (this.solucion1 && this.solucion2) {
    this.letrero2 = "en hora buena";
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.reiniciar();
  }
}
  
}
