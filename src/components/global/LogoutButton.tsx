import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "../layouts/AuthProvider";

type Props = {};

function LogoutButton({}: Props) {
  const context = useAuth();
  return <Button onClick={() => context.logout()}>Déconnexion</Button>;
}

export default LogoutButton;
