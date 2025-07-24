import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IMG_URL } from "@/lib/constants";
import {
  Send,
  Plus,
  Smile,
  RotateCcw,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading,
  List,
  Quote,
  Link,
} from "lucide-react";

export default function Component() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
            <Send className="w-6 h-6 text-white rotate-45" />
          </div>
          <h1 className="text-2xl font-bold text-black">Pegase</h1>
        </div>

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-black">
            4. Présentez BeTech Education
          </h2>
        </div>

        {/* Main Image */}
        <div className="space-y-4">
          <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={IMG_URL}
              alt="Smiling woman in office workspace"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex space-x-3">
            <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={IMG_URL}
                alt="Workspace thumbnail 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={IMG_URL}
                alt="Workspace thumbnail 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={IMG_URL}
                alt="Workspace thumbnail 3"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="w-20 h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Plus className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Text Editor Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-black">
            Présentez votre classe
          </h3>

          {/* Rich Text Editor Toolbar */}
          <div className="border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-1 p-3 border-b border-gray-200 bg-gray-50">
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Smile className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <RotateCcw className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Bold className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Italic className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Underline className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Strikethrough className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Heading className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <List className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Quote className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                <Link className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Text Area */}
            <Textarea
              placeholder="Tapez..."
              className="min-h-32 border-0 resize-none focus:ring-0 text-base"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
            Passer
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 w-full">
            Suivant
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
