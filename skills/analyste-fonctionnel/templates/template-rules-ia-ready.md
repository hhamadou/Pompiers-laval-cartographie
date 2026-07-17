<!-- NOTE RÉDACTEUR — Ne pas inclure dans la génération ni l'analyse fonctionnelle

Quand rules.md est nécessaire :
- Projet avec des règles de validation complexes (formats, regex, longueurs, conditions imbriquées)
- Projet avec une logique métier stricte qui ne tolère aucune interprétation
- Projet avec des règles de normalisation des données (ex. : casse, accents, doublons)
- Projet où plusieurs capacités partagent les mêmes contraintes (règles transversales détaillées)
- Projet où les cas MUST NOT sont aussi importants que les obligations MUST

Pour un projet simple à logique directe, les règles applicables dans chaque capacité du dossier fonctionnel suffisent.
rules.md est le niveau suivant : zéro ambiguïté, tout est vérifiable et testable unitairement.
-->


# [Nom du Projet] - Business Rules

> **Objectif :** Définir les règles métier de manière stricte, sans ambiguïté et testable.
> **Audience :** Développeurs et IA de développement
> **Principe :** Utiliser exclusivement le format MUST/MUST NOT. Toute règle doit être vérifiable.

---

## FORMAT DES RÈGLES

Chaque règle DOIT suivre ce format strict :

```markdown
### RULE: [NOM_RÈGLE_EN_MAJUSCULES_AVEC_UNDERSCORES]

**MUST [obligation positive]**

**MUST NOT [interdiction]**

**IF [condition]:**
- MUST [action obligatoire si condition vraie]
- MUST NOT [action interdite si condition vraie]

**ELSE IF [autre condition]:**
- MUST [action obligatoire si autre condition vraie]

**ELSE:**
- MUST [action obligatoire par défaut]

**EXAMPLE:**
```
[Exemple concret avec données réelles]
Input: [valeur d'entrée]
Processing: [étapes]
Output: [résultat] → [INCLUDED/EXCLUDED/VALID/INVALID] [✓/✗]
```
```

---

## [CATÉGORIE DE RÈGLES 1]

> Regrouper les règles par domaine fonctionnel ou technique.

### RULE: [NOM_PREMIÈRE_RÈGLE]

**MUST [obligation 1]**

**MUST [obligation 2]**

**MUST NOT [interdiction 1]**

**MUST NOT [interdiction 2]**

**EXAMPLE:**
```
[Exemple concret démontrant l'application de la règle]
```

---

### RULE: [NOM_DEUXIÈME_RÈGLE]

**IF [condition précise]:**
- MUST [action obligatoire]
- MUST [autre action obligatoire]

**ELSE IF [autre condition]:**
- MUST [action alternative]

**ELSE:**
- MUST [action par défaut]

**EXAMPLE:**
```
Scenario 1: [condition 1]
Input: [valeur]
Result: [résultat] → ✓

Scenario 2: [condition 2]
Input: [valeur]
Result: [résultat] → ✗ (reason: [raison])
```

---

## RÈGLES DE VALIDATION

> Règles pour valider les entrées utilisateur ou les données.

### RULE: [NOM_VALIDATION]

**MUST validate [ce qui doit être validé]**

**VALIDATION CRITERIA:**
- [Critère 1]: [Description précise]
- [Critère 2]: [Description précise]

**REGEX PATTERN:** `[pattern regex exact]`

**VALID EXAMPLES:**
- `[exemple valide 1]` → ✓
- `[exemple valide 2]` → ✓
- `[exemple valide 3]` → ✓

**INVALID EXAMPLES:**
- `[exemple invalide 1]` → ✗ (reason: [raison])
- `[exemple invalide 2]` → ✗ (reason: [raison])
- `[exemple invalide 3]` → ✗ (reason: [raison])

**ERROR MESSAGE:** "[Message exact à afficher]"

**EXAMPLE:**
```
### RULE: EMAIL_VALIDATION

MUST validate email format

VALIDATION CRITERIA:
- Must contain exactly one @ symbol
- Must have characters before @
- Must have domain after @
- Domain must contain at least one dot

REGEX PATTERN: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

VALID EXAMPLES:
- `user@example.com` → ✓
- `john.doe@company.co.uk` → ✓
- `test+tag@domain.org` → ✓

INVALID EXAMPLES:
- `invalid.email` → ✗ (reason: missing @)
- `@example.com` → ✗ (reason: missing local part)
- `user@domain` → ✗ (reason: missing TLD)

ERROR MESSAGE: "Please enter a valid email address"
```

---

## RÈGLES DE TRAITEMENT

> Règles définissant comment traiter les données.

### RULE: [NOM_TRAITEMENT]

**MUST process [type de données] as follows:**

**STEP 1:** [Description de l'étape 1]
- MUST [action spécifique]
- MUST NOT [action interdite]

**STEP 2:** [Description de l'étape 2]
- IF [condition]:
  - MUST [action]
- ELSE:
  - MUST [action alternative]

**STEP 3:** [Description de l'étape 3]

**OUTPUT FORMAT:** [Format exact de sortie]

**EXAMPLE:**
```
Input: "Ingrédients: 1 tasse de farine, 2 œufs"

STEP 1: Extract text after "Ingrédients:"
Result: "1 tasse de farine, 2 œufs"

STEP 2: Split by comma
Result: ["1 tasse de farine", "2 œufs"]

STEP 3: Normalize each ingredient
- "1 tasse de farine" → "farine"
- "2 œufs" → "oeuf"

OUTPUT: ["farine", "oeuf"]
```

---

## RÈGLES DE LOGIQUE MÉTIER

> Règles définissant la logique métier et les décisions.

### RULE: [NOM_LOGIQUE]

**MUST apply [type de logique] logic**

**IF [condition 1] AND [condition 2]:**
- MUST [résultat]

**IF [condition 1] OR [condition 2]:**
- MUST [résultat]

**IF [condition 1] AND NOT [condition 2]:**
- MUST [résultat]

**EXAMPLE:**
```
### RULE: INCLUSION_LOGIC_AND

MUST apply AND logic for inclusion search

IF user enters multiple ingredients:
- MUST split by comma OR newline
- MUST trim whitespace from each
- MUST normalize each ingredient
- Recipe MUST contain ALL ingredients to be included

EXAMPLE:
Search: "boeuf, oignon, ail"

Recipe A: ["boeuf", "oignon", "ail", "tomate"]
→ INCLUDED ✓ (contains all 3 required ingredients)

Recipe B: ["boeuf", "oignon", "poivron"]
→ EXCLUDED ✗ (missing "ail")

Recipe C: ["boeuf", "ail"]
→ EXCLUDED ✗ (missing "oignon")
```

---

## RÈGLES D'ERREUR

> Règles définissant comment gérer les erreurs.

### RULE: [NOM_ERREUR]

**WHEN:** [Condition déclenchant l'erreur]

**MUST:**
- [Action obligatoire 1]
- [Action obligatoire 2]

**MUST NOT:**
- [Action interdite 1]
- [Action interdite 2]

**ERROR CODE:** `[CODE_ERREUR]`

**ERROR MESSAGE:** "[Message exact à afficher à l'utilisateur]"

**LOG MESSAGE:** "[Message exact à logger pour debug]"

**HTTP STATUS CODE:** [Code HTTP si applicable]

**RESPONSE FORMAT:**
```json
{
  "error": "[message exact]",
  "code": "[CODE_ERREUR]",
  "details": "[détails optionnels]"
}
```

**EXAMPLE:**
```
### RULE: FILE_READ_ERROR

WHEN: File cannot be read due to permissions or corruption

MUST:
- Log error with filename and error message
- Continue processing next file
- Include error in stats.errors array
- Increment error counter

MUST NOT:
- Stop indexation process
- Throw unhandled exception
- Display technical error to user

ERROR CODE: `FILE_READ_ERROR`

ERROR MESSAGE: "Could not read file: [filename]"

LOG MESSAGE: "Error reading file [filepath]: [technical error message]"

RESPONSE FORMAT:
{
  "error": "Could not read file: recipe.docx",
  "code": "FILE_READ_ERROR",
  "details": "Permission denied"
}
```

---

## RÈGLES DE NORMALISATION

> Règles pour normaliser les données afin d'assurer la cohérence.

### RULE: [NOM_NORMALISATION]

**MUST normalize [type de données] as follows:**

**TRANSFORMATION STEPS:**
1. [Transformation 1]
2. [Transformation 2]
3. [Transformation 3]

**MAPPING TABLE:**
| Input | Output | Reason |
|-------|--------|--------|
| [valeur 1] | [résultat 1] | [raison] |
| [valeur 2] | [résultat 2] | [raison] |

**EXAMPLE:**
```
### RULE: TEXT_NORMALIZATION

MUST normalize text for consistent comparison

TRANSFORMATION STEPS:
1. Convert to lowercase
2. Remove accents (é→e, à→a, ç→c)
3. Trim whitespace
4. Convert plural to singular (if applicable)

MAPPING TABLE:
| Input | Output | Reason |
|-------|--------|--------|
| "Œufs" | "oeuf" | lowercase + singular |
| "FARINE" | "farine" | lowercase |
| "  Tomate  " | "tomate" | trim whitespace |
| "Poivrons" | "poivron" | singular form |

EXAMPLE:
Input: "2 Œufs, 1 tasse de FARINE"
Step 1: "2 œufs, 1 tasse de farine"
Step 2: "2 oeufs, 1 tasse de farine"
Step 3: Extract ingredients: ["oeufs", "farine"]
Step 4: Singularize: ["oeuf", "farine"]
Output: ["oeuf", "farine"]
```

---

## RÈGLES DE PRIORITÉ

> Règles définissant l'ordre d'application ou de priorité.

### RULE: [NOM_PRIORITÉ]

**MUST apply in this exact order:**
1. [Règle ou filtre 1]
2. [Règle ou filtre 2]
3. [Règle ou filtre 3]

**RATIONALE:** [Pourquoi cet ordre est important]

**EXAMPLE:**
```
### RULE: FILTER_APPLICATION_ORDER

MUST apply filters in this exact order:
1. Inclusion filter (AND logic)
2. Exclusion filter (OR logic)
3. Sorting by relevance

RATIONALE: 
- Inclusion filter reduces dataset first
- Exclusion filter removes unwanted results
- Sorting is applied to final filtered set

EXAMPLE:
Initial recipes: 100
After inclusion filter: 20 recipes
After exclusion filter: 15 recipes
After sorting: 15 recipes (ordered by relevance)
```

---

## RÈGLES DE FORMAT

> Règles définissant les formats de données exacts.

### RULE: [NOM_FORMAT]

**MUST use this exact format:**

**STRUCTURE:**
```
[Structure exacte du format]
```

**REQUIRED FIELDS:**
- `[field1]`: [Type] - [Description]
- `[field2]`: [Type] - [Description]

**OPTIONAL FIELDS:**
- `[field3]`: [Type] - [Description]

**CONSTRAINTS:**
- [Contrainte 1]
- [Contrainte 2]

**EXAMPLE:**
```json
{
  "field1": "value1",
  "field2": 123,
  "field3": ["item1", "item2"]
}
```

---

## RÈGLES DE SÉCURITÉ

> Règles de sécurité strictes et non négociables.

### RULE: [NOM_SÉCURITÉ]

**MUST:**
- [Obligation de sécurité 1]
- [Obligation de sécurité 2]

**MUST NOT:**
- [Interdiction de sécurité 1]
- [Interdiction de sécurité 2]

**THREAT:** [Menace que cette règle prévient]

**MITIGATION:** [Comment cette règle atténue la menace]

**EXAMPLE:**
```
### RULE: INPUT_SANITIZATION

MUST:
- Sanitize all user inputs before processing
- Escape special characters in file paths
- Validate file extensions against whitelist

MUST NOT:
- Execute user-provided code
- Allow path traversal (../)
- Trust client-side validation alone

THREAT: Path traversal attack, code injection

MITIGATION: Whitelist validation prevents malicious file access

EXAMPLE:
Input: "../../../etc/passwd"
Validation: REJECTED (contains ../)
Error: "Invalid file path"
```

---

## RÈGLES DE PERFORMANCE

> Règles définissant les contraintes de performance.

### RULE: [NOM_PERFORMANCE]

**MUST meet these performance targets:**

**TARGET:** [Cible de performance quantifiée]

**MEASUREMENT:** [Comment mesurer]

**IF target not met:**
- MUST [action corrective]

**OPTIMIZATION REQUIREMENTS:**
- MUST [optimisation 1]
- MUST [optimisation 2]

**EXAMPLE:**
```
### RULE: SEARCH_RESPONSE_TIME

MUST meet these performance targets:

TARGET: Search results in < 50ms for 1000 recipes

MEASUREMENT: Time from search button click to results display

IF target not met:
- MUST implement caching
- MUST optimize search algorithm
- MUST add performance monitoring

OPTIMIZATION REQUIREMENTS:
- MUST use indexed data structures
- MUST avoid full array scans
- MUST implement lazy loading for large result sets

EXAMPLE:
Dataset: 1000 recipes
Search: "poulet, oignon"
Time: 23ms → ✓ (meets target)

Dataset: 10000 recipes
Search: "poulet, oignon"
Time: 87ms → ✗ (exceeds target, optimization needed)
```

---

## VALIDATION CHECKLIST

Avant de considérer ces règles complètes, vérifier :

- [ ] Toutes les règles utilisent le format MUST/MUST NOT
- [ ] Chaque règle a au moins un exemple concret
- [ ] Les conditions IF/ELSE sont exhaustives (pas de cas non couvert)
- [ ] Les messages d'erreur sont exacts (pas de "environ" ou "similaire à")
- [ ] Les regex patterns sont testés et validés
- [ ] Les formats de données sont spécifiés avec exemples JSON/XML
- [ ] Les règles de priorité sont explicites
- [ ] Les règles de sécurité sont non négociables
- [ ] Les cibles de performance sont quantifiées
- [ ] Aucune ambiguïté ne subsiste dans aucune règle