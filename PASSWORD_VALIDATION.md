# Validation du Mot de Passe

## Règles Implémentées

Les formulaires de connexion et d'inscription utilisent maintenant les règles de validation suivantes pour les mots de passe :

### Critères de Sécurité

- **Taille minimale** : 8 caractères minimum
- **Chiffres** : Au moins 1 chiffre (0-9)
- **Lettres minuscules** : Au moins 1 lettre minuscule (a-z)
- **Lettres majuscules** : Au moins 1 lettre majuscule (A-Z)
- **Symboles** : Au moins 1 symbole (!@#$%^&\*()\_+-=[]{}|;':",./<>?)

### Implémentation Technique

#### 1. Schémas de Validation (Zod)

- **SignupSchema** : Validation pour l'inscription
- **SigninSchema** : Validation pour la connexion
- Utilisation de `z.refine()` avec une fonction de validation personnalisée

#### 2. Fonction de Validation

```typescript
const validatePassword = (password: string) => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Le mot de passe doit faire au moins 8 caractères");
  }

  if (!/\d/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins 1 chiffre");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins 1 lettre minuscule");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins 1 lettre majuscule");
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins 1 symbole");
  }

  return errors.length === 0 ? true : errors.join(". ");
};
```

#### 3. Composant Visuel

- **PasswordRequirements** : Affiche les exigences en temps réel
- Indicateurs visuels (✅/❌) pour chaque critère
- S'affiche automatiquement dans le formulaire d'inscription
- S'affiche conditionnellement dans le formulaire de connexion

### Fichiers Modifiés

1. **`src/components/forms/index.ts`**

   - Ajout de la fonction `validatePassword`
   - Mise à jour des schémas `SignupSchema` et `SigninSchema`
   - Mise à jour des placeholders pour indiquer les exigences

2. **`src/components/ui/password-requirements.tsx`**

   - Nouveau composant pour afficher les exigences visuellement

3. **`src/app/inscriptions/1/_components/form.tsx`**

   - Intégration du composant `PasswordRequirements`
   - Affichage permanent des exigences

4. **`src/app/connection/_components/login-form.tsx`**
   - Intégration du composant `PasswordRequirements`
   - Affichage conditionnel des exigences

### Exemples de Mots de Passe Valides

- `Pass123!` ✅
- `MySecurePass1@` ✅
- `StrongPwd2024#` ✅
- `Complex!Pass2` ✅

### Exemples de Mots de Passe Invalides

- `password` ❌ (pas de chiffre, majuscule, symbole)
- `Password123` ❌ (pas de symbole)
- `pass123!` ❌ (pas de majuscule)
- `PASSWORD123!` ❌ (pas de minuscule)
- `abc123` ❌ (trop court, pas de majuscule, pas de symbole)

### Expérience Utilisateur

- **Placeholder informatif** : Indique clairement les exigences
- **Validation en temps réel** : Feedback immédiat sur la saisie
- **Indicateurs visuels** : Icônes claires pour chaque critère
- **Messages d'erreur détaillés** : Explique précisément ce qui manque

### Sécurité

Ces règles de validation améliorent significativement la sécurité des comptes utilisateurs en :

- Évitant les mots de passe trop simples
- Forçant la complexité des mots de passe
- Réduisant le risque d'attaque par force brute
- Respectant les bonnes pratiques de sécurité
