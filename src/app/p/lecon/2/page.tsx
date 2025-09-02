"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Lecon2Redirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/p/cours/2");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-customBg mx-auto mb-4"></div>
        <p className="text-gray-600">
          Redirection vers la nouvelle page des cours...
        </p>
      </div>
    </div>
  );
}
