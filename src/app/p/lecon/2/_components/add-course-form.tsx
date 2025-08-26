"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Send, Plus, Trash2, Edit2 } from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "react-query";
import { classRepo } from "@/logic/infra/di/container";
import { CreateClassDto } from "@/logic/infra/repos/nodeapi/dtos";
import { toast } from "sonner";
import { useAppData } from "@/components/layouts/AppDataProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle";
import { Upload, File, Info, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Resource {
  type: "link" | "document" | "information";
  content: string;
  title: string;
}

interface LessonData {
  title: string;
  type: "video" | "text";
  videoLink?: string;
  transcribeVideo: boolean;
  resources: string[];
  content: {
    videoLink?: string;
    transcribeVideo: boolean;
    resources: string[];
  };
}

interface ChapterData {
  name: string;
  lessons: LessonData[];
}

interface AddCourseFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCourseForm({ isOpen, onClose }: AddCourseFormProps) {
  const { addClass, currentCommunity } = useAppData();
  const [chapters, setChapters] = useState<ChapterData[]>([
    {
      name: "Chapitre 1",
      lessons: [],
    },
  ]);
  const [editingChapter, setEditingChapter] = useState<number | null>(null);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<{
    chapterIndex: number;
    lessonIndex: number;
  } | null>(null);
  const [tempChapterTitle, setTempChapterTitle] = useState("");
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      // Créer la classe avec ses chapitres et leçons
      if (chapters && chapters.length > 0) {
        if (!className.trim()) {
          toast.error("Veuillez renseigner le nom de la classe");
          throw new Error("Class name required");
        }
        if (!classDescription.trim()) {
          toast.error("Veuillez renseigner la description de la classe");
          throw new Error("Class description required");
        }
        if (!currentCommunity) {
          toast.error("Veuillez sélectionner une communauté");
          throw new Error("Community not found");
        }

        console.log("currentCommunity", currentCommunity);

        // Créer la classe avec tous les chapitres et leçons
        const classData: CreateClassDto & {
          communityId: string;
          thumbnailFile?: File | null;
        } = {
          communityId: currentCommunity?.id || "",
          name: className.trim(),
          description: classDescription.trim(),
          cover: "",
          profil: "default",
          color: "red",
          content: "",
          thumbnailFile: thumbnail,
          chapters: chapters.map((chapter: any) => ({
            name: chapter.name,
            active: true,
            publishedAt: new Date().toISOString(),
            lessons:
              chapter.lessons?.map((lesson: any) => ({
                title: lesson.title,
                type: lesson.type,
                publishedAt: new Date().toISOString(),
                content: lesson.content,
              })) || [],
          })),
        };

        const savedClass = await classRepo.create(classData);
        return;

        // Ajouter à la liste globale des classes
        addClass(savedClass);

        return { class: savedClass };
      }

      return { class: null };
    },
    onSuccess: (result: any) => {
      return;
      toast.success("Classe créée avec succès !");
      console.log("Classe sauvegardée:", result);

      // Fermer le modal et réinitialiser
      onClose();
      resetForm();

      window.location.reload();
    },
    onError: (error: any) => {
      toast.error("Erreur lors de la création de la classe");
      console.error("Erreur:", error);
    },
  });

  const resetForm = () => {
    setChapters([
      {
        name: "Chapitre 1",
        lessons: [],
      },
    ]);
    setEditingChapter(null);
    setShowLessonForm(false);
    setEditingLesson(null);
    setTempChapterTitle("");
    setThumbnail(null);
    setThumbnailPreview("");
  };

  const handleAddChapter = () => {
    const newChapter = {
      name: `Chapitre ${chapters.length + 1}`,
      lessons: [],
    };
    const updatedChapters = [...chapters, newChapter];
    setChapters(updatedChapters);
  };

  const handleAddLesson = (chapterIndex: number) => {
    setEditingLesson({ chapterIndex, lessonIndex: -1 });
    setShowLessonForm(true);
  };

  const handleEditLesson = (chapterIndex: number, lessonIndex: number) => {
    setEditingLesson({ chapterIndex, lessonIndex });
    setShowLessonForm(true);
  };

  const handleSaveLesson = (lessonData: LessonData) => {
    if (!editingLesson) return;

    const { chapterIndex, lessonIndex } = editingLesson;
    const updatedChapters = [...chapters];

    if (lessonIndex === -1) {
      // Nouvelle leçon
      updatedChapters[chapterIndex].lessons.push({
        title: lessonData.title,
        type: lessonData.type,
        videoLink: lessonData.videoLink,
        transcribeVideo: lessonData.transcribeVideo,
        resources: lessonData.resources,
        content: {
          videoLink: lessonData.videoLink,
          transcribeVideo: lessonData.transcribeVideo,
          resources: lessonData.resources,
        },
      });
    } else {
      // Modification de leçon existante
      updatedChapters[chapterIndex].lessons[lessonIndex] = {
        ...updatedChapters[chapterIndex].lessons[lessonIndex],
        title: lessonData.title,
        type: lessonData.type,
        videoLink: lessonData.videoLink,
        transcribeVideo: lessonData.transcribeVideo,
        resources: lessonData.resources,
        content: {
          videoLink: lessonData.videoLink,
          transcribeVideo: lessonData.transcribeVideo,
          resources: lessonData.resources,
        },
      };
    }

    setChapters(updatedChapters);
    setShowLessonForm(false);
    setEditingLesson(null);
  };

  const handleDeleteChapter = (chapterIndex: number) => {
    if (chapters.length > 1) {
      const updatedChapters = chapters.filter(
        (_, index) => index !== chapterIndex
      );
      setChapters(updatedChapters);
    } else {
      toast.error("Vous devez avoir au moins un chapitre");
    }
  };

  const handleDeleteLesson = (chapterIndex: number, lessonIndex: number) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].lessons.splice(lessonIndex, 1);
    setChapters(updatedChapters);
  };

  const handleEditChapterTitle = (chapterIndex: number, newTitle: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].name = newTitle;
    setChapters(updatedChapters);
    setEditingChapter(null);
    setTempChapterTitle("");
  };

  const startEditingChapter = (chapterIndex: number) => {
    setEditingChapter(chapterIndex);
    setTempChapterTitle(chapters[chapterIndex].name);
  };

  const saveChapterEdit = (chapterIndex: number) => {
    if (tempChapterTitle.trim()) {
      handleEditChapterTitle(chapterIndex, tempChapterTitle.trim());
    } else {
      setEditingChapter(null);
      setTempChapterTitle("");
    }
  };

  const handleCreateLesson = () => {
    if (chapters.length === 0) {
      toast.error("Veuillez d'abord ajouter au moins un chapitre");
      return;
    }

    mutation.mutate();
  };

  const getInitialLessonData = (): LessonData | undefined => {
    if (!editingLesson) return undefined;

    const { chapterIndex, lessonIndex } = editingLesson;
    if (lessonIndex === -1) return undefined;

    const lesson = chapters[chapterIndex].lessons[lessonIndex];
    return {
      title: lesson.title,
      type: lesson.type as "video" | "text",
      videoLink: (lesson.content as any)?.videoLink,
      transcribeVideo: (lesson.content as any)?.transcribeVideo || false,
      resources: (lesson.content as any)?.resources || [],
      content: lesson.content || {
        videoLink: (lesson.content as any)?.videoLink,
        transcribeVideo: (lesson.content as any)?.transcribeVideo || false,
        resources: (lesson.content as any)?.resources || [],
      },
    };
  };

  // Composant complet pour le formulaire de leçon
  const CompleteLessonForm = ({
    onClose,
    onSave,
    initialData,
    isEditing,
  }: any) => {
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

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        title,
        type,
        videoLink: type === "video" ? videoLink : undefined,
        transcribeVideo,
        textContent: type === "text" ? textContent : undefined,
        resources,
        content: {
          videoLink: type === "video" ? videoLink : undefined,
          transcribeVideo,
          textContent: type === "text" ? textContent : undefined,
          resources,
        },
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
          return <Upload className="h-4 w-4 text-blue-600" />;
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? "Modifier la leçon" : "Nouvelle leçon"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Titre</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre de la leçon"
                required
              />
            </div>

            <ToggleGroup
              value={type}
              onValueChange={(value: string | string[]) => {
                if (typeof value === "string" && value) {
                  setType(value as "video" | "text");
                }
              }}
              className="grid grid-cols-2 gap-4"
            >
              <ToggleGroupItem
                value="video"
                aria-label="Toggle video"
                className="h-24 w-full bg-teal-600 text-white flex flex-col items-center justify-center gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <Upload className="h-6 w-6" />
                Vidéo
              </ToggleGroupItem>
              <ToggleGroupItem
                value="text"
                aria-label="Toggle text"
                className="h-24 w-full flex flex-col items-center justify-center gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <File className="h-6 w-6" />
                Texte
              </ToggleGroupItem>
            </ToggleGroup>

            {type === "video" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Lien vidéo
                </label>
                <Input
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="URL de la vidéo"
                />
              </div>
            )}

            {type === "text" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Contenu du cours
                </label>
                <Textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Tapez le contenu de votre cours ici..."
                  className="min-h-[120px]"
                />
              </div>
            )}

            {type === "video" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit2 className="h-5 w-5 text-muted-foreground" />
                  <label htmlFor="transcribe-video">Transcrire la Vidéo</label>
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
                <label className="block text-sm font-medium">Ressources</label>
                <Button
                  type="button"
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
                      <label className="text-sm">Type de ressource</label>
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
                          <SelectItem value="information">
                            Information
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Titre</label>
                      <Input
                        placeholder="Titre de la ressource"
                        value={newResource.title}
                        onChange={(e) =>
                          setNewResource({
                            ...newResource,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Contenu</label>
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
                        setNewResource({
                          ...newResource,
                          content: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
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
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowResourceForm(false);
                        setNewResource({
                          type: "link",
                          content: "",
                          title: "",
                        });
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
                        <div className="font-medium text-sm">
                          {resource.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {resource.content}
                        </div>
                        <div className="text-xs text-gray-500">
                          {getResourceTypeLabel(resource.type)}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
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

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                {isEditing ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto z-[200]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            5. Ajouter une classe
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Class basics */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Nom de la classe
              </label>
              <Input
                placeholder="Ex: Mathématiques - Niveau 1"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                placeholder="Décrivez brièvement cette classe"
                value={classDescription}
                onChange={(e) => setClassDescription(e.target.value)}
                className="min-h-[90px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Thumbnail de la classe
              </label>
              <div className="flex items-center space-x-4">
                {thumbnailPreview ? (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choisir une image
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    Formats acceptés: JPG, PNG, GIF (max 5MB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Header with Add Chapter Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Structure de la classe
            </h2>
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white px-8"
              onClick={handleAddChapter}
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un chapitre
            </Button>
          </div>

          {/* Course Structure */}
          <div className="space-y-6">
            {chapters.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Aucun chapitre ajouté pour le moment.</p>
                <p className="text-sm">
                  Cliquez sur "Ajouter un chapitre" pour commencer.
                </p>
              </div>
            ) : (
              chapters.map((chapter, chapterIndex) => (
                <div
                  key={chapterIndex}
                  className="border border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {editingChapter === chapterIndex ? (
                        <Input
                          value={tempChapterTitle}
                          onChange={(e) => setTempChapterTitle(e.target.value)}
                          onBlur={() => saveChapterEdit(chapterIndex)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              saveChapterEdit(chapterIndex);
                            }
                          }}
                          className="w-48 h-8 text-sm font-semibold"
                          autoFocus
                        />
                      ) : (
                        <h3 className="font-semibold text-gray-900">
                          {chapter.name}
                        </h3>
                      )}
                      <button
                        onClick={() => startEditingChapter(chapterIndex)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center"
                        onClick={() => handleAddLesson(chapterIndex)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Nouvelle leçon
                      </button>
                      <Switch
                        defaultChecked
                        className="data-[state=checked]:bg-teal-600"
                      />
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteChapter(chapterIndex)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Lessons for Chapter */}
                  <div className="space-y-3 ml-4">
                    {chapter.lessons.length === 0 ? (
                      <div className="text-sm text-gray-500 py-2">
                        Aucune leçon dans ce chapitre.
                      </div>
                    ) : (
                      chapter.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-700">
                              {lesson.title}
                            </span>
                            <button
                              onClick={() =>
                                handleEditLesson(chapterIndex, lessonIndex)
                              }
                              className="text-gray-400 hover:text-gray-600"
                              title="Modifier la leçon"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Switch
                              defaultChecked
                              className="data-[state=checked]:bg-teal-600"
                            />
                            <button
                              className="text-red-500 hover:text-red-600"
                              onClick={() =>
                                handleDeleteLesson(chapterIndex, lessonIndex)
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Add Chapter Button */}
          {chapters.length > 0 && (
            <div className="flex justify-center pt-4">
              <Button
                className="bg-black hover:bg-gray-800 text-white px-6"
                onClick={handleAddChapter}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un chapitre
              </Button>
            </div>
          )}

          {/* Create Button */}
          {chapters.length > 0 && (
            <div className="flex justify-center pt-4">
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white px-8"
                onClick={handleCreateLesson}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? (
                  "Création en cours..."
                ) : (
                  <>
                    Créer leçon
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Lesson Form Popup */}
        {showLessonForm && (
          <CompleteLessonForm
            onClose={() => {
              setShowLessonForm(false);
              setEditingLesson(null);
            }}
            onSave={handleSaveLesson}
            initialData={getInitialLessonData()}
            isEditing={editingLesson?.lessonIndex !== -1}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
