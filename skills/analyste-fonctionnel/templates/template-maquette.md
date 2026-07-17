# Template de Maquette d'Interface

## Informations du Document

| Champ | Valeur |
|-------|--------|
| **Projet** | [Nom du projet] |
| **Nom de l'écran/page** | [Nom de l'interface] |
| **Version** | [X.Y] |
| **Date** | [AAAA-MM-JJ] |
| **Designer/Analyste** | [Nom] |
| **Statut** | [Brouillon / En révision / Approuvé] |

---

## 1. Contexte et Objectif

### 1.1 Objectif de l'Interface

[Décrire l'objectif principal de cette interface]

**Exemple :**
> Cette interface permet aux utilisateurs de soumettre une nouvelle demande de service en remplissant un formulaire structuré et en joignant les documents nécessaires.

### 1.2 Utilisateurs Cibles

| Type d'utilisateur | Niveau d'expertise | Fréquence d'utilisation |
|-------------------|-------------------|------------------------|
| [Type 1] | [Débutant/Intermédiaire/Expert] | [Quotidienne/Hebdomadaire/Occasionnelle] |
| [Type 2] | [Débutant/Intermédiaire/Expert] | [Quotidienne/Hebdomadaire/Occasionnelle] |

### 1.3 Cas d'Usage Principal

[Référence au cas d'usage : CU-XXX]

**Scénario principal :**
1. L'utilisateur [action 1]
2. Le système [réaction 1]
3. L'utilisateur [action 2]
4. [etc.]

---

## 2. Structure de l'Interface

### 2.1 Hiérarchie de l'Information

```
Page/Écran Principal
├── En-tête
│   ├── Logo/Branding
│   ├── Navigation principale
│   └── Actions utilisateur (profil, notifications)
├── Fil d'Ariane
├── Titre de la page
├── Zone de contenu principal
│   ├── Section 1
│   ├── Section 2
│   └── Section 3
├── Barre latérale (si applicable)
└── Pied de page
```

### 2.2 Zones Fonctionnelles

| Zone | Fonction | Priorité |
|------|----------|----------|
| [Zone 1] | [Description] | [Haute/Moyenne/Faible] |
| [Zone 2] | [Description] | [Haute/Moyenne/Faible] |
| [Zone 3] | [Description] | [Haute/Moyenne/Faible] |

---

## 3. Maquette Wireframe

### 3.1 Vue Desktop (≥1280px)

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo]              Navigation              [Profil] [🔔]   │
├─────────────────────────────────────────────────────────────┤
│ Accueil > Section > Page actuelle                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Titre de la Page                          [Action Primaire]│
│  ─────────────────                                          │
│                                                              │
│  ┌────────────────────────────────────┐  ┌───────────────┐ │
│  │                                    │  │               │ │
│  │  Zone de Contenu Principal         │  │  Barre        │ │
│  │                                    │  │  Latérale     │ │
│  │  [Formulaire/Liste/Tableau]        │  │               │ │
│  │                                    │  │  - Info 1     │ │
│  │                                    │  │  - Info 2     │ │
│  │                                    │  │  - Info 3     │ │
│  │                                    │  │               │ │
│  └────────────────────────────────────┘  └───────────────┘ │
│                                                              │
│  [Bouton Secondaire]              [Bouton Primaire]         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Pied de page - Liens - Copyright                            │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Vue Tablette (768px - 1279px)

```
┌──────────────────────────────────────┐
│ [☰] [Logo]           [Profil] [🔔]  │
├──────────────────────────────────────┤
│ Accueil > Section > Page             │
├──────────────────────────────────────┤
│                                      │
│  Titre de la Page                    │
│  ─────────────────                   │
│                    [Action Primaire] │
│                                      │
│  ┌────────────────────────────────┐ │
│  │                                │ │
│  │  Zone de Contenu Principal     │ │
│  │                                │ │
│  │  [Formulaire/Liste]            │ │
│  │                                │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  Barre Latérale (repliée)      │ │
│  └────────────────────────────────┘ │
│                                      │
│  [Bouton Secondaire]                 │
│  [Bouton Primaire]                   │
│                                      │
└──────────────────────────────────────┘
```

### 3.3 Vue Mobile (<768px)

```
┌────────────────────┐
│ [☰]  [Logo]  [🔔] │
├────────────────────┤
│                    │
│  Titre de la Page  │
│  ─────────────     │
│                    │
│  ┌──────────────┐ │
│  │              │ │
│  │  Contenu     │ │
│  │  Principal   │ │
│  │              │ │
│  │  [Formulaire]│ │
│  │              │ │
│  └──────────────┘ │
│                    │
│  [Action Primaire] │
│  [Action Second.]  │
│                    │
└────────────────────┘
```

---

## 4. Composants de l'Interface

### 4.1 En-tête

**Éléments :**
- Logo/Branding (lien vers accueil)
- Navigation principale
- Recherche (si applicable)
- Notifications
- Menu utilisateur

**Comportement :**
- Fixe en haut lors du défilement
- Menu hamburger sur mobile
- Indicateur de notifications non lues

### 4.2 Navigation

**Type de navigation :**
- [ ] Navigation horizontale
- [ ] Navigation verticale
- [ ] Menu hamburger (mobile)
- [ ] Mega menu
- [ ] Fil d'Ariane

**Éléments de navigation :**
1. [Élément 1] → [Destination]
2. [Élément 2] → [Destination]
3. [Élément 3] → [Destination]

### 4.3 Zone de Contenu Principal

#### Section 1 : [Nom de la section]

**Composants :**
- [Composant 1] : [Description]
- [Composant 2] : [Description]

**Layout :**
- [ ] Une colonne
- [ ] Deux colonnes
- [ ] Trois colonnes
- [ ] Grille responsive

#### Section 2 : [Nom de la section]

[Répéter pour chaque section]

---

## 5. Formulaires et Champs

### 5.1 Champs du Formulaire

| Champ | Type | Obligatoire | Validation | Placeholder/Aide |
|-------|------|-------------|------------|------------------|
| [Nom] | Texte | Oui | Max 100 car. | "Entrez votre nom complet" |
| [Email] | Email | Oui | Format email | "exemple@domaine.com" |
| [Date] | Date | Non | Date future | "JJ/MM/AAAA" |
| [Fichier] | Upload | Non | PDF, max 5MB | "Glisser-déposer ou cliquer" |

### 5.2 Groupement des Champs

**Groupe 1 : Informations personnelles**
- Champ 1
- Champ 2
- Champ 3

**Groupe 2 : Informations de contact**
- Champ 4
- Champ 5

### 5.3 Validation et Messages d'Erreur

| Champ | Condition d'erreur | Message d'erreur |
|-------|-------------------|------------------|
| [Nom] | Vide | "Le nom est obligatoire" |
| [Email] | Format invalide | "Veuillez entrer une adresse email valide" |
| [Date] | Date passée | "La date doit être dans le futur" |

---

## 6. Actions et Boutons

### 6.1 Actions Principales

| Bouton | Type | Position | Action |
|--------|------|----------|--------|
| [Soumettre] | Primaire | Bas droite | Soumet le formulaire |
| [Annuler] | Secondaire | Bas gauche | Retour sans sauvegarder |
| [Sauvegarder brouillon] | Tertiaire | Bas centre | Sauvegarde temporaire |

### 6.2 Hiérarchie Visuelle des Boutons

**Primaire :** Action principale (ex: Soumettre, Enregistrer)
- Style : Fond coloré, texte contrasté
- Taille : Plus grand
- Position : Proéminente

**Secondaire :** Actions alternatives (ex: Annuler, Retour)
- Style : Contour, fond transparent
- Taille : Standard
- Position : Adjacente au primaire

**Tertiaire :** Actions optionnelles (ex: Aide, Plus d'options)
- Style : Texte simple, lien
- Taille : Plus petit
- Position : Moins proéminente

### 6.3 États des Boutons

- **Normal** : État par défaut
- **Hover** : Survol de la souris
- **Active** : Clic en cours
- **Disabled** : Désactivé (grisé)
- **Loading** : En cours de traitement (spinner)

---

## 7. Textes et Libellés

### 7.1 Titre de la Page

**Texte :** [Titre principal]

**Caractéristiques :**
- Niveau : H1
- Clair et descriptif
- Maximum 60 caractères

### 7.2 Sous-titres et Sections

| Section | Titre | Description |
|---------|-------|-------------|
| Section 1 | [Titre H2] | [Description courte] |
| Section 2 | [Titre H2] | [Description courte] |

### 7.3 Textes d'Aide et Tooltips

| Élément | Texte d'aide | Déclencheur |
|---------|--------------|-------------|
| [Champ 1] | "Entrez votre nom tel qu'il apparaît sur vos documents officiels" | Icône (i) |
| [Champ 2] | "Format accepté : JJ/MM/AAAA" | Focus sur le champ |

### 7.4 Messages de Confirmation

**Succès :**
> "Votre demande a été soumise avec succès. Vous recevrez une confirmation par courriel."

**Avertissement :**
> "Certaines informations sont manquantes. Veuillez compléter tous les champs obligatoires."

**Erreur :**
> "Une erreur s'est produite lors de la soumission. Veuillez réessayer ou contacter le support."

---

## 8. Interactions et Comportements

### 8.1 Interactions Utilisateur

| Action utilisateur | Réponse système | Feedback visuel |
|-------------------|-----------------|-----------------|
| Clic sur [Bouton] | [Action système] | [Animation/Message] |
| Survol de [Élément] | [Affichage info] | [Tooltip/Highlight] |
| Saisie dans [Champ] | [Validation temps réel] | [Icône/Message] |

### 8.2 États de l'Interface

**État initial :**
[Description de l'état au chargement]

**État en cours de saisie :**
[Description pendant l'interaction]

**État de validation :**
[Description lors de la validation]

**État de succès :**
[Description après succès]

**État d'erreur :**
[Description en cas d'erreur]

### 8.3 Animations et Transitions

| Élément | Animation | Durée | Déclencheur |
|---------|-----------|-------|-------------|
| [Modal] | Fade in | 300ms | Ouverture |
| [Notification] | Slide down | 200ms | Apparition |
| [Bouton] | Scale | 100ms | Hover |

---

## 9. Responsive Design

### 9.1 Points de Rupture (Breakpoints)

| Appareil | Largeur | Adaptations |
|----------|---------|-------------|
| Mobile | < 768px | Menu hamburger, colonnes empilées |
| Tablette | 768px - 1279px | Navigation condensée, 2 colonnes |
| Desktop | ≥ 1280px | Navigation complète, 3 colonnes |

### 9.2 Adaptations par Appareil

**Mobile :**
- Navigation en menu hamburger
- Formulaire en une colonne
- Boutons pleine largeur
- Espacement réduit

**Tablette :**
- Navigation partiellement visible
- Formulaire en 1-2 colonnes
- Boutons adaptés
- Espacement moyen

**Desktop :**
- Navigation complète visible
- Formulaire en 2-3 colonnes
- Boutons optimisés
- Espacement complet

---

## 10. Accessibilité

### 10.1 Checklist Accessibilité

- [ ] **Navigation au clavier** : Tous les éléments interactifs accessibles au clavier
- [ ] **Ordre de tabulation** : Logique et cohérent
- [ ] **Focus visible** : Indicateur de focus clair
- [ ] **Étiquettes** : Tous les champs ont des labels associés
- [ ] **ARIA** : Attributs ARIA appropriés pour les composants complexes
- [ ] **Contraste** : Ratio minimum 4.5:1 pour le texte normal
- [ ] **Textes alternatifs** : Images et icônes ont des alt text
- [ ] **Messages d'erreur** : Associés aux champs et annoncés
- [ ] **Titres** : Hiérarchie de titres correcte (H1, H2, H3)
- [ ] **Landmarks** : Régions ARIA définies (header, main, nav, footer)

### 10.2 Support des Lecteurs d'Écran

**Éléments à annoncer :**
- Titre de la page
- Instructions importantes
- Messages d'erreur et de succès
- Changements d'état dynamiques
- Nombre d'éléments dans les listes

**Textes cachés visuellement mais accessibles :**
```html
<span class="sr-only">Texte pour lecteurs d'écran uniquement</span>
```

---

## 11. Design Visuel

### 11.1 Palette de Couleurs

| Utilisation | Couleur | Code Hex | Contraste |
|-------------|---------|----------|-----------|
| Primaire | [Nom] | #XXXXXX | 4.5:1 |
| Secondaire | [Nom] | #XXXXXX | 4.5:1 |
| Succès | [Nom] | #XXXXXX | 4.5:1 |
| Erreur | [Nom] | #XXXXXX | 4.5:1 |
| Avertissement | [Nom] | #XXXXXX | 4.5:1 |
| Texte | [Nom] | #XXXXXX | 7:1 |
| Fond | [Nom] | #XXXXXX | - |

### 11.2 Typographie

| Élément | Police | Taille | Poids | Hauteur de ligne |
|---------|--------|--------|-------|------------------|
| H1 | [Police] | 32px | Bold | 1.2 |
| H2 | [Police] | 24px | Bold | 1.3 |
| H3 | [Police] | 20px | Semi-bold | 1.4 |
| Body | [Police] | 16px | Regular | 1.5 |
| Small | [Police] | 14px | Regular | 1.4 |

### 11.3 Espacement

**Système d'espacement :**
- XS : 4px
- S : 8px
- M : 16px
- L : 24px
- XL : 32px
- XXL : 48px

### 11.4 Icônes

| Icône | Utilisation | Taille | Accessible |
|-------|-------------|--------|------------|
| [Nom] | [Usage] | 24px | Oui (alt text) |
| [Nom] | [Usage] | 20px | Oui (alt text) |

---

## 12. Contenu et Données

### 12.1 Données Affichées

| Donnée | Source | Format | Mise à jour |
|--------|--------|--------|-------------|
| [Donnée 1] | [API/BD] | [Format] | [Temps réel/Périodique] |
| [Donnée 2] | [API/BD] | [Format] | [Temps réel/Périodique] |

### 12.2 États de Chargement

**Chargement initial :**
- Skeleton screens ou spinners
- Message : "Chargement en cours..."

**Chargement partiel :**
- Indicateurs de progression
- Chargement progressif (lazy loading)

**Pas de données :**
- Message : "Aucune donnée disponible"
- Action suggérée si applicable

---

## 13. Validation et Tests

### 13.1 Scénarios de Test

- [ ] Chargement initial de la page
- [ ] Saisie de données valides
- [ ] Saisie de données invalides
- [ ] Soumission du formulaire
- [ ] Gestion des erreurs
- [ ] Navigation au clavier
- [ ] Test avec lecteur d'écran
- [ ] Test sur différents navigateurs
- [ ] Test sur différents appareils

### 13.2 Critères d'Acceptation

- [ ] L'interface correspond à la maquette approuvée
- [ ] Tous les champs fonctionnent correctement
- [ ] La validation fonctionne comme prévu
- [ ] Les messages d'erreur sont clairs
- [ ] L'interface est responsive
- [ ] L'accessibilité est conforme WCAG 2.1 AA
- [ ] Les performances sont acceptables (< 3s chargement)

---

## 14. Notes et Références

### 14.1 Références

- Dossier fonctionnel : [Référence]
- Cas d'usage : [CU-XXX]
- Guide de style : [Lien]
- Système de design : [Lien]

### 14.2 Décisions de Design

| Date | Décision | Justification | Approuvé par |
|------|----------|---------------|--------------|
| [Date] | [Décision] | [Raison] | [Nom] |

### 14.3 Questions en Suspens

- [ ] [Question 1]
- [ ] [Question 2]

---

## Conseils d'Utilisation

1. **Commencez simple** : Wireframes basse fidélité d'abord
2. **Itérez** : Recueillez les retours et ajustez
3. **Pensez mobile first** : Concevez d'abord pour mobile
4. **Priorisez l'accessibilité** : Intégrez-la dès la conception
5. **Testez tôt** : Validez avec de vrais utilisateurs
6. **Documentez les décisions** : Gardez une trace des choix de design
7. **Restez cohérent** : Suivez le système de design existant
8. **Considérez les états** : Normal, hover, active, disabled, error