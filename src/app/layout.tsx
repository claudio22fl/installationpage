import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuAppBar from "./component/AppBar";
import MiniDrawer from "./component/AppBar";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instalaciones",
  description: "Control de instalaciones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <MiniDrawer children={children} />
      </body>
    </html>
  );
}
