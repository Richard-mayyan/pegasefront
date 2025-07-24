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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
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
  Calendar,
  Clock,
} from "lucide-react";
import { IMG_URL } from "@/lib/constants";

export default function AddCoachingForm() {
  const performanceCategories = [
    { name: "Explorateur", count: 256 },
    { name: "Aventurier", count: 125 },
    { name: "Champions", count: 54 },
    { name: "Maîtres des Arcanes", count: 12 },
  ];
  const members = [
    {
      name: "Alexandra Thompson",
      avatar: IMG_URL,
    },
    { name: "Benjamin Carter", avatar: IMG_URL },
    { name: "Cassandra Lee", avatar: IMG_URL },
    { name: "Darius Mitchell", avatar: IMG_URL },
  ];
  return (
    <Card className="w-full max-w-md rounded-xl shadow-lg p-6">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">Ajouter un coaching</CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="coaching-name" className="sr-only">
            Nom du coaching
          </Label>
          <Input id="coaching-name" placeholder="Nom du coaching" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coaching-description">Description</Label>
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
              id="coaching-description"
              placeholder="Tapez..."
              className="w-full min-h-[100px] border-none focus-visible:ring-0 resize-y"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Label htmlFor="price" className="sr-only">
              Prix
            </Label>
            <Input id="price" placeholder="Prix" className="pr-8" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              €
            </span>
          </div>
          <Select>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Paiement Mensuel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Paiement Mensuel</SelectItem>
              <SelectItem value="one-time">Paiement Unique</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="coaching-date">Date</Label>
          <div className="relative">
            <Input
              id="coaching-date"
              type="text"
              placeholder="12/06/2025"
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
            >
              <Calendar className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <Label htmlFor="start-time">Heure de début</Label>
            <div className="relative">
              <Input
                id="start-time"
                type="text"
                placeholder="18:00"
                className="pr-8"
              />
              <Clock className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-time">Heure de fin</Label>
            <div className="relative">
              <Input
                id="end-time"
                type="text"
                placeholder="18:30"
                className="pr-8"
              />
              <Clock className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select>
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Paris" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="event-link">Lien de l'événement</Label>
          <Input
            id="event-link"
            placeholder="https://meet.google.com/fsk-oeqb-vtd/authuser"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coaching-type-select">Type de coaching</Label>
          <Select>
            <SelectTrigger id="coaching-type-select" className="w-full">
              <SelectValue placeholder="Sélectionner en fonction des performances" />
            </SelectTrigger>
            <SelectContent>
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

        <div className="space-y-2">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner les membres" />
            </SelectTrigger>
            <SelectContent>
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
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Annuler</Button>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
          Ajouter le coaching
        </Button>
      </CardFooter>
    </Card>
  );
}
