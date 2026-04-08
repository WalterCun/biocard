import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";
import { PWAInstaller } from "@/components/PWAInstaller";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BioCard - Link in Bio + Tarjeta Digital",
  description:
    "La plataforma todo-en-uno para creadores y negocios en Latinoamérica",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={inter.className}>
        <Providers>
          <PWAInstaller />
          {children}
        </Providers>
      </body>
    </html>
  );
}
