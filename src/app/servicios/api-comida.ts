import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Comida } from '../entidades/comida';

@Injectable({ providedIn: 'root' })
export class ApiComida {
    private baseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php';

    constructor(private http: HttpClient) {}

    recibirDatos(): Observable<Comida[]> {
        const letras = 'abcdefghijklmnopqrstuvwxyz'.split('');

        const peticiones = letras.map(letra =>
        this.http.get<{ meals: any[] }>(`${this.baseUrl}?f=${letra}`).pipe(
        map(res => res.meals || []),
        catchError(() => of([]))
        )
    );

        return forkJoin(peticiones).pipe(
        map(resultados => resultados.flat().map(m => this.mapearComida(m)))
    );
    }

    private mapearComida(m: any): Comida {
        const ingredientes: string[] = [];
        for (let i = 1; i <= 20; i++) {
        const ing = m[`strIngredient${i}`];
        if (ing && ing.trim()) ingredientes.push(ing.trim());
        }
        return {
        nombre: m.strMeal,
        imagen: m.strMealThumb,
        categoria: m.strCategory,
        ingredientes,
        precio: this.generarPrecioAleatorio(30000, 100000)
        };
    }

    private generarPrecioAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    obtenerAleatoria(): Observable<Comida> {
        return this.http.get<{ meals: any[] }>('https://www.themealdb.com/api/json/v1/1/random.php').pipe(
        map(res => this.mapearComida(res.meals[0]))
    );
    }
    obtenerVariasAleatorias(cantidad: number): Observable<Comida[]> {
    const peticiones = Array.from({ length: cantidad }, () => this.obtenerAleatoria());
    return forkJoin(peticiones);
    }
}