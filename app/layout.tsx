import { AdminNavbar } from "@/components/Navbar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cafe Admin Dummy",
  description: "Created by WYZARD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AdminNavbar/>
        {children}
      </body>
    </html>
  );
}
