export type Categoria = "maquillaje" | "capilar";

export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  categoria: Categoria;
  precio: number;
  imagen: string;
  descripcion: string | null;
}

export interface ProductoInput {
  nombre: string;
  marca: string;
  categoria: Categoria;
  precio: number;
  imagen: string;
  descripcion: string | null;
}
export interface FiltrosProductos {
  page?: number;
  limit?: number;
  marca?: string;
  categoria?: Categoria;
  q?: string;
  minPrecio?: number;
  maxPrecio?: number;
}
