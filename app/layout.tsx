import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="">
          <Navbar />
          <Suspense fallback={<Loading/>}>
          {children}
          </Suspense>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
