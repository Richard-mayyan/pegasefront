import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";
import { IMG_URL } from "@/lib/constants";

interface Lesson {
  id: number;
  title: string;
  type: string;
  content: {
    videoLink?: string;
    transcribeVideo?: boolean;
    resources?: string[];
  };
}

interface Chapter {
  id: number;
  name: string;
}

interface LessonPlayerProps {
  chapter: Chapter;
  lesson: Lesson | undefined;
  chapterIndex: number;
  lessonIndex: number;
}

export default function LessonPlayer({
  chapter,
  lesson,
  chapterIndex,
  lessonIndex,
}: LessonPlayerProps) {
  // Si aucune leçon n'est sélectionnée
  if (!lesson) {
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

    return IMG_URL;
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
        <h2 className="text-xl font-bold mt-1">{lesson.title}</h2>
      </div>

      {/* Video Player */}
      {lesson.type === "video" && lesson.content.videoLink && (
        <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6">
          <Image
            src={getVideoThumbnail(lesson.content.videoLink)}
            alt="Video thumbnail"
            layout="fill"
            objectFit="cover"
            className="object-center"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="icon"
              className="h-16 w-16 rounded-full bg-white/80 text-teal-600 hover:bg-white"
              onClick={() => window.open(lesson.content.videoLink, "_blank")}
            >
              <Play className="h-8 w-8 fill-teal-600" />
              <span className="sr-only">Play video</span>
            </Button>
          </div>
        </div>
      )}

      {/* Audio Player */}
      {lesson.type === "audio" && (
        <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-teal-600" />
            </div>
            <p className="text-gray-600">Lecteur audio</p>
            <p className="text-sm text-gray-500">Contenu audio à venir</p>
          </div>
        </div>
      )}

      {/* Resources and Transcription */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="font-semibold">Ressources</span>
          {lesson.content.resources && lesson.content.resources.length > 0 ? (
            lesson.content.resources.map((resource, index) => (
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
        {lesson.content.transcribeVideo && (
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
          {lesson.type === "video" && lesson.content.videoLink ? (
            <>
              Cette leçon vidéo vous guide à travers les concepts essentiels.
              Cliquez sur le bouton de lecture pour visionner le contenu
              complet.
              {lesson.content.transcribeVideo &&
                " Une transcription est disponible pour faciliter votre compréhension."}
            </>
          ) : lesson.type === "audio" ? (
            "Cette leçon audio vous permet d'apprendre en écoutant. Utilisez le lecteur audio ci-dessus pour commencer."
          ) : (
            "Cette leçon contient du contenu textuel et des ressources pour enrichir votre apprentissage."
          )}
        </p>
      </div>

      {/* Personal Notes */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Notes personnelles</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Underline className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Quote className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Link className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder="Tapez vos notes personnelles ici..."
            className="w-full min-h-[150px] border-none focus-visible:ring-0 resize-y"
          />
        </div>
      </div>
    </main>
  );
}
