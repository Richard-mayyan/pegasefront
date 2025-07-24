import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  Smile,
  Paperclip,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  Quote,
  Link,
} from "lucide-react";
import Image from "next/image";
import { IMG_URL } from "@/lib/constants";

export default function NewDiscussionGroupForm() {
  const members = [
    {
      name: "Alexandra Thompson",
      avatar: IMG_URL,
    },
    { name: "Benjamin Carter", avatar: IMG_URL },
    { name: "Cassandra Lee", avatar: IMG_URL },
    { name: "Darius Mitchell", avatar: IMG_URL },
  ];

  const performanceCategories = [
    { name: "Explorateur", count: 256 },
    { name: "Aventurier", count: 125 },
    { name: "Champions", count: 54 },
    { name: "Maîtres des Arcanes", count: 12 },
  ];

  return (
    <Card className="w-full max-w-md rounded-xl shadow-lg p-6">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">
          Nouveau groupe de discussion
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="group-name" className="sr-only">
            Nom du groupe
          </Label>
          <Input id="group-name" placeholder="Nom du groupe" />
          <p className="text-sm text-muted-foreground">30/30</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="group-description">Description du groupe</Label>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="h-6 w-[1px] bg-gray-200 mx-1" />
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
                <Strikethrough className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <AlignLeft className="h-4 w-4" />
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
              className="w-full min-h-[100px] border-none focus-visible:ring-0 resize-y"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label
            htmlFor="all-members-can-write"
            className="text-base font-medium"
          >
            Tous les membres peuvent écrire
          </Label>
          <Switch id="all-members-can-write" defaultChecked />
        </div>

        <div className="space-y-2">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez les membres" />
            </SelectTrigger>
            <SelectContent>
              {/* Simulating the expanded list content as seen in the image */}
              {members.map((member, index) => (
                <SelectItem key={index} value={member.name}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    {member.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez en fonction des performances" />
            </SelectTrigger>
            <SelectContent>
              {/* Simulating the expanded list content as seen in the image */}
              {performanceCategories.map((category, index) => (
                <SelectItem key={index} value={category.name}>
                  <div className="flex items-center justify-between w-full">
                    <span>{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.count} Erudiants
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Annuler</Button>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
          Ajouter Groupe de chat
        </Button>
      </CardFooter>
    </Card>
  );
}
