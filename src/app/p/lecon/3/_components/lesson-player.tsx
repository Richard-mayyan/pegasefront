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

export default function LessonPlayer() {
  return (
    <main className="flex-1 p-6 overflow-y-auto bg-white">
      <div className="mb-6">
        <span className="text-sm text-gray-500">Chapitre</span>
        <h2 className="text-xl font-bold mt-1">
          Leçon 03: Commencer votre aventure
        </h2>
      </div>

      {/* Video Player */}
      <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6">
        <Image
          src={IMG_URL}
          alt="Video thumbnail"
          layout="fill"
          objectFit="cover"
          className="object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-white/80 text-teal-600 hover:bg-white"
          >
            <Play className="h-8 w-8 fill-teal-600" />
            <span className="sr-only">Play video</span>
          </Button>
        </div>
      </div>

      {/* Resources and Transcription */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="font-semibold">Ressources</span>
          <Button
            variant="ghost"
            className=" text-xs flex items-center gap-1 px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <Paperclip className="h-4 w-4" />
            Fichier PDF.pdf
          </Button>
        </div>
        <Button
          variant="ghost"
          className="flex items-center gap-1 px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100"
        >
          Transcription
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Course Description */}
      <div className="prose prose-sm max-w-none text-gray-700 mb-8 text-sm font-medium">
        <p>
          This course provides an in-depth exploration of the fascinating world
          of birds. From their evolutionary origins to their ecological
          significance, "A Bird's Eye View" covers a broad range of topics
          related to avian biology, behavior, and conservation. Students will
          gain a comprehensive understanding of bird anatomy, physiology,
          behavior, and the roles birds play in various ecosystems. This course
          combines theoretical knowledge with practical fieldwork to offer a
          holistic learning experience.
        </p>
      </div>

      {/* Personal Notes */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Note personnelles</h3>
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
            placeholder="Tapez..."
            className="w-full min-h-[150px] border-none focus-visible:ring-0 resize-y"
          />
        </div>
      </div>
    </main>
  );
}
