# Guide d'Utilisation - Système d'Onboarding et Gestion des Données

## Vue d'ensemble

Ce système permet de créer et gérer des communautés avec des classes contenant des chapitres et des leçons, avec persistance automatique dans le localStorage.

## Utilisation

### 1. Parcours d'Onboarding

#### Étape 1 : Informations de base

- Nom de la communauté
- Description
- Couverture
- Profil
- Couleur
- Typographie

#### Étape 2 : Informations supplémentaires

- Informations additionnelles sur la communauté

#### Étape 3 : Ajouter un module

- **Titre** : "Ajouter un module" (modifié)
- **Fonctionnalités** :
  - Ajouter des chapitres
  - Ajouter des leçons dans chaque chapitre
  - **Modification des leçons** : Affiche toujours le popup `AddLessonForm`
  - Gestion des états (publié/non publié)
  - Suppression de chapitres et leçons

#### Étape 4 : Finalisation

- Paramètres de la communauté :
  - Discussion communautaire
  - Visibilité de la liste des étudiants
  - Réunions de groupe
  - Synchronisation automatique (activée par défaut)
- Sauvegarde automatique via les repos
- Redirection vers l'application principale

### 2. Structure des Données

#### Communauté

```typescript
{
  name: string,
  description: string,
  cover: string,
  profil: string,
  color: string,
  typography: string,
  settings: {
    communityDiscussion: boolean,
    studentListVisibility: boolean,
    groupMeeting: boolean
  }
}
```

#### Classe avec Chapitres et Leçons

```typescript
{
  name: string,
  description: string,
  chapters: [
    {
      name: string,
      lessons: [
        {
          title: string,
          type: "video" | "text",
          content: {
            videoLink?: string,
            transcribeVideo: boolean,
            resources: string[]
          }
        }
      ]
    }
  ]
}
```

### 3. Accès aux Données dans l'Application

#### Hook useAppData

```typescript
import { useAppData } from "@/components/layouts/AppDataProvider";

function MonComposant() {
  const { community, class: classData, isLoading } = useAppData();

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{community?.name}</h1>
      <p>Classe: {classData?.name}</p>
      <p>Chapitres: {classData?.chapters?.length}</p>
    </div>
  );
}
```

#### Données Disponibles

- `community` : Données de la communauté
- `class` : Données de du module avec chapitres et leçons
- `isLoading` : État de chargement
- `setCommunity()` : Mettre à jour la communauté
- `setClass()` : Mettre à jour du module

### 4. Persistance des Données

#### Stockage Automatique

- Les données sont automatiquement sauvegardées dans le localStorage
- Clés utilisées :
  - `pegas_communities` : Communautés
  - `pegas_classes` : Classes

#### Récupération au Démarrage

- L'application récupère automatiquement les données au démarrage
- Utilise la fonction `getSavedData()` du container
- Met à jour le contexte global `AppDataProvider`

### 5. Gestion des Erreurs

#### Protection Côté Serveur

- Les repos vérifient `typeof window !== 'undefined'` avant d'accéder au localStorage
- Évite les erreurs lors du build et du rendu côté serveur

#### Gestion des Erreurs

- Logs d'erreur dans la console
- Fallback vers des tableaux vides en cas d'erreur
- État de chargement géré dans `AppDataProvider`

## Exemples d'Utilisation

### Créer une Nouvelle Leçon

```typescript
// Dans le composant AddLessonForm
const handleSave = (lessonData) => {
  // Les données sont automatiquement sauvegardées via le contexte d'onboarding
  onSave(lessonData);
};
```

### Accéder aux Données Sauvegardées

```typescript
// Dans n'importe quel composant
const { community, class: classData } = useAppData();

// Utiliser les données
const totalLessons =
  classData?.chapters?.reduce(
    (total, chapter) => total + (chapter.lessons?.length || 0),
    0
  ) || 0;
```

### Vérifier l'État de Chargement

```typescript
const { isLoading } = useAppData();

if (isLoading) {
  return <div>Récupération des données...</div>;
}
```

## Migration Future

Quand l'API Node.js sera prête, il suffira de :

1. Remplacer les repos InMemory par les repos NodeAPI
2. Modifier la fonction `getSavedData()` pour utiliser l'API
3. Adapter la gestion des erreurs réseau
4. Conserver la même interface pour les composants

## Dépannage

### Problèmes Courants

1. **Données non sauvegardées** : Vérifier que l'onboarding est terminé
2. **Erreurs localStorage** : Vérifier que le navigateur supporte localStorage
3. **Données non chargées** : Vérifier les clés dans le localStorage
4. **Erreurs de build** : Vérifier que les repos ne tentent pas d'accéder au localStorage côté serveur

### Debug

Utiliser la console du navigateur pour :

- Vérifier les clés localStorage
- Tester la fonction `getSavedData()`
- Vérifier les erreurs dans la console
