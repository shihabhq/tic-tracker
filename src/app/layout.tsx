import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Tic tracker",
  description: "Tic tac toe app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
