"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/src/features/common/components/Button";
import { FormCard } from "@/src/features/common/components/FormCard";
import { ErrorCampo, Input, Select, Textarea } from "@/src/features/common/components/Input";
import { formatearPrecio } from "@/src/features/common/format";
import { useProductos } from "@/src/features/productos/hooks/useProductos";
import { useCrearPedido } from "../hooks/usePedidos";
import type { TipoCliente } from "../domain/types";

type Campo = "productoId" | "cantidad" | "telefono" | "tipoCliente" | "terminos";
// Lee ?producto=ID de la URL. La "key" hace que el formulario se vuelva a crear
// cada vez que cambia el producto, así siempre aparece seleccionado el correcto.
export function PedidoForm() {
  const searchParams = useSearchParams();
  const productoUrl = searchParams.get("producto") ?? "";
  return <FormularioPedido key={productoUrl || "ninguno"} productoInicial={productoUrl} />;
}

// El formulario de la Entrega 1, ahora guardando de verdad en la base de datos
function FormularioPedido({ productoInicial }: { productoInicial: string }) {
  const { productos, loading: cargandoProductos } = useProductos({ page: 1, limit: 50 });
  
  const { crear, enviando, error, fieldErrors } = useCrearPedido();
  
  const [productoId, setProductoId] = useState(productoInicial);
  const [cantidad, setCantidad] = useState("1");
  const [telefono, setTelefono] = useState("");
  const [tipoCliente, setTipoCliente] = useState<TipoCliente | "">("");
  const [mensaje, setMensaje] = useState("");
  const [terminos, setTerminos] = useState(false);
  const [errores, setErrores] = useState<Partial<Record<Campo, string>>>({});
  const [exito, setExito] = useState<string | null>(null);

  function validar() {
    const e: Partial<Record<Campo, string>> = {};
    if (!productoId) e.productoId = "Seleccione un producto.";
    const n = Number(cantidad);
    if (!Number.isInteger(n) || n < 1 || n > 100) e.cantidad = "La cantidad debe estar entre 1 y 100.";
    if (!/^[0-9]{7,10}$/.test(telefono.trim())) e.telefono = "Ingrese un teléfono válido de 7 a 10 dígitos.";
    if (!tipoCliente) e.tipoCliente = "Debe seleccionar un tipo de cliente.";
    if (!terminos) e.terminos = "Debe aceptar los términos y condiciones.";
    return e;
  }

  function limpiar() {
    setProductoId("");
    setCantidad("1");
    setTelefono("");
    setTipoCliente("");
    setMensaje("");
    setTerminos(false);
    setErrores({});
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setExito(null);
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0 || !tipoCliente) return;

    const pedido = await crear({
      productoId: Number(productoId),
      cantidad: Number(cantidad),
      telefono: telefono.trim(),
      tipoCliente,
      mensaje: mensaje.trim() || null,
    });
    if (pedido) {
      limpiar();
      setExito(`¡Pedido #${pedido.id} creado con éxito! Te contactaremos para confirmarlo.`);
    }
  }

  const err = (campo: Campo) => errores[campo] ?? fieldErrors[campo];

  return (
    <FormCard titulo="Hacer un pedido" subtitulo="Completa los siguientes datos y nos comunicaremos contigo.">
      <form onSubmit={onSubmit} noValidate>
        <Select label="Producto" name="productoId" value={productoId} onChange={(e) => setProductoId(e.target.value)} error={err("productoId")} disabled={cargandoProductos}>
          <option value="">{cargandoProductos ? "Cargando productos..." : "Seleccione un producto"}</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} ({p.marca}) – {formatearPrecio(p.precio)}
            </option>
          ))}
        </Select>
        <Input label="Cantidad" name="cantidad" type="number" min={1} max={100} value={cantidad} onChange={(e) => setCantidad(e.target.value)} error={err("cantidad")} />
        <Input label="Teléfono" name="telefono" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} error={err("telefono")} />
        <Select label="Tipo de cliente" name="tipoCliente" value={tipoCliente} onChange={(e) => setTipoCliente(e.target.value as TipoCliente | "")} error={err("tipoCliente")}>
          <option value="">Seleccione una opción</option>
          <option value="Cliente">Cliente</option>
          <option value="Revendedor">Revendedor</option>
        </Select>
        <Textarea label="Mensaje" name="mensaje" rows={4} placeholder="Escriba aquí su mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />

        <div className="flex items-center gap-2">
          <input id="terminos" type="checkbox" checked={terminos} onChange={(e) => setTerminos(e.target.checked)} className="h-4 w-4 accent-rosa" />
          <label htmlFor="terminos">Acepto los términos y condiciones</label>
        </div>
        <ErrorCampo mensaje={err("terminos")} />

        {error && Object.keys(fieldErrors).length === 0 && <ErrorCampo mensaje={error} />}

        <div className="mt-2 flex flex-wrap gap-3">
          <Button type="submit" disabled={enviando}>{enviando ? "Enviando..." : "Enviar pedido"}</Button>
          <Button type="button" variante="secundario" onClick={limpiar}>Limpiar</Button>
        </div>

        {exito && (
          <div className="mt-6 rounded-xl border border-exito-borde bg-exito-fondo p-4 text-center text-gris-oscuro" role="status">
            {exito}{" "}
            <Link href="/mis-pedidos" className="font-semibold text-rosa-hover underline">Ver mis pedidos</Link>
          </div>
        )}
      </form>
    </FormCard>
  );
}
