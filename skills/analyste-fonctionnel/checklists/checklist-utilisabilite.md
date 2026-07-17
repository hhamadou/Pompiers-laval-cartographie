# Checklist d'Utilisabilité

## Introduction

Cette checklist est basée sur les **10 heuristiques d'utilisabilité de Nielsen** et les meilleures pratiques UX. Elle vous aide à évaluer et améliorer l'expérience utilisateur de vos interfaces.

**Objectif :** Créer des interfaces intuitives, efficaces et agréables à utiliser.

---

## 1. Visibilité de l'État du Système

Le système doit toujours tenir les utilisateurs informés de ce qui se passe, par un retour approprié dans un délai raisonnable.

### Checklist

- [ ] **Indicateurs de chargement** sont affichés pour les opérations longues (>1 seconde)
- [ ] **Barres de progression** montrent l'avancement des processus multi-étapes
- [ ] **Messages de confirmation** apparaissent après les actions importantes
- [ ] **État actuel** est clairement indiqué (page active, étape en cours)
- [ ] **Changements d'état** sont visuellement distincts (actif, inactif, sélectionné)
- [ ] **Notifications** informent des événements importants
- [ ] **Feedback immédiat** est fourni pour toutes les interactions

### Exemples

**Bon :**
- Spinner pendant le chargement
- "Enregistrement en cours..."
- Indicateur de page active dans le menu
- Badge de notification avec nombre

**Mauvais :**
- Aucun feedback après un clic
- Chargement silencieux sans indication
- État actuel non visible

---

## 2. Correspondance entre le Système et le Monde Réel

Le système doit parler le langage des utilisateurs, avec des mots, phrases et concepts familiers plutôt que des termes techniques.

### Checklist

- [ ] **Terminologie** correspond au vocabulaire des utilisateurs
- [ ] **Métaphores** sont familières et appropriées
- [ ] **Icônes** sont reconnaissables et conventionnelles
- [ ] **Messages** sont rédigés en langage naturel
- [ ] **Ordre logique** suit les conventions du monde réel
- [ ] **Unités de mesure** sont appropriées au contexte
- [ ] **Formats de date/heure** respectent les conventions locales

### Exemples

**Bon :**
- "Supprimer" plutôt que "Effacer de la base de données"
- Icône de corbeille pour supprimer
- "Panier" pour e-commerce
- Format de date : JJ/MM/AAAA (selon la région)

**Mauvais :**
- Jargon technique incompréhensible
- Icônes abstraites sans signification claire
- Termes système (ex: "Désallouer la ressource")

---

## 3. Contrôle et Liberté de l'Utilisateur

Les utilisateurs font souvent des erreurs. Ils ont besoin d'une "sortie de secours" clairement marquée pour quitter un état non désiré.

### Checklist

- [ ] **Bouton Annuler** disponible pour les actions en cours
- [ ] **Fonction Annuler/Refaire** pour les modifications
- [ ] **Confirmation** avant les actions destructives
- [ ] **Sortie facile** des processus multi-étapes
- [ ] **Sauvegarde automatique** des brouillons
- [ ] **Navigation arrière** fonctionne correctement
- [ ] **Fermeture des modales** avec X, Esc ou clic extérieur

### Exemples

**Bon :**
- "Êtes-vous sûr de vouloir supprimer ?"
- Bouton "Annuler" visible à côté de "Enregistrer"
- Ctrl+Z pour annuler
- Brouillon sauvegardé automatiquement

**Mauvais :**
- Suppression immédiate sans confirmation
- Pas de moyen d'annuler une action
- Processus sans possibilité de sortie

---

## 4. Cohérence et Standards

Les utilisateurs ne devraient pas se demander si différents mots, situations ou actions signifient la même chose.

### Checklist

- [ ] **Terminologie cohérente** dans toute l'application
- [ ] **Composants UI** utilisés de manière cohérente
- [ ] **Placement des éléments** est prévisible
- [ ] **Conventions de la plateforme** sont respectées
- [ ] **Icônes** ont toujours la même signification
- [ ] **Couleurs** ont une signification cohérente
- [ ] **Actions similaires** produisent des résultats similaires

### Exemples

**Bon :**
- Bouton primaire toujours à droite
- Icône de corbeille toujours pour supprimer
- Vert = succès, Rouge = erreur partout
- "Enregistrer" plutôt que "Sauvegarder" parfois

**Mauvais :**
- "Soumettre" sur une page, "Envoyer" sur une autre
- Bouton primaire à gauche puis à droite
- Icônes différentes pour la même action

---

## 5. Prévention des Erreurs

Mieux vaut prévenir les erreurs que de fournir de bons messages d'erreur.

### Checklist

- [ ] **Validation en temps réel** des champs de formulaire
- [ ] **Contraintes** empêchent les saisies invalides
- [ ] **Suggestions** aident à la saisie correcte
- [ ] **Valeurs par défaut** sensées sont proposées
- [ ] **Désactivation** des actions non disponibles
- [ ] **Confirmation** pour les actions critiques
- [ ] **Aide contextuelle** prévient les erreurs courantes

### Exemples

**Bon :**
- Champ de date avec calendrier
- Liste déroulante plutôt que saisie libre
- "Le mot de passe doit contenir..." avant la saisie
- Bouton "Supprimer" désactivé si rien n'est sélectionné

**Mauvais :**
- Champ libre pour une date (risque d'erreur de format)
- Aucune indication du format attendu
- Possibilité de soumettre un formulaire vide

---

## 6. Reconnaissance plutôt que Rappel

Minimiser la charge cognitive en rendant les objets, actions et options visibles. L'utilisateur ne devrait pas avoir à se souvenir d'informations.

### Checklist

- [ ] **Options visibles** plutôt que mémorisées
- [ ] **Historique** des actions récentes accessible
- [ ] **Suggestions** basées sur l'historique
- [ ] **Tooltips** rappellent la fonction des éléments
- [ ] **Fil d'Ariane** montre la position actuelle
- [ ] **Raccourcis** affichés à côté des actions
- [ ] **Valeurs précédentes** pré-remplies quand pertinent

### Exemples

**Bon :**
- Historique de recherche visible
- Derniers fichiers ouverts listés
- Tooltip sur les icônes
- Fil d'Ariane : Accueil > Produits > Catégorie

**Mauvais :**
- Commandes cachées à mémoriser
- Pas d'indication de la position dans le site
- Aucun historique des actions

---

## 7. Flexibilité et Efficacité d'Utilisation

Des raccourcis pour les utilisateurs experts peuvent accélérer l'interaction, tout en restant invisible pour les novices.

### Checklist

- [ ] **Raccourcis clavier** pour les actions fréquentes
- [ ] **Actions en masse** disponibles
- [ ] **Personnalisation** de l'interface possible
- [ ] **Recherche avancée** pour les utilisateurs experts
- [ ] **Favoris/Épingles** pour accès rapide
- [ ] **Modèles** pour les tâches répétitives
- [ ] **Chemins multiples** pour atteindre le même objectif

### Exemples

**Bon :**
- Ctrl+S pour enregistrer
- Sélection multiple avec Shift
- Filtres avancés repliables
- "Répéter la dernière action"

**Mauvais :**
- Une seule façon d'accomplir une tâche
- Pas de raccourcis pour les actions fréquentes
- Impossible de personnaliser l'interface

---

## 8. Design Esthétique et Minimaliste

Les interfaces ne devraient pas contenir d'informations non pertinentes ou rarement nécessaires.

### Checklist

- [ ] **Contenu essentiel** mis en avant
- [ ] **Hiérarchie visuelle** claire
- [ ] **Espaces blancs** utilisés efficacement
- [ ] **Informations secondaires** repliables ou masquées
- [ ] **Distractions** minimisées
- [ ] **Densité d'information** appropriée
- [ ] **Design épuré** sans éléments superflus

### Exemples

**Bon :**
- Titre principal en gros, détails en petit
- Sections repliables pour infos avancées
- Espacement généreux entre éléments
- Focus sur l'action principale

**Mauvais :**
- Trop d'informations à l'écran
- Tout au même niveau d'importance
- Interface encombrée et confuse
- Animations distrayantes

---

## 9. Aide à la Reconnaissance, au Diagnostic et à la Récupération des Erreurs

Les messages d'erreur doivent être exprimés en langage clair, indiquer précisément le problème et suggérer une solution.

### Checklist

- [ ] **Messages d'erreur clairs** et compréhensibles
- [ ] **Localisation** précise de l'erreur
- [ ] **Cause** de l'erreur expliquée
- [ ] **Solution** suggérée
- [ ] **Ton positif** et non accusateur
- [ ] **Icônes** appropriées (⚠️ avertissement, ❌ erreur)
- [ ] **Liens d'aide** vers plus d'informations

### Exemples

**Bon :**
```
❌ Adresse courriel invalide
Le format attendu est : exemple@domaine.com
Veuillez vérifier votre saisie.
```

**Mauvais :**
```
Erreur 422: Validation failed
```

### Types de Messages

**Succès :**
- Ton positif et encourageant
- Confirmation claire de l'action
- Prochaines étapes si applicable

**Avertissement :**
- Ton informatif, pas alarmiste
- Conséquences potentielles
- Options pour continuer ou annuler

**Erreur :**
- Ton neutre, pas accusateur
- Explication claire du problème
- Solution concrète proposée

---

## 10. Aide et Documentation

Même si le système devrait être utilisable sans documentation, il peut être nécessaire de fournir de l'aide.

### Checklist

- [ ] **Aide contextuelle** accessible facilement
- [ ] **Tooltips** sur les éléments complexes
- [ ] **FAQ** pour les questions courantes
- [ ] **Tutoriels** pour les nouvelles fonctionnalités
- [ ] **Recherche** dans l'aide
- [ ] **Exemples concrets** fournis
- [ ] **Support** facilement accessible

### Exemples

**Bon :**
- Icône (?) à côté des champs complexes
- "Besoin d'aide ?" toujours visible
- Tutoriel interactif au premier usage
- Exemples de saisie dans les placeholders

**Mauvais :**
- Documentation cachée ou inexistante
- Aide générique non contextuelle
- Pas d'exemples concrets

---

## 11. Évaluation de l'Utilisabilité

### 11.1 Métriques d'Utilisabilité

#### Efficacité

- [ ] **Temps de complétion** des tâches est acceptable
- [ ] **Nombre d'étapes** est minimisé
- [ ] **Taux de réussite** des tâches est élevé (>90%)

#### Efficience

- [ ] **Nombre de clics** est optimisé
- [ ] **Temps d'apprentissage** est court
- [ ] **Productivité** augmente avec l'usage

#### Satisfaction

- [ ] **Score de satisfaction** (SUS) > 68
- [ ] **Taux de recommandation** (NPS) positif
- [ ] **Retours utilisateurs** majoritairement positifs

### 11.2 Tests d'Utilisabilité

#### Tests Modérés

- [ ] **Scénarios de test** définis
- [ ] **Participants représentatifs** recrutés
- [ ] **Observations** documentées
- [ ] **Problèmes** identifiés et priorisés

#### Tests Non Modérés

- [ ] **Tests à distance** configurés
- [ ] **Métriques** collectées automatiquement
- [ ] **Enregistrements** analysés

#### Tests A/B

- [ ] **Variantes** définies
- [ ] **Métriques** de succès établies
- [ ] **Résultats** statistiquement significatifs

---

## 12. Checklist par Type d'Interface

### Formulaires

- [ ] Labels clairs et descriptifs
- [ ] Champs groupés logiquement
- [ ] Ordre de tabulation logique
- [ ] Validation en temps réel
- [ ] Messages d'erreur spécifiques
- [ ] Indication des champs obligatoires
- [ ] Boutons d'action clairement identifiés
- [ ] Sauvegarde automatique des brouillons
- [ ] Confirmation avant soumission (si critique)

### Navigation

- [ ] Structure claire et prévisible
- [ ] Indicateur de position actuelle
- [ ] Fil d'Ariane si hiérarchie profonde
- [ ] Recherche accessible
- [ ] Menu responsive sur mobile
- [ ] Liens descriptifs
- [ ] Pas de liens morts

### Tableaux de Données

- [ ] En-têtes de colonnes clairs
- [ ] Tri et filtrage disponibles
- [ ] Pagination si nombreuses lignes
- [ ] Actions en masse possibles
- [ ] Recherche dans le tableau
- [ ] Export des données (CSV, PDF)
- [ ] Responsive sur mobile

### Modales et Dialogues

- [ ] Objectif clair
- [ ] Fermeture facile (X, Esc, clic extérieur)
- [ ] Actions principales visibles
- [ ] Pas de modales imbriquées
- [ ] Contenu concis
- [ ] Focus automatique sur le premier élément

### Notifications

- [ ] Visibles mais non intrusives
- [ ] Durée appropriée (3-5 secondes)
- [ ] Possibilité de fermer manuellement
- [ ] Positionnement cohérent
- [ ] Icônes appropriées
- [ ] Pas de notifications excessives

---

## 13. Responsive Design

### Mobile

- [ ] **Touch targets** minimum 44x44px
- [ ] **Espacement** suffisant entre éléments
- [ ] **Navigation** adaptée (menu hamburger)
- [ ] **Formulaires** optimisés pour mobile
- [ ] **Clavier virtuel** approprié (email, tel, number)
- [ ] **Orientation** supportée (portrait/paysage)
- [ ] **Gestes** intuitifs (swipe, pinch)

### Tablette

- [ ] **Layout** adapté à l'écran moyen
- [ ] **Navigation** hybride (menu + hamburger)
- [ ] **Interactions** tactiles et souris supportées

### Desktop

- [ ] **Utilisation** de l'espace écran optimale
- [ ] **Raccourcis clavier** disponibles
- [ ] **Hover states** pour feedback
- [ ] **Multi-colonnes** si approprié

---

## 14. Performance et Chargement

### Temps de Chargement

- [ ] **Page initiale** < 3 secondes
- [ ] **Interactions** < 100ms de latence
- [ ] **Feedback** immédiat (<100ms)
- [ ] **Chargement progressif** pour contenu lourd

### Optimisations

- [ ] **Images** optimisées et lazy-loaded
- [ ] **Fonts** chargées efficacement
- [ ] **JavaScript** minifié et différé
- [ ] **Cache** utilisé intelligemment
- [ ] **CDN** pour ressources statiques

### États de Chargement

- [ ] **Skeleton screens** pour contenu
- [ ] **Spinners** pour actions
- [ ] **Barres de progression** pour uploads
- [ ] **Messages** informatifs pendant l'attente

---

## 15. Contenu et Rédaction

### Clarté

- [ ] **Langage simple** et direct
- [ ] **Phrases courtes** (<20 mots)
- [ ] **Voix active** privilégiée
- [ ] **Jargon** évité ou expliqué

### Structure

- [ ] **Titres** descriptifs et hiérarchisés
- [ ] **Paragraphes** courts (3-4 lignes)
- [ ] **Listes** pour énumérations
- [ ] **Mise en gras** pour mots-clés

### Ton

- [ ] **Cohérent** dans toute l'application
- [ ] **Approprié** au contexte
- [ ] **Positif** et encourageant
- [ ] **Respectueux** de l'utilisateur

---

## 16. Outils d'Évaluation

### Outils Automatisés

- **Google Lighthouse** : Audit de performance et UX
- **Hotjar** : Heatmaps et enregistrements de sessions
- **Google Analytics** : Comportement utilisateur
- **Crazy Egg** : Heatmaps et A/B testing

### Outils de Test Utilisateur

- **UserTesting** : Tests utilisateurs à distance
- **Maze** : Tests de prototypes
- **Optimal Workshop** : Card sorting, tree testing
- **UsabilityHub** : Tests rapides (5 secondes, clics)

### Questionnaires

- **SUS (System Usability Scale)** : Score d'utilisabilité
- **NPS (Net Promoter Score)** : Satisfaction client
- **SUPR-Q** : Qualité de l'expérience utilisateur
- **Questionnaires personnalisés** : Besoins spécifiques

---

## 17. Priorisation des Problèmes

### Matrice de Sévérité

| Sévérité | Fréquence | Impact | Priorité |
|----------|-----------|--------|----------|
| Critique | Élevée | Bloquant | P0 - Immédiat |
| Majeure | Élevée | Important | P1 - Urgent |
| Majeure | Faible | Important | P2 - Haute |
| Mineure | Élevée | Gênant | P2 - Haute |
| Mineure | Faible | Gênant | P3 - Moyenne |
| Cosmétique | Toute | Mineur | P4 - Basse |

### Critères de Priorisation

**P0 - Critique :**
- Empêche l'accomplissement de tâches principales
- Affecte la majorité des utilisateurs
- Aucun contournement possible

**P1 - Urgent :**
- Impact significatif sur l'expérience
- Affecte de nombreux utilisateurs
- Contournement difficile

**P2 - Haute :**
- Impact modéré
- Affecte certains utilisateurs
- Contournement possible mais peu pratique

**P3 - Moyenne :**
- Impact faible
- Affecte peu d'utilisateurs
- Contournement facile

**P4 - Basse :**
- Impact cosmétique
- N'affecte pas la fonctionnalité
- Amélioration "nice to have"

---

## 18. Rapport d'Évaluation

### Structure du Rapport

1. **Résumé Exécutif**
   - Score global d'utilisabilité
   - Problèmes critiques identifiés
   - Recommandations principales

2. **Méthodologie**
   - Méthodes utilisées
   - Participants (nombre, profils)
   - Scénarios testés

3. **Résultats Détaillés**
   - Problèmes identifiés par heuristique
   - Captures d'écran
   - Citations des utilisateurs

4. **Recommandations**
   - Solutions proposées
   - Priorisation
   - Effort estimé

5. **Annexes**
   - Données brutes
   - Enregistrements
   - Questionnaires

---

## Conseils d'Utilisation

1. **Évaluez régulièrement** : L'utilisabilité n'est pas un état final
2. **Impliquez les utilisateurs** : Testez avec de vrais utilisateurs
3. **Priorisez** : Corrigez d'abord les problèmes critiques
4. **Itérez** : Améliorez continuellement
5. **Documentez** : Gardez une trace des décisions UX
6. **Formez l'équipe** : Sensibilisez tous les intervenants
7. **Mesurez** : Utilisez des métriques objectives
8. **Benchmarkez** : Comparez avec les standards de l'industrie