import React from "react";
import { CoachingsDataProvider } from "@/components/layouts/CoachingsDataProvider";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return <CoachingsDataProvider>{children}</CoachingsDataProvider>;
}

export default layout;
