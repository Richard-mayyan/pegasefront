# Résumé des modifications - Processus d'onboarding

## Migration vers NodeCommunityRepo et NodeClassRepo

### Remplacement des repos InMemory

- ✅ Création du `NodeCommunityRepo` qui implémente `ICommunityRepo`
- ✅ Création du `NodeClassRepo` qui implémente `IClassRepo`
- ✅ Utilisation de l'`apiClient` pour les requêtes HTTP
- ✅ Gestion des erreurs robuste avec fallback
- ✅ Conversion automatique des DTOs de réponse vers les entités
- ✅ **Upload de fichiers** avec gestion automatique base64 → File
- ✅ **FormData** pour l'envoi de fichiers multipart
- ✅ **Support complet** des chapitres et leçons pour les classes

### Fichiers créés/modifiés

- **`src/logic/infra/repos/nodeapi/NodeCommunityRepo.ts`** : Nouvelle implémentation avec upload de fichiers
- **`src/logic/infra/repos/nodeapi/NodeClassRepo.ts`** : Nouvelle implémentation pour les classes
- **`src/logic/infra/repos/nodeapi/dtos.ts`** : DTOs de réponse pour communautés et classes
- **`src/logic/infra/di/container.ts`** : Remplacement des deux repos dans le container
- **`src/logic/infra/config/envs.ts`** : Configuration de l'URL de l'API
- **`src/logic/infra/repos/nodeapi/axios.ts`** : Modification pour supporter FormData

### Configuration requise

- **API backend** : Doit exposer les endpoints `/communities`
- **Variables d'environnement** : `NEXT_PUBLIC_API_URL` (défaut: `http://localhost:8000`)
- **Structure des données** : Compatible avec les DTOs définis

### Avantages de la migration

- 🔄 **Données persistantes** : Plus de perte de données au rechargement
- 🔄 **Partage des données** : Communautés accessibles à tous les utilisateurs
- 🔄 **Scalabilité** : Support de multiples utilisateurs et données
- 🔄 **Sécurité** : Validation et authentification côté serveur
- 🔄 **Architecture robuste** : Séparation claire des responsabilités
- 🔄 **Support complet** : Chapitres et leçons correctement gérés

## Corrections apportées

### Problème identifié

- ❌ La classe était créée mais sans chapitres et leçons
- ❌ Les interfaces DTO ne supportaient pas les chapitres et leçons
- ❌ Le repo InMemory ne traitait pas les chapitres lors de la création/mise à jour

### Solutions implémentées

#### 1. Mise à jour des interfaces DTO (src/logic/infra/repos/nodeapi/dtos.ts)

- ✅ Ajout de la propriété `chapters` à `CreateClassDto`
- ✅ Ajout de la propriété `chapters` à `UpdateClassDto`
- ✅ Structure complète avec chapitres et leçons imbriqués

#### 2. Mise à jour du InMemoryClassRepo (src/logic/infra/repos/inmemory/InMemoryClassRepo.ts)

- ✅ Modification de la méthode `create()` pour traiter les chapitres et leçons
- ✅ Modification de la méthode `update()` pour traiter les chapitres et leçons
- ✅ Génération automatique des IDs pour chapitres et leçons
- ✅ Sauvegarde complète dans le localStorage

#### 3. Simplification de la logique de création (src/app/onboarding/4/\_components/form.tsx)

- ✅ Suppression de la logique complexe de création puis mise à jour
- ✅ Création directe de la classe avec tous ses chapitres et leçons
- ✅ Passage des données complètes lors de la création

### Structure des données maintenant supportée

```typescript
interface CreateClassDto {
  name: string;
  description?: string;
  cover?: string;
  profil?: string;
  color?: string;
  content?: string;
  chapters?: Array<{
    name: string;
    active: boolean;
    publishedAt: string;
    lessons?: Array<{
      title: string;
      type: string;
      publishedAt: string;
      content: object;
    }>;
  }>;
}
```

### Flux de création corrigé

1. **Collecte des données** : Chapitres et leçons collectés dans le contexte d'onboarding
2. **Création de classe** : Une seule opération `classRepo.create()` avec toutes les données
3. **Sauvegarde automatique** : Chapitres et leçons automatiquement sauvegardés avec la classe
4. **Persistance** : Données sauvegardées dans le localStorage via InMemoryClassRepo

## Modifications apportées

### 1. Entité CommunityEntity (src/logic/domain/entities/index.ts)

- ✅ Ajout de la propriété `logo?: string` pour le logo de la communauté
- ✅ Ajout de la propriété `coverPhotos?: string[]` pour un tableau de photos de couverture (max 5)
- ✅ Ajout de la propriété `settings` avec les paramètres de configuration :
  - `communityDiscussion: boolean`
  - `studentListVisibility: boolean`
  - `groupMeeting: boolean`

### 2. Interface CreateCommunityDto (src/logic/domain/repos/CommunityRepo.tsx)

- ✅ Ajout des nouvelles propriétés `logo`, `coverPhotos` et `settings`
- ✅ Mise à jour de l'interface UpdateCommunityDto avec les mêmes propriétés

### 3. Contexte d'onboarding (src/app/onboarding/context/OnboardingContext.tsx)

- ✅ Ajout des nouvelles propriétés dans l'interface OnboardingData
- ✅ Mise à jour des données par défaut :
  - `color: "red"` (rouge par défaut)
  - `typography: "manrope"` (Manrope par défaut)
- ✅ Mise à jour de la fonction `getCommunityData()` pour retourner les nouvelles propriétés

### 4. Page onboarding/1 (src/app/onboarding/1/\_components/form.tsx)

- ✅ Implémentation de la sélection de logo avec prévisualisation et suppression
- ✅ Implémentation de la sélection de couverture avec prévisualisation et suppression
- ✅ La première photo de couverture sélectionnée est automatiquement ajoutée à la liste `coverPhotos`
- ✅ Couleur rouge sélectionnée par défaut
- ✅ Typographie Manrope sélectionnée par défaut
- ✅ Gestion des fichiers avec FileReader pour la conversion en base64

### 5. Page onboarding/2 (src/app/onboarding/2/\_components/form.tsx)

- ✅ Remplacement de l'image par défaut par une sélection de photos de couverture
- ✅ Limitation à 5 photos maximum
- ✅ Implémentation d'un vrai rich text editor qui sauvegarde le HTML
- ✅ Fonctionnalités de formatage : gras, italique, souligné, barré, titre, liste, citation, lien
- ✅ Aperçu HTML en temps réel
- ✅ Gestion de l'ajout et de la suppression de photos

### 6. Page onboarding/3 (src/app/onboarding/3/\_components/form.tsx)

- ✅ Interface exactement conforme à l'image fournie
- ✅ Trois options de configuration avec switches :
  - Discussion en communauté
  - Visibilité de la liste des étudiants
  - Meeting de groupe
- ✅ Boutons "Passer" et "Terminer la configuration"
- ✅ Utilisation du `communityRepo` pour créer la communauté
- ✅ Redirection vers onboarding/4 après création réussie

### 7. Page onboarding/4 (src/app/onboarding/4/\_components/form.tsx)

- ✅ Remplacement du bouton "Suivant" par "Créer leçon"
- ✅ Utilisation du `classRepo` pour créer une classe
- ✅ Création des chapitres et leçons associés
- ✅ Redirection vers `/lecon/2` après création réussie de la classe

## Fonctionnalités implémentées

### Sélection d'images

- Logo de la communauté (500x500px recommandé)
- Photos de couverture (1600x900px recommandé, max 5)
- Prévisualisation en temps réel
- Suppression facile avec bouton X

### Rich text editor

- Formatage HTML complet
- Sauvegarde du contenu HTML
- Aperçu en temps réel
- Barre d'outils intuitive

### Configuration de la communauté

- Paramètres de discussion
- Visibilité des étudiants
- Réunions de groupe
- Sauvegarde dans l'entité

### Flux de création

1. **onboarding/1** : Configuration de base (nom, logo, couverture, couleur, typographie)
2. **onboarding/2** : Photos de couverture et description riche
3. **onboarding/3** : Paramètres de configuration et création de la communauté
4. **onboarding/4** : Création de la classe et redirection vers `/lecon/2`

## Technologies utilisées

- React avec TypeScript
- React Query pour les mutations
- FileReader API pour la gestion des images
- Base64 pour le stockage des images
- HTML pour le rich text
- Tailwind CSS pour le styling

## Points d'attention

- Les images sont converties en base64 (peut être volumineux pour de grandes images)
- La validation des types de fichiers n'est que côté client
- Les IDs temporaires sont générés avec `Date.now() + Math.random()`
- La gestion d'erreur est basique avec toast notifications

## Gestion des communautés utilisateur

### AppDataProvider intelligent

L'`AppDataProvider` a été complètement refactorisé pour gérer les communautés de l'utilisateur connecté :

#### Fonctionnalités implémentées

- ✅ **Chargement automatique** des communautés depuis `user.communities`
- ✅ **Sélection de communauté** avec persistance dans le localStorage
- ✅ **Changement de communauté** avec rechargement automatique des classes
- ✅ **Fallback intelligent** : première communauté si aucune sélection
- ✅ **Gestion des erreurs** robuste avec états de chargement

#### Persistance des données

- **Clé localStorage** : `pegas_selected_community_id`
- **Sauvegarde automatique** lors du changement de communauté
- **Restauration automatique** au rechargement de la page

#### Flux de chargement optimisé

1. **Démarrage** → Récupération des communautés utilisateur
2. **Sélection** → Récupération de la communauté sélectionnée
3. **Fallback** → Première communauté si nécessaire
4. **Classes** → Chargement automatique des classes associées

### Composant CommunitySelector

Nouveau composant pour la sélection de communauté :

#### Caractéristiques

- ✅ **Interface intuitive** avec dropdown
- ✅ **Indicateurs visuels** (couleur, sélection active)
- ✅ **Informations complètes** (nom, description)
- ✅ **Changement automatique** avec persistance
- ✅ **Gestion des états** (chargement, erreur, vide)

#### Utilisation

```tsx
import { CommunitySelector } from "@/components/layouts/CommunitySelector";

<CommunitySelector className="ml-4" />;
```

## Page de confirmation de compte

### Inscriptions/2 - Confirmation par code

La page `/inscriptions/2` a été implémentée pour la confirmation de compte par code de vérification :

#### Fonctionnalités implémentées

- ✅ **Input email** : Saisie de l'adresse email de l'utilisateur
- ✅ **Input code OTP** : Saisie du code de vérification (6 caractères max)
- ✅ **Validation** : Vérification des champs obligatoires
- ✅ **Confirmation de compte** : Appel à `/auth/confirm-email` via `authRepo.confirmAccountWithCode`
- ✅ **Renvoi de code** : Appel à `/auth/request-email-verification` via `authRepo.resendCode`
- ✅ **Gestion des états** : Loading, erreurs, succès
- ✅ **Redirection** : Vers `/login` après confirmation réussie

#### Interface utilisateur

- **Design** : Correspond exactement à l'image fournie
- **Logo Pegase** : Affiché en haut à gauche
- **Titre** : "Nous vous avons envoyé un code. Entrez-le !"
- **Instructions** : Texte explicatif clair
- **Champs** : Email et code de vérification
- **Bouton** : "Continuer" avec état de chargement
- **Actions secondaires** : Renvoi de code et lien de connexion

#### API endpoints utilisés

- **POST** `/auth/confirm-email` : Confirmation du compte avec email + code
- **POST** `/auth/request-email-verification` : Renvoi du code de vérification

#### Structure des données

```typescript
// Confirmation de compte
interface ConfirmAccountDto {
  email: string;
  code: string;
}

// Renvoi de code
interface ResendCodeDto {
  email: string;
}
```

#### Gestion des erreurs

- **Validation** : Champs obligatoires
- **API** : Gestion des erreurs de confirmation et de renvoi
- **Feedback** : Messages d'erreur et de succès clairs
- **États** : Désactivation des boutons pendant les appels API

#### Flux utilisateur

1. **Saisie email** → L'utilisateur entre son adresse email
2. **Saisie code** → L'utilisateur entre le code reçu
3. **Confirmation** → Appel API pour confirmer le compte
4. **Succès** → Redirection vers la page de connexion
5. **Échec** → Affichage du message d'erreur
6. **Renvoi** → Possibilité de demander un nouveau code

## Page de mot de passe oublié

### Connection/2 - Mot de passe oublié

La page `/connection/2` a été implémentée pour la réinitialisation de mot de passe :

#### Fonctionnalités implémentées

- ✅ **Input email** : Saisie de l'adresse email de l'utilisateur
- ✅ **Validation** : Vérification du champ obligatoire
- ✅ **Réinitialisation** : Appel à `/auth/forgot-password` via `authRepo.forgotPassword`
- ✅ **Gestion des états** : Loading, erreurs, succès
- ✅ **Feedback utilisateur** : Messages de confirmation et d'erreur

#### Interface utilisateur

- **Design** : Cohérent avec les autres pages d'authentification
- **Logo Pegase** : Affiché en haut à gauche
- **Titre** : "Mot de passe oublié"
- **Instructions** : Texte explicatif clair
- **Champ** : Email avec validation
- **Bouton** : "Restaurer le mot de passe" avec état de chargement
- **Lien retour** : Vers la page de connexion

#### API endpoint utilisé

- **POST** `/auth/forgot-password` : Demande de réinitialisation de mot de passe

#### Structure des données

```typescript
interface ForgotPasswordDto {
  email: string;
}
```

#### Gestion des erreurs

- **Validation** : Champ email obligatoire
- **API** : Gestion des erreurs de réinitialisation
- **Feedback** : Messages d'erreur et de succès clairs
- **États** : Désactivation du bouton pendant l'appel API

#### Flux utilisateur

1. **Saisie email** → L'utilisateur entre son adresse email
2. **Soumission** → Appel API pour demander la réinitialisation
3. **Succès** → Message de confirmation
4. **Échec** → Affichage du message d'erreur
5. **Retour** → Lien vers la page de connexion

## Page de réinitialisation de mot de passe

### Connection/reset-password-submission - Réinitialisation finale

La page `/connection/reset-password-submission` a été implémentée pour la réinitialisation finale du mot de passe :

#### Fonctionnalités implémentées

- ✅ **Récupération automatique** : Email et code depuis les query params de l'URL
- ✅ **Champs de mot de passe** : Nouveau mot de passe + confirmation
- ✅ **Validation complète** : Vérification des champs et correspondance des mots de passe
- ✅ **Réinitialisation** : Appel à `/auth/reset-password` via `authRepo.resetPassword`
- ✅ **Gestion des états** : Loading, erreurs, succès
- ✅ **Redirection** : Vers la page de connexion après succès

#### Interface utilisateur

- **Design** : Cohérent avec les autres pages d'authentification
- **Logo Pegase** : Affiché en haut à gauche
- **Titre** : "Réinitialiser votre mot de passe"
- **Instructions** : Texte explicatif clair
- **Champs** : Email (readonly), code (readonly), nouveau mot de passe, confirmation
- **Bouton** : "Réinitialiser le mot de passe" avec état de chargement
- **Lien retour** : Vers la page de connexion

#### API endpoint utilisé

- **POST** `/auth/reset-password` : Réinitialisation finale du mot de passe

#### Structure des données

```typescript
interface ResetPasswordDto {
  email: string;
  code: string;
  password: string;
}
```

#### Gestion des erreurs

- **Validation** : Tous les champs obligatoires
- **Correspondance** : Vérification que les mots de passe correspondent
- **Longueur** : Mot de passe d'au moins 8 caractères
- **API** : Gestion des erreurs de réinitialisation
- **Feedback** : Messages d'erreur et de succès clairs
- **États** : Désactivation du bouton pendant l'appel API

#### Flux utilisateur

1. **Accès à l'URL** → Récupération automatique de l'email et du code
2. **Saisie mot de passe** → L'utilisateur entre son nouveau mot de passe
3. **Confirmation** → L'utilisateur confirme le nouveau mot de passe
4. **Validation** → Vérification des champs et correspondance
5. **Soumission** → Appel API pour réinitialiser le mot de passe
6. **Succès** → Message de confirmation et redirection
7. **Échec** → Affichage du message d'erreur

#### URL d'exemple

```
/connection/reset-password-submission?email=hello@pegase.com&code=1A2B3C
```
