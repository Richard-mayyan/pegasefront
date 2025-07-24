"use client";
import React from "react";
import { Navbar } from "./navbar";
import Footer from "./footer";

type Props = {
  children: any;
};

export default function ClientsLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
