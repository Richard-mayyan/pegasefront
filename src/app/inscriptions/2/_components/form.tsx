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
        <div className="">
          <h2 className="text-xl font-bold text-black">
            Nous avons envoyé un code.
          </h2>
          <h2 className="text-xl font-bold text-black">Entrez-le !</h2>
          <p className="text-gray-600 font-semibold text-xs leading-relaxed">
            Entrez le code envoyé à adresse@mail.com dans le champ suivant pour
            vérifier votre compte
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Email Field */}
          <Input
            type="email"
            placeholder="Adresse email"
            className="bg-gray-100 border-0 rounded-lg h-12 placeholder:text-gray-500"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg h-12 text-base font-medium mt-6"
          >
            Continuer
          </Button>
        </form>

        {/* Footer */}
        <div className="space-y-4 text-center">
          <p className="text-xs text-gray-600">
            Vous n’avez pas reçu de mail ? Verifiez vos spams pour{" "}
            <span className="underline font-semibold">Reésayer</span>
          </p>

          <p className="text-sm text-gray-700 font-bold">
            J'ai déjà un compte.{" "}
            <Link
              href="/login"
              className="text-teal-600 hover:text-teal-700 font-medium underline"
            >
              Connectez-vous !
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
