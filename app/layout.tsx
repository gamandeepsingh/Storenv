import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Storenv | Home",
  description: "Storenv is a platform for managing your environment variables",
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
          <Toaster position="bottom-center" />
          {children}
          </Suspense>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
