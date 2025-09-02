"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Paperclip,
  Bold,
  Italic,
  Underline,
  List,
  Quote,
  Link,
  Play,
  Save,
} from "lucide-react";
import { getPlaceholderImage, IMG_URL } from "@/lib/constants";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { fr as frLocale } from "@blocknote/core/locales";
import { useEffect, useState } from "react";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { toast } from "sonner";
import NotesTest from "./notes-test";
import {
  ChapterEntity,
  LessonEntity,
  NoteEntity,
} from "@/logic/domain/entities";

// interface Lesson {
//   id: number;
//   title: string;
//   type: string;
//   content: {
//     videoLink?: string;
//     transcribeVideo?: boolean;
//     resources?: string[];
//   };
// }

// interface Chapter {
//   id: number;
//   name: string;
// }

// interface Note {
//   id: string;
//   content: string;
//   lesson: Lesson;
//   createdAt: string;
//   updatedAt: string;
// }

interface LessonPlayerProps {
  chapter: ChapterEntity;
  lessonId: number;
  chapterIndex: number;
  lessonIndex: number;
}

export default function LessonPlayer({
  chapter,
  lessonId,
  chapterIndex,
  lessonIndex,
}: LessonPlayerProps) {
  const [notes, setNotes] = useState<NoteEntity[]>([]);
  const [currentNote, setCurrentNote] = useState<NoteEntity | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [fetchedLesson, setFetchedLesson] = useState<LessonEntity | null>(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);

  // console.log("lessonId", lessonId);

  const editor = useCreateBlockNote({
    dictionary: frLocale,
    initialContent: (() => {
      try {
        return currentNote?.content
          ? JSON.parse(currentNote.content)
          : undefined;
      } catch {
        return undefined;
      }
    })(),
  });

  // Fetch la leçon depuis l'API quand elle change
  useEffect(() => {
    if (lessonId) {
      fetchLesson();
      loadNotes();
    }
  }, [lessonId]);

  const fetchLesson = async () => {
    if (!lessonId) return;

    try {
      setIsLoadingLesson(true);
      const response = await apiClient.get(`/lessons/${lessonId}`);
      const lessonData = response.data?.data || response.data;
      setFetchedLesson(lessonData);
      console.log("Leçon fetchée:", lessonData);
    } catch (error) {
      console.error("Erreur lors du fetch de la leçon:", error);
      toast.error("Impossible de charger les détails de la leçon");
    } finally {
      setIsLoadingLesson(false);
    }
  };

  const loadNotes = async () => {
    if (!lessonId) return;

    try {
      const response = await apiClient.get(`/lessons/${lessonId}/note`);
      const notesData = response.data?.data || response.data || [];
      setNotes(notesData);

      // Si il y a des notes, prendre la première (ou la plus récente si disponible)
      if (notesData.length > 0) {
        const latestNote = notesData[0]; // Prendre la première note pour l'instant
        setCurrentNote(latestNote);

        // Mettre à jour l'éditeur avec le contenu de la note
        if (latestNote.content) {
          try {
            const content = JSON.parse(latestNote.content);
            editor.replaceBlocks(editor.document, content);
          } catch (error) {
            console.error(
              "Erreur lors du parsing du contenu de la note:",
              error
            );
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement des notes:", error);
      toast.error("Impossible de charger les notes");
    }
  };

  const saveNote = async () => {
    if (!lessonId) return;

    try {
      setIsSaving(true);
      const content = JSON.stringify(editor.document);
      // Mettre à jour la note existante
      await apiClient.patch(`/lessons/${lessonId}/note`, { content });
      toast.success("Note mise à jour avec succès");

      // if (currentNote) {

      // } else {
      //   // Créer une nouvelle note
      //   const response = await apiClient.post(`/lessons/${lesson.id}/notes`, {
      //     content,
      //   });
      //   const newNote = response.data?.data || response.data;
      //   setCurrentNote(newNote);
      //   setNotes((prev) => [...prev, newNote]);
      //   toast.success("Note sauvegardée avec succès");
      // }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.error("Erreur lors de la sauvegarde de la note");
    } finally {
      setIsSaving(false);
    }
  };

  // Si aucune leçon n'est sélectionnée
  if (!lessonId) {
    return (
      <main className="flex-1 p-6 overflow-y-auto bg-white">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Sélectionnez une leçon
            </h3>
            <p className="text-gray-500">
              Choisissez une leçon dans la barre latérale pour commencer
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Si la leçon est en cours de chargement
  if (isLoadingLesson) {
    return (
      <main className="flex-1 p-6 overflow-y-auto bg-white">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-customBg mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Chargement de la leçon...
            </h3>
            <p className="text-gray-500">
              Veuillez patienter pendant le chargement
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Si la leçon n'a pas pu être chargée
  if (!fetchedLesson) {
    return (
      <main className="flex-1 p-6 overflow-y-auto bg-white">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Erreur de chargement
            </h3>
            <p className="text-gray-500">
              Impossible de charger la leçon (ID: {lessonId})
            </p>
            <Button onClick={fetchLesson} variant="outline" className="mt-4">
              Réessayer
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const getVideoThumbnail = (videoLink?: string) => {
    if (!videoLink) return IMG_URL;

    // Extraire l'ID YouTube si c'est un lien YouTube
    const youtubeMatch = videoLink.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    if (youtubeMatch) {
      const link = `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
      console.log(link);
      return link;
    }

    return getPlaceholderImage("Video");
  };

  const getResourceName = (resource: string) => {
    // Extraire le nom du fichier de l'URL ou du chemin
    const fileName = resource.split("/").pop() || resource;
    return fileName.includes(".") ? fileName : `${fileName}.pdf`;
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto bg-white">
      <div className="mb-6">
        <span className="text-sm text-gray-500">
          Chapitre {chapterIndex + 1}: {chapter.name}
        </span>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold mt-1">
            {isLoadingLesson ? "Chargement..." : fetchedLesson.title}
          </h2>
          {isLoadingLesson && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-customBg"></div>
          )}
        </div>
        {fetchedLesson && (
          <div className="text-xs text-gray-500 mt-1">
            Données récupérées depuis l'API
          </div>
        )}
      </div>
      {/* 
      <p>
        {JSON.stringify({
          type: fetchedLesson.type,
          video: fetchedLesson.video?.url,
        })}
      </p> */}

      {/* Video Player */}
      {fetchedLesson.type === "video" && fetchedLesson.video?.url && (
        <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6">
          <video
            src={fetchedLesson.video.url}
            controls
            className="w-full h-full object-cover"
            poster={getVideoThumbnail(fetchedLesson.video.url)}
            preload="metadata"
          >
            <source src={fetchedLesson.video.url} type="video/mp4" />
            <source src={fetchedLesson.video.url} type="video/webm" />
            <source src={fetchedLesson.video.url} type="video/ogg" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      )}

      {/* Audio Player */}
      {fetchedLesson.type === "audio" && (
        <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          <div className="w-full max-w-md">
            {fetchedLesson.content &&
            typeof fetchedLesson.content === "string" ? (
              <audio
                src={fetchedLesson.content}
                controls
                className="w-full"
                preload="metadata"
              >
                <source src={fetchedLesson.content} type="audio/mpeg" />
                <source src={fetchedLesson.content} type="audio/ogg" />
                <source src={fetchedLesson.content} type="audio/wav" />
                Votre navigateur ne supporte pas la lecture audio.
              </audio>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-customBg" />
                </div>
                <p className="text-gray-600">Lecteur audio</p>
                <p className="text-sm text-gray-500">
                  URL audio non disponible
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Document Player */}
      {fetchedLesson.type === "document" && fetchedLesson.document?.url && (
        <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          <div className="w-full h-full">
            <iframe
              src={fetchedLesson.document.url}
              className="w-full h-full rounded-lg"
              title="Document Viewer"
            >
              <p>Votre navigateur ne supporte pas l'affichage de documents.</p>
            </iframe>
          </div>
        </div>
      )}

      {/* Resources and Transcription */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="font-semibold">Ressources</span>
          {fetchedLesson.resources && fetchedLesson.resources.length > 0 ? (
            fetchedLesson.resources.map((resource, index) => (
              <Button
                key={index}
                variant="ghost"
                className="text-xs flex items-center gap-1 px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => window.open(resource, "_blank")}
              >
                <Paperclip className="h-4 w-4" />
                {getResourceName(resource)}
              </Button>
            ))
          ) : (
            <span className="text-gray-400 text-sm">
              Aucune ressource disponible
            </span>
          )}
        </div>
        {fetchedLesson.video?.transcribeVideo && (
          <Button
            variant="ghost"
            className="flex items-center gap-1 px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Transcription
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Course Description */}
      <div className="prose prose-sm max-w-none text-gray-700 mb-8 text-sm font-medium">
        <p>
          {fetchedLesson.type === "video" && fetchedLesson.video?.url ? (
            <>
              Cette leçon vidéo vous guide à travers les concepts essentiels.
              Utilisez le lecteur vidéo ci-dessus pour visionner le contenu
              complet.
              {fetchedLesson.video?.transcribeVideo &&
                " Une transcription est disponible pour faciliter votre compréhension."}
            </>
          ) : fetchedLesson.type === "audio" ? (
            "Cette leçon audio vous permet d'apprendre en écoutant. Utilisez le lecteur audio ci-dessus pour commencer."
          ) : fetchedLesson.type === "document" ? (
            "Cette leçon contient un document à consulter. Utilisez le lecteur de document ci-dessus."
          ) : (
            "Cette leçon contient du contenu textuel et des ressources pour enrichir votre apprentissage."
          )}
        </p>
      </div>

      {/* Debug API Lesson Data */}
      {/* {fetchedLesson && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">
            Données de la leçon depuis l'API
          </h4>
          <div className="text-xs text-blue-700 space-y-1">
            <p>
              <strong>ID:</strong> {fetchedLesson.id}
            </p>
            <p>
              <strong>Titre:</strong> {fetchedLesson.title}
            </p>
            <p>
              <strong>Type:</strong> {fetchedLesson.type}
            </p>
            {fetchedLesson.content && (
              <div>
                <p>
                  <strong>Contenu:</strong>
                </p>
                <pre className="bg-white p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(fetchedLesson.content, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )} */}

      {/* Personal Notes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">
            Notes personnelles
          </h3>
          <div className="flex gap-2">
            <Button onClick={fetchLesson} variant="outline" className="text-xs">
              Recharger leçon
            </Button>
            <Button onClick={loadNotes} variant="outline" className="text-xs">
              Recharger notes
            </Button>
            <Button
              onClick={saveNote}
              disabled={isSaving}
              className="flex items-center gap-2 bg-customBg hover:bg-customBg-hover text-white"
            >
              <Save className="h-4 w-4" />
              {isSaving
                ? "Sauvegarde..."
                : currentNote
                ? "Mettre à jour"
                : "Sauvegarder"}
            </Button>
          </div>
        </div>

        {/* Debug info */}
        {/* <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <p>Lesson ID: {fetchedLesson.id}</p>
          <p>Notes count: {notes.length}</p>
          <p>
            Current note: {currentNote ? `ID: ${currentNote.id}` : "Aucune"}
          </p>
        </div> */}

        {/* Test API Notes */}
        {/* <NotesTest lessonId={lesson.id} /> */}

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <BlockNoteView editor={editor} theme="light" />
        </div>
      </div>
    </main>
  );
}
