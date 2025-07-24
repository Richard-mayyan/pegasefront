import SignUpform from "@/components/forms/signup/signup-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SignupPart({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
          <CardDescription>
            rekoerfnoer
            {/* Créez des réseaux avec des personnes du monde entier,
                        rejoignez des groupes, créez le vôtre. Suivez des cours
                        et devenez la meilleure version de vous-même */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpform />
          {/* 
          <div className="w-fit mx-auto my-8">
            <Button className="uppercase " variant={"ghost"}>
              Or Continue with
            </Button>
          </div>

          <div className="w-full h-1"></div> */}
          {/* <GoogleAuthButton method={"signup"} /> */}
        </CardContent>
      </Card>
    </div>
  );
}
