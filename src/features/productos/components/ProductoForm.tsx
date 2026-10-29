"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/src/features/common/components/Button";
import { ErrorCampo, Input, Select, Textarea } from "@/src/features/common/components/Input";
import { todasLasMarcas } from "@/src/features/home/data/marcas";
import type { Categoria, Producto, ProductoInput } from "../domain/types";

interface ProductoFormProps {
  inicial?: Producto | null; 
  enviando: boolean;
  fieldErrors: Record<string, string>;
  error: string | null;
  onGuardar: (data: ProductoInput) => void;
  onCancelar: () => void;
}

export function ProductoForm({ inicial, enviando, fieldErrors, error, onGuardar, onCancelar }: ProductoFormProps) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? "");
  const [marca, setMarca] = useState(inicial?.marca ?? "");
  const [categoria, setCategoria] = useState<Categoria | "">(inicial?.categoria ?? "");
  const [precio, setPrecio] = useState(inicial ? String(inicial.precio) : "");
  const [imagen, setImagen] = useState(inicial?.imagen ?? "");
  const [descripcion, setDescripcion] = useState(inicial?.descripcion ?? "");
  const [errores, setErrores] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nuevos: Record<string, string> = {};
    if (nombre.trim().length < 2) nuevos.nombre = "El nombre debe tener al menos 2 caracteres.";
    if (!marca) nuevos.marca = "Seleccione una marca.";
    if (!categoria) nuevos.categoria = "Seleccione una categoría.";
    if (!Number.isInteger(Number(precio)) || Number(precio) <= 0) nuevos.precio = "Ingrese un precio entero mayor que 0.";
    if (!imagen.trim().startsWith("/") && !/^https?:\/\//.test(imagen.trim()))
      nuevos.imagen = "Use una ruta como /img/... o una URL http(s).";
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0 || !categoria) return;

    onGuardar({
      nombre: nombre.trim(),
      marca,
      categoria,
      precio: Number(precio),
      imagen: imagen.trim(),
      descripcion: descripcion.trim() || null,
    });
  }

  const err = (campo: string) => errores[campo] ?? fieldErrors[campo];

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[20px] border border-borde-claro bg-white p-6 shadow-[0_5px_20px_rgba(255,151,189,0.25)]">
      <h3 className="mb-4 text-xl font-semibold text-rosa">{inicial ? `Editar: ${inicial.nombre}` : "Nuevo producto"}</h3>
      <div className="grid gap-x-6 sm:grid-cols-2">
        <Input label="Nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} error={err("nombre")} />
        <Select label="Marca" name="marca" value={marca} onChange={(e) => setMarca(e.target.value)} error={err("marca")}>
          <option value="">Seleccione una marca</option>
          {todasLasMarcas.map((m) => (
            <option key={m.slug} value={m.slug}>{m.nombre}</option>
          ))}
        </Select>
        <Select label="Categoría" name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value as Categoria | "")} error={err("categoria")}>
          <option value="">Seleccione una categoría</option>
          <option value="maquillaje">Maquillaje</option>
          <option value="capilar">Capilar</option>
        </Select>
        <Input label="Precio (COP)" name="precio" type="number" min={1} value={precio} onChange={(e) => setPrecio(e.target.value)} error={err("precio")} />
      </div>
      <Input label="Imagen (ruta o URL)" name="imagen" placeholder="/img/productos_kaba/ShampooCebolla.png" value={imagen} onChange={(e) => setImagen(e.target.value)} error={err("imagen")} />
      <Textarea label="Descripción (opcional)" name="descripcion" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} error={err("descripcion")} />
      <ErrorCampo mensaje={Object.keys(fieldErrors).length === 0 ? error ?? undefined : undefined} />
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={enviando}>{enviando ? "Guardando..." : inicial ? "Guardar cambios" : "Crear producto"}</Button>
        <Button type="button" variante="secundario" onClick={onCancelar}>Cancelar</Button>
      </div>
    </form>
  );
}
