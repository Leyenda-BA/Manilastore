export interface Bebida {
    nombre: string;
    imagen: string;
    categoria: string; // "Ordinary Drink" | "Cocktail"
    tipo: string;       // "Alcoholic" | "Non alcoholic"
    ingredientes: string[];
    precio: number;
}