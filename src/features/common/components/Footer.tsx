import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const enlace = "text-gris transition hover:text-rosa-hover";
  return (
    <footer className="grid grid-cols-1 gap-10 border-t border-rosa bg-fondo-header px-6 pt-10 pb-5 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-12">
      <div className="flex flex-col items-center">
        <Image src="/img/logoSkyV.jpeg" alt="Logo de Sky V Cosmetics" width={80} height={80} className="h-20 w-20 rounded-full object-cover" />
        <h2 className="mt-2 text-xl font-semibold text-rosa">Sky V Cosmetics</h2>
      </div>

      <nav aria-label="Navegación del footer">
        <h3 className="mb-5 text-xl font-semibold text-rosa">Explora</h3>
        <ul className="flex flex-col gap-2.5">
          <li><Link href="/" className={enlace}>Inicio</Link></li>
          <li><Link href="/catalogo" className={enlace}>Catálogo</Link></li>
          <li><Link href="/#marcas" className={enlace}>Marcas</Link></li>
          <li><Link href="/pedido" className={enlace}>Hacer pedido</Link></li>
        </ul>
      </nav>

      <section>
        <h3 className="mb-5 text-xl font-semibold text-rosa">Síguenos</h3>
        <ul className="flex flex-col gap-2.5">
          <li><a href="https://www.instagram.com/skyv_cosmetics/" target="_blank" rel="noopener noreferrer" className={enlace}>Instagram</a></li>
          <li><a href="https://www.facebook.com/profile.php?id=100047904860741&locale=es_LA" target="_blank" rel="noopener noreferrer" className={enlace}>Facebook</a></li>
          <li><a href="https://wa.me/+573225962383" target="_blank" rel="noopener noreferrer" className={enlace}>WhatsApp</a></li>
        </ul>
      </section>

      <address className="flex flex-col gap-2.5 not-italic text-gris">
        <p className="mb-2.5 text-xl font-semibold text-rosa">Contáctanos</p>
        <p>Estamos aquí para ayudarte.</p>
        <a href="mailto:vale@skyvcosmetics.com" className={enlace}>vale@skyvcosmetics.com</a>
        <a href="https://wa.me/+573225962383" target="_blank" rel="noopener noreferrer" className={enlace}>+57 322 596 2383</a>
      </address>

      <div className="col-span-full border-t border-rosa pt-5 text-center">
        <p className="text-sm text-[#999]">2026 Sky V Cosmetics. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
