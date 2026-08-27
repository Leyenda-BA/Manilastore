import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Bebida } from '../entidades/bebida';

@Injectable({ providedIn: 'root' })
export class ApiBebidas {
    private urlBase = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

    constructor(private api: HttpClient) {}

    recibirDatos(): Observable<Bebida[]> {
        const letras = 'abcdefghijklmnopqrstuvwxyz'.split('');

        const peticiones = letras.map(letra =>
            this.api.get<{ drinks: any[] }>(`${this.urlBase}?f=${letra}`).pipe(
            map(res => res.drinks || []),
            catchError(() => of([]))
        )
    );

        return forkJoin(peticiones).pipe(
        map(resultados => resultados.flat().map(d => this.mapearBebida(d)))
        );
    }

    private mapearBebida(d: any): Bebida {
        const ingredientes: string[] = [];
        for (let i = 1; i <= 15; i++) {
        const ing = d[`strIngredient${i}`];
        if (ing && ing.trim()) ingredientes.push(ing.trim());
    }
    return {
        nombre: d.strDrink,
        imagen: d.strDrinkThumb,
        categoria: d.strCategory,
        tipo: d.strAlcoholic,
        ingredientes,
        precio: this.generarPrecioAleatorio(30000, 100000)
        };
    }

    private generarPrecioAleatorio(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    obtenerAleatoria(): Observable<Bebida> {
        return this.api.get<{ drinks: any[] }>('https://www.thecocktaildb.com/api/json/v1/1/random.php').pipe(
        map(res => this.mapearBebida(res.drinks[0]))
    );
}
    obtenerVariasAleatorias(cantidad: number): Observable<Bebida[]> {
        const peticiones = Array.from({ length: cantidad }, () => this.obtenerAleatoria());
        return forkJoin(peticiones);
}
}