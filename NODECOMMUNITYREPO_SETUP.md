# Configuration du NodeCommunityRepo et NodeClassRepo

## Vue d'ensemble

Le `NodeCommunityRepo` et le `NodeClassRepo` remplacent les implémentations InMemory et utilisent votre `apiClient` pour communiquer avec votre API backend Node.js.

## Fichiers modifiés

### 1. `src/logic/infra/repos/nodeapi/NodeCommunityRepo.ts` ✅

- Nouvelle implémentation qui implémente `ICommunityRepo`
- Utilise l'`apiClient` pour les requêtes HTTP
- Gère la conversion des DTOs de réponse vers les entités
- **Upload de fichiers** avec gestion automatique base64 → File
- **FormData** pour l'envoi de fichiers multipart

### 2. `src/logic/infra/repos/nodeapi/NodeClassRepo.ts` ✅

- Nouvelle implémentation qui implémente `IClassRepo`
- Utilise l'`apiClient` pour les requêtes HTTP
- Gère la conversion des DTOs de réponse vers les entités
- Support complet des chapitres et leçons

### 3. `src/logic/infra/repos/nodeapi/dtos.ts` ✅

- Ajout des DTOs de réponse pour les communautés :
  - `CommunityResponseDto`
  - `CommunityListResponseDto`
  - `CommunitySingleResponseDto`
- Ajout des DTOs de réponse pour les classes :
  - `ClassResponseDto`
  - `ClassListResponseDto`
  - `ClassSingleResponseDto`

### 4. `src/logic/infra/di/container.ts` ✅

- Remplacement de `InMemoryCommunityRepo` par `NodeCommunityRepo`
- Remplacement de `InMemoryClassRepo` par `NodeClassRepo`

### 5. `src/logic/infra/config/envs.ts` ✅

- Configuration de l'URL de l'API (défaut: `http://localhost:8000`)

### 6. `src/logic/infra/repos/nodeapi/axios.ts` ✅

- Modification pour supporter FormData
- Gestion automatique du Content-Type

## Configuration requise

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# URL de votre API backend
NEXT_PUBLIC_API_URL=http://localhost:8000

# Autres variables
NODE_ENV=development
```

### Endpoints API requis

Votre API backend doit exposer les endpoints suivants :

#### Communautés

```
POST   /communities     - Créer une communauté
GET    /communities     - Lister toutes les communautés
GET    /communities/:id - Récupérer une communauté
PUT    /communities/:id - Mettre à jour une communauté
DELETE /communities/:id - Supprimer une communauté
```

#### Classes

```
POST   /classes         - Créer une classe
GET    /classes         - Lister toutes les classes
GET    /classes/:id     - Récupérer une classe
PUT    /classes/:id     - Mettre à jour une classe
DELETE /classes/:id     - Supprimer une classe
```

## Structure des données

### Requête de création

```typescript
interface CreateCommunityDto {
  name: string;
  description?: string;
  cover?: string;
  profil?: string;
  logo?: string;
  coverPhotos?: string[];
  color?: string;
  typography?: string;
  settings?: {
    communityDiscussion: boolean;
    studentListVisibility: boolean;
    groupMeeting: boolean;
  };
}
```

### Réponse de l'API

```typescript
interface CommunityResponseDto {
  id: string;
  name: string;
  description?: string;
  cover?: string;
  profil?: string;
  logo?: string;
  coverPhotos?: string[];
  color?: string;
  typography?: string;
  settings?: {
    communityDiscussion: boolean;
    studentListVisibility: boolean;
    groupMeeting: boolean;
  };
  classes?: any[];
  members?: any[];
  createdAt: string;
  updatedAt: string;
}
```

## Gestion des erreurs

Le `NodeCommunityRepo` gère les erreurs de manière robuste :

- **Erreurs de réseau** : Logs détaillés dans la console
- **Erreurs de réponse** : Messages d'erreur utilisateur via toast
- **Fallback** : Retour à l'implémentation InMemory si nécessaire

## Test de la configuration

### 1. Bouton de test

Un bouton "Test API" a été ajouté à la page onboarding/3 pour vérifier la connexion.

### 2. Console du navigateur

Vérifiez les logs pour voir :

- L'URL de l'API utilisée
- Les données envoyées
- Les réponses reçues

### 3. Test de création

Tentez de créer une communauté via le processus d'onboarding pour vérifier que tout fonctionne.

## Dépannage

### Erreur "Impossible de se connecter à l'API"

- Vérifiez que votre API backend est en cours d'exécution
- Vérifiez l'URL dans `.env.local`
- Vérifiez que le port est correct (par défaut: 8000)

### Erreur "API accessible mais erreur de réponse"

- Vérifiez que vos endpoints API sont correctement implémentés
- Vérifiez la structure des réponses
- Vérifiez les codes de statut HTTP

### Erreur "Impossible de créer la communauté"

- Vérifiez la structure des données envoyées
- Vérifiez la validation côté serveur
- Vérifiez les logs de l'API backend

## Migration depuis InMemory

### Avantages

- ✅ Données persistantes dans la base de données
- ✅ Partage des données entre utilisateurs
- ✅ Scalabilité
- ✅ Sécurité renforcée

### Inconvénients

- ❌ Dépendance à l'API backend
- ❌ Latence réseau
- ❌ Gestion des erreurs plus complexe

## Prochaines étapes

1. **Implémenter l'API backend** avec les endpoints requis
2. **Tester la création** de communautés
3. **Implémenter les autres repos** (ClassRepo, UserRepo, etc.)
4. **Ajouter la gestion d'erreur** avancée
5. **Implémenter le cache** côté client si nécessaire

## Gestion des communautés utilisateur

### AppDataProvider modifié

L'`AppDataProvider` a été modifié pour gérer automatiquement les communautés de l'utilisateur connecté :

#### Fonctionnalités

- ✅ **Chargement automatique** des communautés depuis `user.communities`
- ✅ **Sélection de communauté** avec persistance dans le localStorage
- ✅ **Changement de communauté** avec rechargement automatique des classes
- ✅ **Fallback intelligent** : première communauté si aucune sélection

#### Clés localStorage

- `pegas_selected_community_id` : ID de la communauté actuellement sélectionnée

#### Flux de chargement

1. **Démarrage** : Récupération des communautés de l'utilisateur
2. **Sélection** : Récupération de la communauté sélectionnée depuis localStorage
3. **Fallback** : Première communauté si aucune sélection ou si la sélection n'existe plus
4. **Classes** : Chargement automatique des classes de la communauté sélectionnée

### Composant CommunitySelector

Un nouveau composant `CommunitySelector` permet de changer de communauté :

#### Utilisation

```tsx
import { CommunitySelector } from "@/components/layouts/CommunitySelector";

// Dans votre composant
<CommunitySelector className="ml-4" />;
```

#### Fonctionnalités

- ✅ **Dropdown** avec liste des communautés disponibles
- ✅ **Indicateur visuel** de la communauté sélectionnée
- ✅ **Couleur personnalisée** de chaque communauté
- ✅ **Description** de chaque communauté
- ✅ **Changement automatique** avec persistance

## Méthodes d'authentification

### NodeAuthRepo

Le `NodeAuthRepo` implémente toutes les méthodes d'authentification via l'API :

#### Méthodes disponibles

- ✅ **login** : Connexion utilisateur (`POST /auth/login`)
- ✅ **register** : Inscription utilisateur (`POST /auth/register`)
- ✅ **confirmAccountWithCode** : Confirmation de compte (`POST /auth/confirm-email`)
- ✅ **resendCode** : Renvoi de code de vérification (`POST /auth/request-email-verification`)
- ✅ **forgotPassword** : Demande de réinitialisation de mot de passe (`POST /auth/forgot-password`)
- ✅ **resetPassword** : Réinitialisation finale du mot de passe (`POST /auth/reset-password`)
- ✅ **getProfile** : Récupération du profil utilisateur (`GET /user/me`)

#### Endpoints API requis

```typescript
// Authentification
POST / auth / login;
POST / auth / register;
POST / auth / confirm - email;
POST / auth / request - email - verification;
POST / auth / forgot - password;
POST / auth / reset - password;

// Profil utilisateur
GET / user / me;
```

#### Structure des données

```typescript
// Connexion
interface LoginData {
  email: string;
  password: string;
}

// Inscription
interface RegisterDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profile: string;
}

// Confirmation de compte
interface ConfirmAccountDto {
  email: string;
  code: string;
}

// Renvoi de code
interface ResendCodeDto {
  email: string;
}

// Mot de passe oublié
interface ForgotPasswordDto {
  email: string;
}

// Réinitialisation de mot de passe
interface ResetPasswordDto {
  email: string;
  code: string;
  password: string;
}
```

#### Gestion des réponses

- **Login** : Retourne `{ access_token, user }`
- **Register** : Retourne l'utilisateur créé
- **ConfirmAccount** : Retourne l'utilisateur confirmé
- **ResendCode** : Pas de retour (void)
- **ForgotPassword** : Pas de retour (void)
- **ResetPassword** : Pas de retour (void)
- **GetProfile** : Retourne le profil utilisateur avec communautés

## Upload de fichiers

### Gestion automatique des fichiers

Le `NodeCommunityRepo` gère automatiquement la conversion des données base64 en fichiers pour l'upload :

#### Conversion base64 → File

- **Logo** : Converti en fichier `logo.png`
- **Images de couverture** : Converties en fichiers `cover-0.png`, `cover-1.png`, etc.
- **Couverture principale** : Ajoutée aux images si présente

#### Structure FormData envoyée

```typescript
// Données textuelles
formData.append("name", "Nom de la communauté");
formData.append("description", "Description...");
formData.append("color", "red");
formData.append("typography", "manrope");

// Paramètres de configuration
formData.append("communityDiscussion", "true");
formData.append("studentListVisibility", "true");
formData.append("groupMeeting", "true");

// Fichiers
formData.append("logo", logoFile);
formData.append("images", coverImage1);
formData.append("images", coverImage2);
// ... jusqu'à 10 images maximum
```

### API Client modifié

L'`apiClient` a été modifié pour :

- ✅ Ne pas forcer le `Content-Type: application/json`
- ✅ Détecter automatiquement les `FormData`
- ✅ Ajouter le bon `Content-Type` selon le type de données

### Endpoints API requis
