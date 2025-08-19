import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function NewChapterForm() {
  return (
    <Card className="w-full max-w-md rounded-xl shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">Nouveau chapitre</CardTitle>
        <div className="flex items-center space-x-2">
          <Label
            htmlFor="publish-mode"
            className="text-sm text-muted-foreground"
          >
            Non publié
          </Label>
          <Switch id="publish-mode" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="chapter-title">Chapitre</Label>
          <Input id="chapter-title" placeholder="Titre du chapitre" />
          <p className="text-sm text-muted-foreground">30/30</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Annuler</Button>
        {/* <Button>Ajouter le chapitre</Button> */}
        <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8">
          Ajouter le chapitre
        </Button>
      </CardFooter>
    </Card>
  );
}
