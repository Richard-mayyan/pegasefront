"use client";
import React from "react";
// import { DepsProvider } from "./useDeps";
import { Navbar } from "./navbar";
import { InMemoryAuthRepository } from "@/logic/infra/repos/InMemoryAuthRepo";
import Footer from "./footer";
import { USE_CASES } from "@/logic/infra/di/container";
import { AuthProvider } from "./AuthProvider";

type Props = {
  children: any;
};
// const clientRepo = new InMemoryClientRepository();
// const authRepo = new InMemoryAuthRepository();

export default function DepsLayout({ children }: Props) {
  return (
    // <DepsProvider >
    <AuthProvider>
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </AuthProvider>
    // </DepsProvider>
  );
}
