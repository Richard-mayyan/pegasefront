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
import { useState } from "react";

interface AddLessonFormProps {
  onClose: () => void;
  onSave: (lessonData: {
    title: string;
    type: "video" | "text";
    videoLink?: string;
    transcribeVideo: boolean;
    resources: string[];
  }) => void;
  initialData?: {
    title: string;
    type: "video" | "text";
    videoLink?: string;
    transcribeVideo: boolean;
    resources: string[];
  };
  isEditing?: boolean;
}

export default function AddLessonForm({
  onClose,
  onSave,
  initialData,
  isEditing = false,
}: AddLessonFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [type, setType] = useState<"video" | "text">(
    initialData?.type || "video"
  );
  const [videoLink, setVideoLink] = useState(initialData?.videoLink || "");
  const [transcribeVideo, setTranscribeVideo] = useState(
    initialData?.transcribeVideo || false
  );
  const [resources, setResources] = useState<string[]>(
    initialData?.resources || []
  );

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      type,
      videoLink: type === "video" ? videoLink : undefined,
      transcribeVideo,
      resources,
    });
  };

  return (
    <Card className="w-full max-w-lg rounded-xl shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">
          {isEditing ? "Modifier la leçon" : "Ajouter une leçon"}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="lesson-title">Titre de la leçon</Label>
          <Input
            id="lesson-title"
            placeholder="Leçon"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">{title.length}/50</p>
        </div>

        <ToggleGroup
          value={type}
          onValueChange={(value) => value && setType(value as "video" | "text")}
          className="grid grid-cols-2 gap-4"
        >
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

        {type === "video" && (
          <div className="space-y-2">
            <Label htmlFor="video-link">Lien de la vidéo</Label>
            <Input
              id="video-link"
              placeholder="Lien"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pencil className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="transcribe-video">Transcrire la Vidéo</Label>
          </div>
          <Switch
            id="transcribe-video"
            checked={transcribeVideo}
            onCheckedChange={setTranscribeVideo}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resources">Ressources</Label>
          <Select
            onValueChange={(value) => {
              if (value && !resources.includes(value)) {
                setResources([...resources, value]);
              }
            }}
          >
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
            {resources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  {resource === "link" && <Link className="h-4 w-4" />}
                  {resource === "document" && <File className="h-4 w-4" />}
                  {resource === "information" && <Info className="h-4 w-4" />}
                  {resource}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setResources(resources.filter((_, i) => i !== index))
                  }
                  className="h-4 w-4 p-0 text-red-500 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 w-full"
          onClick={handleSave}
          disabled={!title.trim()}
        >
          {isEditing ? "Modifier la leçon" : "Ajouter la leçon"}
        </Button>
      </CardFooter>
    </Card>
  );
}
