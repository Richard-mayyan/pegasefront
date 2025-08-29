import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/lib/constants";
import { Mail } from "lucide-react";

export default function PasswordResetConfirmation() {
  return (
    <Card className="w-full max-w-md rounded-xl shadow-lg p-6 text-center">
      <CardHeader className="flex flex-col items-center gap-4 pb-6">
        <div className="bg-customBg p-4 rounded-full">
          <Mail className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold">
          Jetez un coup d'œil à votre boîte mail.
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-700">
          Nous avons envoyé un lien à votre adresse mail{" "}
          {/* <span className="font-semibold">adressegmail.com</span>{" "} */}
        </p>
        <p className="text-sm text-gray-700">
          Cliquez dessus afin de restaurer votre mot de passe.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 pt-6">
        <p className="text-sm">
          Je me souviens du mot de passe{" "}
          <a
            href={ROUTES.connection}
            className="text-customBg hover:underline font-semibold"
          >
            Connectez-vous!
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
