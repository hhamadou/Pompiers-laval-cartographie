<!-- NOTE RÉDACTEUR — Ne pas inclure dans la génération ni l'analyse fonctionnelle

Projet avec des états complexes (workflows, statuts qui changent les comportements disponibles)
Projet avec des algorithmes non triviaux (recherche, calcul, scoring)
Projet avec des exigences d'accessibilité formelles (gouvernement → WCAG AA souvent obligatoire)
Projet où plusieurs devs ou IA travaillent en parallèle sur des capacités interdépendantes


# [Nom du Projet] - Behavioral Specification

> **Objectif :** Décrire les comportements du système de manière déterministe et sans ambiguïté.
> **Audience :** Développeurs et IA de développement
> **Principe :** Tout comportement doit être explicite, testable et mesurable.
-->

---

## SYSTEM STATES

> Définir tous les états possibles du système. Chaque état doit être mutuellement exclusif et complètement défini.

### STATE: [NOM_ÉTAT_EN_MAJUSCULES]
- [Condition ou propriété 1 de cet état]
- [Condition ou propriété 2 de cet état]
- [Comportement ou capacité disponible dans cet état]
- [Comportement ou capacité désactivée dans cet état]

### STATE: [AUTRE_ÉTAT]
- [Condition 1]
- [Condition 2]
- [Comportement disponible]

**Exemple concret :**
```
### STATE: UNCONFIGURED
- No folder path is set
- No index exists
- Search is disabled
- User can only configure folder path

### STATE: INDEXED
- Folder path is set and valid
- Index exists with recipes
- Search is enabled
- Last indexation timestamp is stored
```

---

## USER FLOWS

> Décrire les parcours utilisateur complets avec les actions utilisateur et les réponses système. Utiliser une structure séquentielle avec conditions explicites.

### FLOW: [Nom du Flow Descriptif]

**USER ACTION:**
1. [Action utilisateur 1 - être spécifique]
2. [Action utilisateur 2]
3. [Action utilisateur 3]

**SYSTEM BEHAVIOR:**
1. [Comportement système 1]
2. [Comportement système 2]
3. IF [condition précise]:
   - [Action si condition vraie]
   - [Action suivante]
4. ELSE:
   - [Action si condition fausse]
5. FOR EACH [élément dans collection]:
   - IF [condition]:
     - [Action pour cet élément]
   - ELSE IF [autre condition]:
     - [Action alternative]
   - ELSE:
     - [Action par défaut]
6. [Comportement final]

**STATES:**
- Initial: [ÉTAT_INITIAL]
- During: [ÉTAT_INTERMÉDIAIRE] (optionnel si le flow a un état transitoire)
- Final: [ÉTAT_FINAL]

**ERROR PATHS:**
- IF [condition d'erreur 1] → Display error "[Message exact]"
- IF [condition d'erreur 2] → Display error "[Message exact]"
- IF [condition d'erreur 3] → [Action de récupération]

**EXAMPLE:**
```
User enters: "poulet, oignon"
System normalizes to: ["poulet", "oignon"]
System searches index for recipes containing ALL ingredients
System displays: 5 recipes found
```

---

### FLOW: [Autre Flow]

[Répéter la structure ci-dessus pour chaque flow utilisateur]

---

## UI BEHAVIORS

> Décrire les comportements de l'interface utilisateur de manière déterministe. Spécifier les états visuels, les interactions et les transitions.

### [Nom du Composant ou Zone UI]

**WHEN [événement ou condition]:**
- MUST display [élément visuel exact]
- MUST enable [contrôle ou fonctionnalité]
- MUST disable [contrôle ou fonctionnalité]
- MUST show [message ou indicateur]

**VISUAL STATE:**
- [Description de l'apparence visuelle]
- [Couleur, taille, position si pertinent]
- [Animation ou transition si applicable]

**INTERACTION:**
- ON [événement utilisateur]:
  - [Réaction immédiate]
  - [Changement d'état]

**EXAMPLE:**
```
### Search Button

WHEN search field is empty:
- MUST disable search button
- MUST display button with gray background
- MUST show tooltip: "Enter ingredients to search"

WHEN search field contains text:
- MUST enable search button
- MUST display button with blue background
- MUST remove tooltip
```

---

### [Autre Composant UI]

[Répéter pour chaque composant ou zone UI significative]

---

## DATA FLOWS

> Décrire comment les données circulent dans le système, de l'entrée à la sortie.

### FLOW: [Nom du Data Flow]

**INPUT:**
- Source: [Origine des données]
- Format: [Format exact des données]
- Example: `[exemple concret]`

**PROCESSING:**
1. [Étape de traitement 1]
2. [Transformation appliquée]
3. [Validation effectuée]
4. [Enrichissement ou calcul]

**OUTPUT:**
- Destination: [Où vont les données]
- Format: [Format exact de sortie]
- Example: `[exemple concret]`

**EXAMPLE:**
```
### FLOW: Ingredient Extraction from Text File

INPUT:
- Source: .txt file selected by user
- Format: UTF-8 text
- Example: "Ingrédients: 1 tasse de farine, 2 oeufs"

PROCESSING:
1. Read file content as UTF-8 string
2. Apply ingredient detection regex patterns
3. Extract matched ingredients
4. Normalize each ingredient (lowercase, singular)
5. Remove duplicates

OUTPUT:
- Destination: Recipe index in localStorage
- Format: Array of normalized strings
- Example: ["farine", "oeuf"]
```

---

## ALGORITHM SPECIFICATIONS

> Décrire les algorithmes clés avec une précision suffisante pour une implémentation déterministe.

### ALGORITHM: [Nom de l'Algorithme]

**PURPOSE:** [Ce que l'algorithme accomplit]

**INPUT:**
- [Paramètre 1]: [Type] - [Description]
- [Paramètre 2]: [Type] - [Description]

**OUTPUT:**
- [Type de retour] - [Description]

**STEPS:**
1. [Étape 1 avec détails]
2. IF [condition]:
   - [Action]
3. FOR EACH [élément]:
   - [Traitement]
4. [Étape finale]

**COMPLEXITY:**
- Time: O([complexité temporelle])
- Space: O([complexité spatiale])

**EXAMPLE:**
```
Input: ingredients = ["boeuf", "oignon"], recipes = [...]
Step 1: Filter recipes containing "boeuf" → 10 recipes
Step 2: Filter remaining recipes containing "oignon" → 5 recipes
Output: 5 recipes
```

---

## PERFORMANCE TARGETS

> Spécifier les cibles de performance quantifiées et mesurables.

### [Catégorie de Performance]

| Métrique | Cible | Condition | Mesure |
|----------|-------|-----------|--------|
| [Nom de la métrique] | [Valeur cible] | [Condition d'application] | [Comment mesurer] |
| Response time | < 200ms | 95th percentile | From user action to UI update |
| Indexation speed | > 100 files/sec | For .txt files | Files processed per second |
| Memory usage | < 50MB | During indexation | Peak memory consumption |
| Search latency | < 50ms | For 1000 recipes | From query to results |

---

## ACCESSIBILITY REQUIREMENTS

> Spécifier les exigences d'accessibilité de manière testable.

### [Catégorie WCAG]

**REQUIREMENT:** [Description de l'exigence]
- WCAG Level: [A / AA / AAA]
- Success Criterion: [Numéro du critère]

**IMPLEMENTATION:**
- MUST [action spécifique 1]
- MUST [action spécifique 2]

**TESTING:**
- [Comment tester cette exigence]

**EXAMPLE:**
```
### Keyboard Navigation

REQUIREMENT: All interactive elements must be keyboard accessible
- WCAG Level: A
- Success Criterion: 2.1.1

IMPLEMENTATION:
- MUST support Tab key to navigate between elements
- MUST support Enter/Space to activate buttons
- MUST show visible focus indicator

TESTING:
- Disconnect mouse
- Navigate entire interface using only keyboard
- Verify all functions are accessible
```

---

## SECURITY REQUIREMENTS

> Spécifier les exigences de sécurité de manière vérifiable.

### [Catégorie de Sécurité]

**REQUIREMENT:** [Description de l'exigence]

**MUST:**
- [Obligation de sécurité 1]
- [Obligation de sécurité 2]

**MUST NOT:**
- [Interdiction de sécurité 1]
- [Interdiction de sécurité 2]

**VALIDATION:**
- [Comment valider cette exigence]

---

## EDGE CASES AND BOUNDARY CONDITIONS

> Lister tous les cas limites et conditions aux frontières avec le comportement attendu.

### [Catégorie de Cas Limite]

| Cas Limite | Condition | Comportement Attendu |
|------------|-----------|---------------------|
| [Description du cas] | [Quand ce cas se produit] | [Ce que le système doit faire] |
| Empty input | User submits empty search | Display message: "Please enter ingredients" |
| Very large file | File size > 10MB | Display warning, process with progress indicator |
| Special characters | Ingredient contains é, à, ç | Normalize to e, a, c for search |

---

## NOTES D'IMPLÉMENTATION

> Conseils et considérations pour l'implémentation, sans sur-spécifier la solution technique.

### [Aspect Technique]

**CONSIDERATION:** [Point à considérer]

**RECOMMENDATION:** [Recommandation sans imposer]

**RATIONALE:** [Pourquoi cette recommandation]

**EXAMPLE:**
```
### Text Extraction from DOCX

CONSIDERATION: DOCX files are ZIP archives containing XML

RECOMMENDATION: Use Mammoth.js library for reliable extraction

RATIONALE: 
- Handles complex formatting
- Extracts plain text reliably
- Well-maintained and tested
- Lightweight dependency
```

---

## VALIDATION CHECKLIST

Avant de considérer cette spécification complète, vérifier :

- [ ] Tous les états du système sont définis
- [ ] Tous les flows utilisateur sont documentés avec états initial/final
- [ ] Les comportements UI sont déterministes
- [ ] Les data flows sont tracés de bout en bout
- [ ] Les algorithmes clés sont spécifiés
- [ ] Les cibles de performance sont quantifiées
- [ ] Les exigences d'accessibilité sont testables
- [ ] Les cas limites sont identifiés avec comportements attendus
- [ ] Aucune ambiguïté ne subsiste
- [ ] Tous les exemples sont concrets avec valeurs réelles