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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Video,
  FileText,
  Pencil,
  Link,
  File,
  Info,
  Plus,
} from "lucide-react";
import { useState } from "react";

interface Resource {
  type: "link" | "document" | "information";
  content: string;
  title: string;
}

interface AddLessonFormProps {
  onClose: () => void;
  onSave: (lessonData: {
    title: string;
    type: "video" | "text";
    videoLink?: string;
    transcribeVideo: boolean;
    textContent?: string;
    resources: Resource[];
  }) => void;
  initialData?: {
    title: string;
    type: "video" | "text";
    videoLink?: string;
    transcribeVideo: boolean;
    textContent?: string;
    resources: Resource[];
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
  const [textContent, setTextContent] = useState(
    initialData?.textContent || ""
  );
  const [resources, setResources] = useState<Resource[]>(
    initialData?.resources || []
  );
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [newResource, setNewResource] = useState<{
    type: "link" | "document" | "information";
    content: string;
    title: string;
  }>({
    type: "link",
    content: "",
    title: "",
  });

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      type,
      videoLink: type === "video" ? videoLink : undefined,
      transcribeVideo,
      textContent: type === "text" ? textContent : undefined,
      resources,
    });
  };

  const addResource = () => {
    if (newResource.content.trim() && newResource.title.trim()) {
      setResources([...resources, { ...newResource }]);
      setNewResource({ type: "link", content: "", title: "" });
      setShowResourceForm(false);
    }
  };

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const getResourceIcon = (resourceType: string) => {
    switch (resourceType) {
      case "link":
        return <Link className="h-4 w-4 text-blue-600" />;
      case "document":
        return <File className="h-4 w-4 text-green-600" />;
      case "information":
        return <Info className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };

  const getResourceTypeLabel = (resourceType: string) => {
    switch (resourceType) {
      case "link":
        return "Lien";
      case "document":
        return "Document";
      case "information":
        return "Information";
      default:
        return resourceType;
    }
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
            className="h-24 w-full bg-customBg text-white flex flex-col items-center justify-center gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
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

        {type === "text" && (
          <div className="space-y-2">
            <Label htmlFor="text-content">Contenu du cours</Label>
            <Textarea
              id="text-content"
              placeholder="Tapez le contenu de votre cours ici..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        )}

        {type === "video" && (
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
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Ressources</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResourceForm(true)}
              className="h-8 px-3"
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </div>

          {showResourceForm && (
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm">Type de ressource</Label>
                  <Select
                    value={newResource.type}
                    onValueChange={(value) =>
                      setNewResource({ ...newResource, type: value as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="link">Lien</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="information">Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Titre</Label>
                  <Input
                    placeholder="Titre de la ressource"
                    value={newResource.title}
                    onChange={(e) =>
                      setNewResource({ ...newResource, title: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Contenu</Label>
                <Input
                  placeholder={
                    newResource.type === "link"
                      ? "https://..."
                      : newResource.type === "document"
                      ? "Nom du document"
                      : "Information"
                  }
                  value={newResource.content}
                  onChange={(e) =>
                    setNewResource({ ...newResource, content: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={addResource}
                  disabled={
                    !newResource.content.trim() || !newResource.title.trim()
                  }
                  className="flex-1"
                >
                  Ajouter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowResourceForm(false);
                    setNewResource({ type: "link", content: "", title: "" });
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getResourceIcon(resource.type)}
                  <div>
                    <div className="font-medium text-sm">{resource.title}</div>
                    <div className="text-xs text-gray-600">
                      {resource.content}
                    </div>
                    <div className="text-xs text-gray-500">
                      {getResourceTypeLabel(resource.type)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeResource(index)}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {resources.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                Aucune ressource ajoutée
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button
          className="bg-customBg hover:bg-customBg-hover text-white px-8 w-full"
          onClick={handleSave}
          disabled={!title.trim()}
        >
          {isEditing ? "Modifier la leçon" : "Ajouter la leçon"}
        </Button>
      </CardFooter>
    </Card>
  );
}
