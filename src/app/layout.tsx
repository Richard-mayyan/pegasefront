import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import Link from "next/link";
import { Navbar } from "../components/layouts/navbar";

import DepsLayout from "../components/layouts/depsLayout";
import { AppQueryProvider } from "./QueryProvider";
import { Toaster } from "sonner";

import "../../i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PEGAS",
  description: "Gestion de la salle de sport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppQueryProvider>
          <DepsLayout>{children}</DepsLayout>
        </AppQueryProvider>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
