import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCardIcon, Eye } from "lucide-react";
import { Send } from "lucide-react";
import AppLogo from "@/components/ui/app-logo";

export default function Form() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <AppLogo size="md" />

        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-black">
            Bienvenue sur Pegase
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Entrez les informations suivantes afin d'accéder à votre compte.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <Button variant={"roam"} className="w-full rounded-lg h-12">
            Suivant
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
