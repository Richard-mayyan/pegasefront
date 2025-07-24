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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Video, FileText, Pencil, Link, File, Info } from "lucide-react";

export default function AddLessonForm() {
  return (
    <Card className="w-full max-w-lg rounded-xl shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">Ajouter une leçon</CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="lesson-title">Titre de la leçon</Label>
          <Input id="lesson-title" placeholder="Leçon" />
          <p className="text-sm text-muted-foreground">30/50</p>
        </div>

        <ToggleGroup defaultValue="video" className="grid grid-cols-2 gap-4">
          <ToggleGroupItem
            value="video"
            aria-label="Toggle video"
            className="h-24 w-full bg-teal-600 text-white flex flex-col items-center justify-center gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <Video className="h-6 w-6" />
            Vidéo
          </ToggleGroupItem>
          <ToggleGroupItem
            value="text"
            aria-label="Toggle text"
            className="h-24 w-full flex flex-col items-center justify-center gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <FileText className="h-6 w-6" />
            Texte
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="space-y-2">
          <Label htmlFor="video-link">Video Link</Label>
          <Input id="video-link" placeholder="Link" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pencil className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="transcribe-video">Transcrire la Vidéo</Label>
          </div>
          <Switch className=" " id="transcribe-video" defaultChecked />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resources">Resources</Label>
          <Select>
            <SelectTrigger id="resources">
              <SelectValue placeholder="Cliquez pour choisir" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="link">Lien</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="information">Information</SelectItem>
            </SelectContent>
          </Select>
          <div className="grid gap-2 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link className="h-4 w-4" />
              Lien
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <File className="h-4 w-4" />
              Document
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              Information
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Annuler</Button>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 w-full">
          Ajouter la leçon
        </Button>
      </CardFooter>
    </Card>
  );
}
