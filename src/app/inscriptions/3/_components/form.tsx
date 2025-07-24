import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCardIcon, Eye } from "lucide-react";
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
          <h2 className="text-3xl font-bold text-black">Créez votre classe</h2>
          <p className="text-gray-600 text-base leading-relaxed font-semibold">
            Profitez de 15 Jours gratuits, puis payez 50euros/mois sans
            engagement
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Email Field */}
          <div>
            <Input
              type="text"
              placeholder="Donnez un nom à votre classe"
              className="bg-gray-100 border-0 rounded-lg h-12 placeholder:text-gray-500"
            />
            <p className="font-medium text-xs">30/30</p>
          </div>

          <div className="space-y-4  ">
            <div className="relative border-2 rounded-xl">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <CreditCardIcon className="w-5 h-5" />
              </div>
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Numero de carte"
                  className="bg-gray-100 border-0 rounded-l-lg h-12 placeholder:text-gray-500 pl-12 flex-1 rounded-r-none border-gray-200"
                  maxLength={19}
                />
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="MM/AA"
                    className="bg-gray-100 border-0 h-12 placeholder:text-gray-500 w-20 rounded-none  border-gray-200"
                    maxLength={5}
                  />
                  <Input
                    type="text"
                    placeholder="CCV"
                    className="bg-gray-100 border-0 rounded-r-lg h-12 placeholder:text-gray-500 w-16 rounded-l-none"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg h-12 text-base font-medium mt-6"
          >
            Commencer gratuitement
          </Button>
        </form>

        {/* Footer */}
        <div className="space-y-4 text-center">
          <p className="text-sm text-gray-600">
            Nous vous informeront 3 jours avant le 20 Juin 2025 pour le payement
            de votre premier mois. En savoir plus sur nos termes
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
