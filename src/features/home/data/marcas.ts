export interface Marca {
  slug: string;
  nombre: string;
  logo: string;
}

export const marcasMaquillaje: Marca[] = [
  { slug: "atenea", nombre: "Atenea", logo: "/img/logosdemarcas/logoAtenea.png" },
  { slug: "bloomshell", nombre: "Bloomshell", logo: "/img/logosdemarcas/logoBloomshell.png" },
  { slug: "anik", nombre: "Ani-k", logo: "/img/logosdemarcas/logoAnik.png" },
  { slug: "montoc", nombre: "Montoc", logo: "/img/logosdemarcas/LogoMontoc.png" },
];

export const marcasCapilares: Marca[] = [
  { slug: "clickhair", nombre: "Click Hair", logo: "/img/logosdemarcas/logoClick.png" },
  { slug: "milagros", nombre: "Milagros", logo: "/img/logosdemarcas/logoMilagros.png" },
  { slug: "ole", nombre: "Olé", logo: "/img/logosdemarcas/logoOle.png" },
  { slug: "kaba", nombre: "Kaba", logo: "/img/logosdemarcas/logoKaba.png" },
];

export const todasLasMarcas: Marca[] = [...marcasMaquillaje, ...marcasCapilares];
