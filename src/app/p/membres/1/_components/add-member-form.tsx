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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export default function AddMemberForm() {
  return (
    <Card className="w-full max-w-md rounded-xl shadow-lg p-6">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">Ajouter un membre</CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="member-name" className="sr-only">
              Nom
            </Label>
            <Input id="member-name" placeholder="Nom du membre" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="member-firstname" className="sr-only">
              Prénom
            </Label>
            <Input id="member-firstname" placeholder="Prénom du membre" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="member-email" className="sr-only">
            Adresse mail
          </Label>
          <Input id="member-email" placeholder="Email du membre" type="email" />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="message-access" className="text-base font-medium">
            Accès au message
          </Label>
          <Switch id="message-access" defaultChecked />
        </div>

        <div className="space-y-2">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Étudiant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Étudiant</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="coach">Coach</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Annuler</Button>
        <Button className="bg-customBg hover:bg-customBg-hover text-white">
          Ajouter le membre
        </Button>
      </CardFooter>
    </Card>
  );
}
