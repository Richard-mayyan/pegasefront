import { ThemeProvider } from "@/admin/components/context/theme-context";
import AuthenticatedLayout from "@/admin/components/Layout";
import React from "react";

type Props = {
  children: any;
};

function layout({ children }: Props) {
  //   return <div>kjrfbk</div>;
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </ThemeProvider>
  );
}

export default layout;
