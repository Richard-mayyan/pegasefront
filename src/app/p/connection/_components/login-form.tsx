import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Zap, EyeOff } from "lucide-react";

export default function LoginForm() {
  return (
    <Card className="w-full max-w-md rounded-xl shadow-lg p-6">
      <CardHeader className="flex flex-col items-center gap-4 pb-6">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-teal-600" />
          <span className="text-2xl font-bold">Pegase</span>
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Content de vous revoir
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email-login" className="sr-only">
            Adresse email
          </Label>
          <Input id="email-login" placeholder="Adresse email" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password-login" className="sr-only">
            Mot de passe
          </Label>
          <div className="relative">
            <Input
              id="password-login"
              placeholder="Mot de passe"
              type="password"
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
            >
              <EyeOff className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>
          <a href="#" className="text-sm underline text-left block">
            Mot de passe oublié ?
          </a>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 pt-6">
        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 text-lg rounded-lg">
          Accéder à ma classe
        </Button>
        <p className="text-xs text-gray-500 text-center">
          En créant votre compte, vous acceptez nos termes et conditions.
        </p>
        <p className="text-sm text-center font-bold">
          Nouveau chez Pegase ?{" "}
          <a
            href="#"
            className="text-teal-600 hover:underline font-semibold underline"
          >
            Commencez gratuitement!
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
