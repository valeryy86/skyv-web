import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/src/features/auth/hooks/useAuth";
import { Navbar } from "@/src/features/common/components/Navbar";
import { Footer } from "@/src/features/common/components/Footer";

const exo = Exo_2({ subsets: ["latin"], variable: "--font-exo-2" });

export const metadata: Metadata = {
  title: "Sky V Cosmetics",
  description: "Tienda virtual de cosméticos: maquillaje y productos capilares de tus marcas favoritas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={exo.variable}>
      <body className="flex min-h-screen flex-col font-exo antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 pt-28 pb-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
