"use client";
import React from "react";
// import { DepsProvider } from "./useDeps";
import { Navbar } from "./navbar";
import Footer from "./footer";
import { AuthProvider } from "./AuthProvider";
import { AppDataProvider } from "./AppDataProvider";

type Props = {
  children: any;
};
// const clientRepo = new InMemoryClientRepository();
// const authRepo = new InMemoryAuthRepository();

export default function DepsLayout({ children }: Props) {
  return (
    // <DepsProvider >
    <AuthProvider>
      <AppDataProvider>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </AppDataProvider>
    </AuthProvider>
    // </DepsProvider>
  );
}
