# Étape 0 de l'Onboarding - Souscription Stripe

Cette étape a été ajoutée avant l'étape 1 existante pour permettre aux utilisateurs de souscrire à un plan et d'enregistrer leur carte de crédit via Stripe.

## Structure des fichiers

```
src/app/onboarding/0/
├── page.tsx                    # Page principale
├── _components/
│   ├── subscription-form.tsx   # Formulaire de souscription principal
│   ├── stripe-payment-form.tsx # Composant Stripe Elements
│   └── navigation-buttons.tsx  # Boutons de navigation
```

## Configuration requise

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Clés Stripe

- Obtenez vos clés Stripe depuis le [dashboard Stripe](https://dashboard.stripe.com/apikeys)
- Utilisez les clés de test pour le développement
- La clé publique doit commencer par `pk_test_` pour les tests

### 3. Backend

Assurez-vous que votre backend NestJS a :

- L'endpoint `/user/intent` configuré
- Le service Stripe configuré
- Les variables d'environnement Stripe configurées

## Fonctionnalités

### 1. Récupération du Payment Intent

- L'étape appelle automatiquement l'API `/api/user/intent` au chargement
- Récupère un `setupIntent` Stripe pour l'enregistrement de la carte
- Gère les erreurs et affiche un loader pendant le chargement

### 2. Formulaire Stripe Elements

- Utilise les composants officiels Stripe pour la sécurité
- Validation automatique des informations de carte
- Gestion des erreurs Stripe
- Style personnalisé avec le thème teal de l'application

### 3. Navigation

- Bouton "Retour" pour revenir à la page précédente
- Bouton "Passer cette étape" pour ignorer la souscription
- Redirection automatique vers l'étape suivante après succès

## Flux utilisateur

1. **Chargement** : L'utilisateur arrive sur `/onboarding/0`
2. **Récupération du Payment Intent** : L'API récupère un setupIntent Stripe
3. **Affichage du formulaire** : Le composant Stripe Elements s'affiche
4. **Saisie des informations** : L'utilisateur saisit sa carte et son nom
5. **Validation Stripe** : Stripe valide les informations de carte
6. **Succès** : Redirection vers l'étape suivante (`/onboarding/1`)

## Intégration avec l'existant

### 1. Navigation

- L'étape 0 est intégrée dans le système de navigation existant
- Les hooks `useOnboardingNavigation` ont été mis à jour
- La validation permet de passer directement à l'étape 1

### 2. Contexte

- Utilise le même `OnboardingProvider` que les autres étapes
- Maintient la cohérence avec le reste du processus d'onboarding

### 3. API

- Utilise la même structure d'API que le reste de l'application
- Gère l'authentification via le token stocké
- Appelle le backend NestJS existant

## Tests

### 1. Cartes de test Stripe

Utilisez ces cartes pour tester :

- **Succès** : `4242 4242 4242 4242`
- **Échec** : `4000 0000 0000 0002`
- **3D Secure** : `4000 0025 0000 3155`

### 2. Test de l'API

```bash
curl -X POST http://localhost:3001/user/intent \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": 5000, "currency": "eur"}'
```

## Dépannage

### 1. Erreur "Stripe n'est pas initialisé"

- Vérifiez que la clé publique Stripe est correcte
- Assurez-vous que le composant Elements est bien rendu

### 2. Erreur "Payment intent non disponible"

- Vérifiez que l'API backend fonctionne
- Vérifiez l'authentification et les tokens
- Vérifiez les logs du backend

### 3. Problèmes de style

- Les styles Stripe peuvent être personnalisés dans `stripe-payment-form.tsx`
- Utilisez les variables CSS Stripe pour la cohérence visuelle

## Sécurité

- Les informations de carte ne transitent jamais par votre serveur
- Stripe gère la conformité PCI DSS
- Utilisez toujours HTTPS en production
- Validez les tokens d'authentification côté serveur

## Prochaines étapes

1. **Webhooks Stripe** : Configurer les webhooks pour gérer les événements de paiement
2. **Gestion des erreurs** : Améliorer la gestion des erreurs de paiement
3. **Retry automatique** : Implémenter une logique de retry pour les échecs
4. **Analytics** : Ajouter du tracking pour les conversions
