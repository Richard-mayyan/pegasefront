import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ClassConfigurationForm() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-x-16 gap-y-12">
        {/* Section 1: Personal Information */}
        <div className="col-span-1 space-y-2">
          <h2 className="text-2xl font-bold">
            Ces informations vous concernent
          </h2>
          <p className="text-gray-500 text-sm">
            Ces informations définissent vos informations personnelles
          </p>
        </div>
        <div className="col-span-1 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profile-photo">Photo de profil</Label>
            <p className="text-xs text-muted-foreground">
              Recommandé: 300px x 300px
            </p>
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <Button variant="ghost" className="text-sm text-gray-600">
                Choisir
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">Votre nom</Label>
              <Input id="first-name" placeholder="Nom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Votre prénom</Label>
              <Input id="last-name" placeholder="Prénom" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Votre adresse email</Label>
            <Input id="email" placeholder="Adresse email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" placeholder="Mot de passe" type="password" />
          </div>
        </div>

        {/* Section 2: Class Configuration */}
        <div className="col-span-1 space-y-2 mt-12">
          <h2 className="text-2xl font-bold">Configurons votre classe</h2>
          <p className="text-gray-500 text-sm">
            Ces informations définissent l'aspect visuel de votre classe
          </p>
        </div>
        <div className="col-span-1 space-y-6 mt-12">
          <div className="space-y-2">
            <Label>Photo du cours et couverture</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Logo de la classe
                </p>
                <p className="text-xs text-muted-foreground">
                  Recommandé: 300px x 300px
                </p>
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                  <Button variant="ghost" className="text-sm text-gray-600">
                    Choisir
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Couverture de la classe
                </p>
                <p className="text-xs text-muted-foreground">
                  Nous recommandons de faire une image de 1600x300px
                </p>
                <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                  <Button variant="ghost" className="text-sm text-gray-600">
                    Modifier votre image
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="community-type">Type de communauté</Label>
            <Select>
              <SelectTrigger id="community-type">
                <SelectValue placeholder="Sélectionnez si votre communauté est gratuite ou pas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Payante</SelectItem>
                <SelectItem value="free">Gratuite</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 mt-2">
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
                  <SelectItem value="yearly">Paiement Annuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain-name">
              Nom de domaine de votre communauté
            </Label>
            <p className="text-xs text-muted-foreground">
              Choisissez le nom de domaine pour accéder à votre communauté
            </p>
            <Input
              id="domain-name"
              placeholder="Ex: www.pegase.com/nom-de-domaine"
            />
          </div>

          <div className="space-y-2">
            <Label>Choisissez la couleur de votre classe</Label>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer" />
              <div className="h-8 w-8 rounded-full bg-red-500 cursor-pointer relative border-2 border-red-500">
                <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                  0
                </span>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="typography">Typographie</Label>
            <Select>
              <SelectTrigger id="typography">
                <SelectValue placeholder="Sélectionnez une police" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manrope">Manrope</SelectItem>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
