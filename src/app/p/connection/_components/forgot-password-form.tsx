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
import { Zap } from "lucide-react";

export default function ForgotPasswordForm() {
  return (
    <Card className="w-full max-w-md rounded-xl shadow-lg p-6">
      <CardHeader className="flex flex-col items-center gap-4 pb-6">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-teal-600" />
          <span className="text-2xl font-bold">Pegase</span>
        </div>
        <CardTitle className="text-xl font-bold text-center">
          Entrez votre email afin de restaurer votre mot de passe
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email-forgot" className="sr-only">
            Adresse email
          </Label>
          <Input id="email-forgot" placeholder="Adresse email" type="email" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 pt-6">
        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 text-lg rounded-lg">
          Restaurer le mot de passe
        </Button>
        <p className="text-sm text-center ">
          <span className="font-bold">Je me souviens du mot de passe </span>
          <a
            href="#"
            className="text-teal-600 hover:underline font-semibold underline"
          >
            Connectez-vous!
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
