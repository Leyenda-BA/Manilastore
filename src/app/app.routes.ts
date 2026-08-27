import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Juego } from './juego/juego';
import { Menu } from './menu/menu';
import { Carrito } from './carrito/carrito';
import { Comidas } from './comidas/comidas';
import { Bebidas } from './bebidas/bebidas';

export const routes: Routes = [
    { path: '', component: Inicio },
    { path: 'Juego', component: Juego },
    {path: 'Menu' , component: Menu},
    {path: 'Carrito' , component: Carrito},
    {path: 'Comidas' , component: Comidas},
    {path: 'Bebidas' , component: Bebidas}
];
