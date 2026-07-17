<!-- NOTE RÉDACTEUR — Ne pas inclure dans la génération ni l'analyse fonctionnelle

Quand tests.md est nécessaire :
- Projet avec une couverture de test formelle requise (ex. : livraison gouvernementale, audit)
- Projet avec des algorithmes complexes nécessitant 80+ cas de test
- Projet avec des intégrations API à valider de bout en bout
- Projet où les scénarios Gherkin du dossier fonctionnel ne suffisent pas pour l'acceptation
- Projet avec des exigences de performance, sécurité ou accessibilité à mesurer précisément

Pour un projet simple, les critères d'acceptation et scénarios Gherkin dans chaque capacité suffisent.
tests.md est le niveau suivant : format INPUT/EXPECTED strict, valeurs exactes, exécutables sans interprétation.
-->

# [Nom du Projet] - Test Cases

> **Objectif :** Définir des cas de test exécutables, sans ambiguïté et vérifiables.
> **Audience :** Développeurs, testeurs et IA de développement
> **Principe :** Format INPUT/EXPECTED strict. Toute valeur doit être exacte, pas approximative.

---

## FORMAT DES TESTS

Chaque test DOIT suivre ce format strict :

```markdown
### TEST: [CATÉGORIE]_[NUMÉRO]_[Description_Courte_Sans_Espaces]

**INPUT:**
- [Condition initiale 1 avec valeur exacte]
- [Condition initiale 2 avec valeur exacte]
- [Action utilisateur avec détails précis]
- [Données d'entrée avec valeurs concrètes]

**EXPECTED:**
- [Résultat attendu 1 avec valeur exacte]
- [Résultat attendu 2 avec valeur exacte]
- [État final du système]
- [Message affiché exact entre guillemets]
- [Valeur de retour ou structure de données exacte]

---
```

**Règles de nommage :**
- CATÉGORIE : Domaine fonctionnel en MAJUSCULES (CONFIG, INDEX, SEARCH, UI, PERF, EDGE, etc.)
- NUMÉRO : Séquence à 3 chiffres (001, 002, 003...)
- Description : Résumé court avec underscores au lieu d'espaces

---

## TESTS DE CONFIGURATION

> Tests validant la configuration initiale et la persistance des paramètres.

### TEST: CONFIG_001_Initial_State
**INPUT:**
- User opens application for first time
- No localStorage data exists
- No previous configuration

**EXPECTED:**
- Application displays in STATE: UNCONFIGURED
- Folder path field is empty
- "Index" button is disabled
- "Search" button is disabled
- No results are displayed
- No error messages are displayed
- Welcome message displays: "Configure your recipe folder to begin"

---

### TEST: CONFIG_002_Valid_Folder_Selection
**INPUT:**
- User clicks "Browse" button
- User selects folder: `/home/user/recipes`
- Folder exists and contains 5 files
- Application has read permissions

**EXPECTED:**
- Folder path field displays: `/home/user/recipes`
- Path is saved to localStorage key: `recipeSearchApp.folderPath`
- Application transitions to STATE: CONFIGURED_NOT_INDEXED
- "Index" button becomes enabled
- "Index" button displays: "Index Recipes"
- Prompt displays: "Click Index to scan your recipes"
- File count displays: "5 files found"

---

### TEST: CONFIG_003_Invalid_Folder_Path
**INPUT:**
- User manually enters path: `/nonexistent/folder`
- User presses Enter or clicks outside field (blur event)

**EXPECTED:**
- Error message displays: "Folder does not exist"
- Error message has red background
- Path is NOT saved to localStorage
- Application remains in STATE: UNCONFIGURED
- "Index" button remains disabled
- Folder path field has red border

---

## TESTS D'INDEXATION

> Tests validant le processus d'indexation des recettes.

### TEST: INDEX_001_Index_TXT_Files
**INPUT:**
- Folder contains 3 TXT files:
  - `recipe1.txt` with content: "Ingrédients: 1 tasse de farine, 2 oeufs, 250 ml de lait"
  - `recipe2.txt` with content: "Ingredients: 500g beef, 2 onions, 3 garlic cloves"
  - `recipe3.txt` with content: "Pour 4 personnes: tomates, basilic, mozzarella"
- User clicks "Index" button

**EXPECTED:**
- Progress bar appears and shows: 0% → 33% → 66% → 100%
- Index contains exactly 3 recipes
- recipe1.txt ingredients: `["farine", "oeuf", "lait"]`
- recipe2.txt ingredients: `["beef", "onion", "garlic"]`
- recipe3.txt ingredients: `["tomate", "basilic", "mozzarella"]`
- Completion message displays: "3 recipes indexed successfully"
- Application transitions to STATE: INDEXED
- "Search" button becomes enabled
- Timestamp is saved to localStorage key: `recipeSearchApp.lastIndexation`

---

### TEST: INDEX_002_Index_DOCX_Files
**INPUT:**
- Folder contains 2 DOCX files:
  - `pasta.docx` with text content: "Ingredients: pasta, tomato sauce, parmesan"
  - `salad.docx` with text content: "Ingrédients: laitue, tomate, concombre"
- User clicks "Index" button

**EXPECTED:**
- Progress bar shows: 0% → 50% → 100%
- Index contains exactly 2 recipes
- pasta.docx ingredients: `["pasta", "tomato", "sauce", "parmesan"]`
- salad.docx ingredients: `["laitue", "tomate", "concombre"]`
- Completion message displays: "2 recipes indexed successfully"
- Both files are marked as type: "docx"

---

### TEST: INDEX_003_Index_PDF_And_Image_Files
**INPUT:**
- Folder contains 3 files:
  - `chicken_rice_vegetables.pdf`
  - `beef_onion_garlic.jpg`
  - `fish_lemon_herbs.png`
- User clicks "Index" button

**EXPECTED:**
- Progress bar shows: 0% → 33% → 66% → 100%
- Index contains exactly 3 recipes
- chicken_rice_vegetables.pdf fileNameIngredients: `["chicken", "rice", "vegetables"]`
- beef_onion_garlic.jpg fileNameIngredients: `["beef", "onion", "garlic"]`
- fish_lemon_herbs.png fileNameIngredients: `["fish", "lemon", "herbs"]`
- Content extraction is NOT attempted for these files
- Completion message displays: "3 recipes indexed successfully"

---

## TESTS DE RECHERCHE

> Tests validant la logique de recherche et de filtrage.

### TEST: SEARCH_001_Single_Ingredient_Inclusion
**INPUT:**
- Index contains 5 recipes:
  - Recipe A: `["poulet", "riz", "légumes"]`
  - Recipe B: `["boeuf", "oignon", "ail"]`
  - Recipe C: `["poulet", "tomate", "basilic"]`
  - Recipe D: `["poisson", "citron", "herbes"]`
  - Recipe E: `["poulet", "curry", "lait de coco"]`
- User enters in search field: "poulet"
- User clicks "Search" button

**EXPECTED:**
- Results display exactly 3 recipes: A, C, E
- Results count displays: "3 recipes found"
- Each result shows recipe filename
- Each result shows matched ingredients highlighted
- Results are displayed in order: A, C, E

---

### TEST: SEARCH_002_Multiple_Ingredients_AND_Logic
**INPUT:**
- Index contains 5 recipes:
  - Recipe A: `["boeuf", "oignon", "ail", "tomate"]`
  - Recipe B: `["boeuf", "oignon", "poivron"]`
  - Recipe C: `["boeuf", "ail"]`
  - Recipe D: `["oignon", "ail", "tomate"]`
  - Recipe E: `["boeuf", "oignon", "ail"]`
- User enters in search field: "boeuf, oignon, ail"
- User clicks "Search" button

**EXPECTED:**
- Results display exactly 2 recipes: A, E
- Results count displays: "2 recipes found"
- Recipe B is EXCLUDED (missing "ail")
- Recipe C is EXCLUDED (missing "oignon")
- Recipe D is EXCLUDED (missing "boeuf")
- All 3 search terms are highlighted in results

---

### TEST: SEARCH_003_Exclusion_Filter_OR_Logic
**INPUT:**
- Index contains 4 recipes:
  - Recipe A: `["boeuf", "oignon", "ail"]`
  - Recipe B: `["boeuf", "oignon", "tomate"]`
  - Recipe C: `["boeuf", "oignon", "poivron"]`
  - Recipe D: `["boeuf", "oignon", "tomate", "poivron"]`
- User enters in search field: "boeuf, oignon"
- User enters in exclude field: "tomate, poivron"
- User clicks "Search" button

**EXPECTED:**
- Results display exactly 1 recipe: A
- Results count displays: "1 recipe found"
- Recipe B is EXCLUDED (contains "tomate")
- Recipe C is EXCLUDED (contains "poivron")
- Recipe D is EXCLUDED (contains both "tomate" and "poivron")

---

### TEST: SEARCH_004_No_Results_Found
**INPUT:**
- Index contains 3 recipes with various ingredients
- User enters in search field: "caviar, truffe, champagne"
- User clicks "Search" button

**EXPECTED:**
- No results are displayed
- Message displays: "No recipes found matching your criteria"
- Message has informational styling (blue background)
- Results count displays: "0 recipes found"
- Search field remains populated with: "caviar, truffe, champagne"

---

## TESTS D'INTERFACE UTILISATEUR

> Tests validant les comportements de l'interface utilisateur.

### TEST: UI_001_Search_Button_Disabled_When_Empty
**INPUT:**
- Application is in STATE: INDEXED
- Search field is empty
- User hovers over "Search" button

**EXPECTED:**
- "Search" button is disabled
- Button has gray background color: `#cccccc`
- Button cursor shows: `not-allowed`
- Tooltip displays: "Enter ingredients to search"
- Clicking button has no effect

---

### TEST: UI_002_Search_Button_Enabled_When_Text_Entered
**INPUT:**
- Application is in STATE: INDEXED
- User types "poulet" in search field

**EXPECTED:**
- "Search" button becomes enabled immediately
- Button background changes to blue: `#007bff`
- Button cursor shows: `pointer`
- Tooltip is removed
- Clicking button triggers search

---

### TEST: UI_003_Progress_Bar_During_Indexation
**INPUT:**
- Folder contains 10 files
- User clicks "Index" button
- Indexation is in progress

**EXPECTED:**
- Progress bar is visible
- Progress bar shows percentage: "0%", "10%", "20%", ..., "100%"
- Progress bar updates after each file processed
- "Index" button is disabled during indexation
- "Index" button text changes to: "Indexing..."
- User cannot change folder path during indexation

---

## TESTS DE CAS LIMITES

> Tests validant le comportement dans des situations limites ou exceptionnelles.

### TEST: EDGE_001_Empty_Recipe_File
**INPUT:**
- Folder contains file: `empty.txt` with 0 bytes
- User clicks "Index" button

**EXPECTED:**
- File is processed without error
- Recipe is added to index with empty ingredients array: `[]`
- Warning is logged: "File empty.txt contains no content"
- Indexation continues to next file
- Completion message includes this file in count

---

### TEST: EDGE_002_Very_Large_Recipe_File
**INPUT:**
- Folder contains file: `large.txt` with 10MB of text
- User clicks "Index" button

**EXPECTED:**
- Progress indicator shows: "Processing large file..."
- File is processed successfully
- Processing time is logged
- If processing takes > 5 seconds, warning displays: "Large file detected, this may take a moment"
- Indexation completes successfully

---

### TEST: EDGE_003_Special_Characters_In_Filename
**INPUT:**
- Folder contains files:
  - `recette_été_2024.txt`
  - `poulet & légumes.txt`
  - `dessert (chocolat).txt`
- User clicks "Index" button

**EXPECTED:**
- All 3 files are processed successfully
- Filenames are stored exactly as they appear
- Special characters are preserved: `é`, `&`, `(`, `)`
- No encoding errors occur
- Completion message displays: "3 recipes indexed successfully"

---

### TEST: EDGE_004_Duplicate_Ingredients_In_Recipe
**INPUT:**
- File `recipe.txt` contains: "Ingredients: tomato, onion, tomato, garlic, onion"
- User clicks "Index" button

**EXPECTED:**
- Duplicates are removed
- Recipe ingredients stored as: `["tomato", "onion", "garlic"]`
- Each ingredient appears only once
- Order is preserved (first occurrence)

---

### TEST: EDGE_005_Search_With_Leading_Trailing_Spaces
**INPUT:**
- User enters in search field: "  poulet  ,  oignon  "
- User clicks "Search" button

**EXPECTED:**
- Spaces are trimmed automatically
- Search is performed for: `["poulet", "oignon"]`
- Results match recipes containing both ingredients
- No error message about invalid input

---

## TESTS DE PERFORMANCE

> Tests validant les performances du système.

### TEST: PERF_001_Index_100_Files_Under_10_Seconds
**INPUT:**
- Folder contains 100 TXT files
- Each file is approximately 5KB
- User clicks "Index" button

**EXPECTED:**
- Indexation completes in < 10 seconds
- Progress bar updates smoothly (no freezing)
- UI remains responsive during indexation
- Memory usage stays < 100MB
- Completion message displays: "100 recipes indexed successfully"

---

### TEST: PERF_002_Search_1000_Recipes_Under_50ms
**INPUT:**
- Index contains 1000 recipes
- User enters search: "poulet, oignon"
- User clicks "Search" button

**EXPECTED:**
- Search completes in < 50ms
- Results are displayed immediately
- No UI lag or freezing
- Results count is accurate
- Performance is logged for monitoring

---

### TEST: PERF_003_Re_Index_Updates_Only_Changed_Files
**INPUT:**
- Index contains 100 recipes
- User modifies 5 files
- User clicks "Re-index" button

**EXPECTED:**
- Only 5 modified files are re-processed
- 95 unchanged files are skipped
- Re-indexation completes in < 2 seconds
- Message displays: "5 recipes updated, 95 unchanged"
- Timestamp is updated

---

## TESTS D'INTÉGRATION

> Tests validant l'intégration entre différents composants.

### TEST: INTEGRATION_001_Full_Workflow_First_Time_User
**INPUT:**
- New user opens application
- User selects folder: `/home/user/recipes`
- Folder contains 10 recipe files
- User clicks "Index" button
- User searches for: "poulet"

**EXPECTED:**
- Step 1: Application starts in STATE: UNCONFIGURED
- Step 2: After folder selection, transitions to STATE: CONFIGURED_NOT_INDEXED
- Step 3: After indexation, transitions to STATE: INDEXED
- Step 4: Search returns matching recipes
- Step 5: All data persists in localStorage
- Step 6: Closing and reopening app restores state

---

### TEST: INTEGRATION_002_Update_Folder_And_Re_Index
**INPUT:**
- Application is in STATE: INDEXED with 50 recipes
- User changes folder path to different folder
- New folder contains 30 recipes
- User clicks "Index" button

**EXPECTED:**
- Old index is cleared
- New folder is indexed
- Index contains exactly 30 recipes (not 80)
- Old recipes are no longer searchable
- New folder path is saved to localStorage
- Timestamp is updated

---

## TESTS D'ACCESSIBILITÉ

> Tests validant la conformité aux normes d'accessibilité WCAG 2.1.

### TEST: A11Y_001_Keyboard_Navigation
**INPUT:**
- User disconnects mouse
- User navigates using only Tab key
- User activates buttons using Enter/Space

**EXPECTED:**
- All interactive elements are reachable via Tab
- Tab order is logical: folder path → browse → index → search field → search button
- Focus indicator is visible on all elements
- Enter key activates buttons
- Space key activates buttons
- Escape key closes dialogs

---

### TEST: A11Y_002_Screen_Reader_Announcements
**INPUT:**
- User enables screen reader
- User performs indexation
- User performs search

**EXPECTED:**
- Folder path field has label: "Recipe folder path"
- Progress bar announces: "Indexing recipes, 50% complete"
- Search results announce: "5 recipes found"
- Error messages are announced immediately
- Button states are announced: "Index button, enabled"

---

## TESTS DE SÉCURITÉ

> Tests validant la sécurité de l'application.

### TEST: SECURITY_001_Path_Traversal_Prevention
**INPUT:**
- User enters folder path: `../../../etc/passwd`
- User attempts to index

**EXPECTED:**
- Path is rejected
- Error message displays: "Invalid folder path"
- No files outside allowed directories are accessed
- Security event is logged
- Application remains in safe state

---

### TEST: SECURITY_002_XSS_Prevention_In_Filenames
**INPUT:**
- Folder contains file: `<script>alert('xss')</script>.txt`
- User indexes folder
- User views results

**EXPECTED:**
- Filename is displayed as plain text
- Script is NOT executed
- HTML is escaped: `<script>alert('xss')</script>.txt`
- No JavaScript injection occurs
- Application remains secure

---

## VALIDATION CHECKLIST

Avant de considérer ces tests complets, vérifier :

- [ ] Tous les tests utilisent le format INPUT/EXPECTED strict
- [ ] Toutes les valeurs sont exactes (pas de "environ" ou "approximativement")
- [ ] Chaque test a un nom unique et descriptif
- [ ] Les tests couvrent les cas nominaux, limites, erreurs et performance
- [ ] Les messages d'erreur sont exacts entre guillemets
- [ ] Les structures de données sont spécifiées avec crochets et guillemets
- [ ] Les états du système sont explicites
- [ ] Les tests sont organisés par catégorie logique
- [ ] Les tests d'intégration valident les workflows complets
- [ ] Les tests d'accessibilité couvrent WCAG 2.1 niveau AA minimum
- [ ] Les tests de sécurité couvrent les vulnérabilités communes
- [ ] Chaque test est exécutable indépendamment