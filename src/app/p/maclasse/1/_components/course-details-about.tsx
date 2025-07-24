import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil, Settings, Plus } from "lucide-react";
import { IMG_URL } from "@/lib/constants";

export default function CourseDetailsAbout() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-end gap-2 mb-6  w-fit mx-auto">
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent"
        >
          <Pencil className="h-4 w-4" />
          Editer
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent"
        >
          <Settings className="h-4 w-4" />
          Configurer
        </Button>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4">
        <Image
          src={IMG_URL}
          alt="Main course image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="relative w-full h-24 rounded-lg overflow-hidden">
          <Image
            src={IMG_URL}
            alt="Thumbnail 1"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-full h-24 rounded-lg overflow-hidden">
          <Image
            src={IMG_URL}
            alt="Thumbnail 2"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-full h-24 rounded-lg overflow-hidden">
          <Image
            src={IMG_URL}
            alt="Thumbnail 3"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Button className="w-full h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100">
          <Plus className="h-6 w-6 text-gray-500" />
          <span className="sr-only">Add image</span>
        </Button>
      </div>

      {/* Description */}
      <div className="prose prose-sm max-w-none text-gray-700">
        <p>
          This course provides an in-depth exploration of the fascinating world
          of birds. From their evolutionary origins to their ecological
          significance, "A Bird's Eye View" covers a broad range of topics
          related to avian biology, behavior, and conservation. Students will
          gain a comprehensive understanding of bird anatomy, physiology,
          behavior, and the roles birds play in various ecosystems. This course
          combines theoretical knowledge with practical fieldwork.
        </p>
      </div>
    </div>
  );
}
