
export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Videojuego {
  id: number;
  titulo: string;
  categoriaId: number; // Para relacionarlo con la categoría
  precio: number;
  stock: number;
  imagen: string; // Una URL para mostrar la carátula y que quede profesional
}