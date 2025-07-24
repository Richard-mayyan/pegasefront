import SignInform from "@/components/forms/signin/signinform";
// import GoogleAuthButton from "@/components/global/google-auth-button"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LoginPart({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            Créez des réseaux avec des personnes du monde entier, rejoignez des
            groupes, créez le vôtre. Suivez des cours et devenez la meilleure
            version de vous-même
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <SignInform />

          {/* <div className="w-fit mx-auto my-8">
            <Button className="uppercase " variant={"ghost"}>
              Or Continue with
            </Button>
          </div>

          <div className="w-full h-1"></div>
          <GoogleAuthButton method={"signin"} /> */}
        </CardContent>
      </Card>
    </div>
  );
}
