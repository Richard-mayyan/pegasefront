"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export default function Lecon3Redirect() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page des cours car nous n'avons pas d'ID spécifique
    router.replace(ROUTES.modules);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-customBg mx-auto mb-4"></div>
        <p className="text-gray-600">Redirection vers la page des cours...</p>
      </div>
    </div>
  );
}
