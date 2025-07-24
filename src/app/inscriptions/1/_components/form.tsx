import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import { Send } from "lucide-react";

export default function Signup() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
            <Send className="w-6 h-6 text-white rotate-45" />
          </div>
          <h1 className="text-2xl font-bold text-black">Pegase</h1>
        </div>

        {/* Welcome Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-black">
            Bienvenue sur Pegase
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Entrez les informations suivantes afin d'accéder à votre compte.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Name Fields Row */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Nom"
              className="bg-gray-100 border-0 rounded-lg h-12 placeholder:text-gray-500"
            />
            <Input
              type="text"
              placeholder="Prénom"
              className="bg-gray-100 border-0 rounded-lg h-12 placeholder:text-gray-500"
            />
          </div>

          {/* Email Field */}
          <Input
            type="email"
            placeholder="Adresse email"
            className="bg-gray-100 border-0 rounded-lg h-12 placeholder:text-gray-500"
          />

          {/* Password Field */}
          <div className="relative">
            <Input
              type="password"
              placeholder="Mot de passe"
              className="bg-gray-100 border-0 rounded-lg h-12 placeholder:text-gray-500 pr-12"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg h-12 text-base font-medium mt-6"
          >
            Créer ma classe
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>

        {/* Footer */}
        <div className="space-y-4 text-center">
          <p className="text-sm text-gray-600">
            En créant votre compte, vous acceptez nos termes et conditions.
          </p>

          <p className="text-sm text-gray-700">
            J'ai déjà un compte.{" "}
            <Link
              href="/login"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Connectez-vous !
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
