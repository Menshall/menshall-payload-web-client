import React from "react";
import Header from "@/_components/Header";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../../_components/Footer"), {
  ssr: false,
});

const FloatButton = dynamic(() => import("../../_components/FloatButton"), {
  ssr: false,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="grid-container grid-content-full">{children}</main>
      <Footer />
      <FloatButton />
    </>
  );
}
