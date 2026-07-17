# Prompt réutilisable - Dossier fonctionnel IA ready (Version 5)

Utiliser ce prompt pour produire un dossier fonctionnel maître structuré par capacités fonctionnelles, ainsi qu'une version Word destinée au client.
Version enrichie pour projets gouvernementaux complexes avec intégrations API.
Ajouts v5 : spécification des composants d'interface, algorithmes de traitement numérotés, paramètres système, messages utilisateur structurés.

```text
Agis comme analyste fonctionnel senior spécialisé en dossiers fonctionnels IA ready.

Je veux produire un dossier fonctionnel maître en Markdown (`.md`) pour le projet suivant :

Projet :
[décrire le projet]

Notes, besoins, contraintes et décisions connues :
[coller les notes]

Objectif du dossier :
- servir de source de vérité fonctionnelle;
- être lisible par le client;
- être exploitable par un développeur;
- être consommable par une IA de développement;
- permettre de générer ensuite, au besoin, un Word d'approbation, des specs techniques, règles, tests BDD, tâches agile et documentation client.

Livrables attendus :

1. Dossier fonctionnel maître en Markdown
- Produis un fichier `.md` complet, prêt à être sauvegardé comme dossier fonctionnel maître.
- Ce Markdown est la source de vérité fonctionnelle.
- Il doit contenir toute la structure décrite ci-dessous.

> 📎 Note : Des prompts de démarrage pour le développeur (prise de connaissance, conventions, implémentation par capacité) sont disponibles dans le fichier `prompts-dev.md` fourni avec ce dossier.

Structure obligatoire du Markdown maître :

# Dossier fonctionnel IA ready - [Nom du projet]

## 1. Sommaire exécutif
Présenter l'objectif, le contexte, la valeur métier et le principe général de la solution.

## 2. Portée
### 2.1 Inclus
### 2.2 Exclus

## 3. Hypothèses et décisions confirmées
Tableau avec ID et décision.

| ID | Décision | Statut |
|----|----------|--------|
| DEC-001 | [Décision] | Confirmé / À valider |

## 4. Vocabulaire fonctionnel
Tableau avec terme et définition.

| Terme | Définition |
|-------|------------|
| [Terme] | [Définition] |

## 5. Feuille de route fonctionnelle
Tableau avec phase, capacités et objectif.
Phases suggérées : MVP, Avancé, Optimisation.

| Phase | Capacités | Objectif |
|-------|-----------|----------|
| MVP | [C-001, C-002] | [Objectif] |
| Avancé | [C-003, C-004] | [Objectif] |
| Optimisation | [C-005] | [Objectif] |

## 6. Vue d'interface cible
Ne pas produire de maquette ASCII.
Produire un tableau des zones fonctionnelles attendues :

| Zone | Éléments | Rôle |
|------|----------|------|
| [Zone] | [Éléments] | [Rôle] |

Note : Les maquettes visuelles sont incluses dans la version Word client.

## 7. Exigences non fonctionnelles

| ID | Exigence | Cible | Capacités concernées | Commentaire |
|----|----------|-------|----------------------|-------------|
| ENF-001 | [Exigence] | [Cible mesurable] | [C-001, C-002] | [Commentaire] |

Note : Les spécifications détaillées de performance seront dans spec.md

## 8. Règles transversales
Règles applicables à plusieurs capacités.

| ID | Règle | Capacités concernées |
|----|-------|----------------------|
| RT-001 | [Règle] | [C-001, C-002] |

## 9. Capacités fonctionnelles
Pour chaque capacité, utiliser exactement cette structure :

### C-XXX - [Nom de la capacité]

| Priorité | Phase suggérée | Statut |
| --- | --- | --- |
| [Critique/Élevée/Moyenne/Faible] | [MVP/Avancé/Optimisation] | À valider |

#### Objectif
Décrire la valeur fonctionnelle de la capacité.

#### Comportement attendu
Liste claire des comportements attendus du point de vue de l'utilisateur.

#### Algorithme de traitement
[Utiliser cette sous-section uniquement pour les capacités avec une logique séquentielle ou des branchements.
Omettre pour les capacités simples dont le comportement attendu suffit.]

La dynamique du traitement est définie comme suit :

| Étape | Nom | Détail |
|-------|-----|--------|
| A | [Décision ou vérification] | [Condition] — Si [cas 1] : passer à l'étape 1. Si [cas 2] : passer à l'étape X. |
| 1 | [Action] | [Description détaillée de ce qui se passe] |
| B | [Décision ou vérification] | [Condition] — Si [cas 1] : passer à l'étape 2. Si [cas 2] : passer à l'étape Y. |
| 2 | [Action] | [Description détaillée] |

Note : Les étapes alphabétiques (A, B, C…) sont des points de décision ou vérification.
Les étapes numériques (1, 2, 3…) sont des actions.

#### Spécification des composants d'interface
[Utiliser cette sous-section pour toutes les capacités avec une interface utilisateur.
Omettre pour les capacités purement backend ou batch.]

Tableau des éléments de l'interface, dans l'ordre d'apparition à l'écran :

| Réf. | Libellé FR / Libellé EN | Type de composant | Condition d'affichage | Action / Dynamique | Source / Destination |
|------|------------------------|-------------------|----------------------|-------------------|----------------------|
| 1 | FR : [Libellé français] / EN : [English label] | [Texte / Bouton principal / Bouton secondaire / Bouton tertiaire / Hyperlien / Icône / Liste / Champ / Tableau] | [Toujours affiché / Condition précise] | [Au clic : … / Aucune] | [Paramètre d'entrée / Capacité C-XXX / Paramètre système] |

Note :
- Les libellés FR et EN doivent être exacts — ils seront utilisés tels quels dans le code.
- La colonne "Source / Destination" indique d'où vient la donnée affichée ou où va l'action déclenchée.
- Pour les composants dont la valeur provient d'un paramètre système, référencer le code du paramètre (ex : PARAM_001).

#### Intégrations API
[Utiliser cette sous-section uniquement si la capacité appelle des APIs externes ou des services internes.
Omettre si aucune intégration.]

Pour chaque API appelée dans cette capacité :

**[Identifiant de l'API] — [Nom descriptif]**
- Rôle : [Ce que cette API fait dans le contexte de cette capacité]
- Criticité : [CRITIQUE / IMPORTANTE / OPTIONNELLE]
- Paramètres d'entrée :

| Élément | Valeur |
|---------|--------|
| [Paramètre] | [Valeur ou source] |

- Données obtenues :

| Élément | Description |
|---------|-------------|
| [Donnée] | [Description] |

#### Règles applicables

| ID | Règle |
|----|-------|
| RA-001 | [Règle] |

#### Exigences applicables

| ID | Exigence |
|----|----------|
| EF-001 | [Exigence] |

#### Critères d'acceptation

| ID | Critère | Formulation |
|----|---------|-------------|
| CA-001 | [Critère] | [Formulation testable] |

#### Cas limites à couvrir
Liste des situations à gérer (détails dans rules.md) :
1. [Cas limite 1]
2. [Cas limite 2]
3. [Cas limite 3]

Note : Les règles MUST/MUST NOT détaillées seront dans rules.md

#### Exemples fonctionnels (OBLIGATOIRE)
Inclure 1-2 exemples représentatifs pour clarifier la capacité :
- Exemple 1 (cas nominal) : [Entrée] → [Sortie attendue]
- Exemple 2 (cas limite) : [Entrée] → [Sortie attendue]

Note : Les exemples exhaustifs seront dans tests.md

#### Scénarios Gherkin
Inclure quelques scénarios représentatifs, sans chercher à produire le cahier BDD complet.

#### Notes d'implémentation
Notes utiles au développeur et à l'IA, sans sur-spécifier inutilement la solution technique.


## 10. Modèle de données fonctionnel
Tableau des objets fonctionnels et champs principaux.

| Objet | Champ | Type | Description | Obligatoire |
|-------|-------|------|-------------|-------------|
| [Objet] | [Champ] | [Type] | [Description] | Oui / Non |

## 11. Architecture fonctionnelle et états du système

### 11.1 États du système (optionnel - recommandé pour systèmes avec workflow)

Si votre système a des états distincts (ex: non configuré, configuré, actif),
les identifier ici aide l'IA à comprendre le cycle de vie de l'application.

| État | Description | Capacités disponibles | Transitions |
|------|-------------|----------------------|-------------|
| [ÉTAT_1] | [Brève description] | [C-001, C-002] | → [ÉTAT_2] quand [événement] |
| [ÉTAT_2] | [Brève description] | [C-003, C-004, C-005] | → [ÉTAT_1] quand [événement] |

Note : Pour projets complexes, les états détaillés avec comportements UI seront générés dans spec.md (voir prompts-dev.md).

### 11.2 Composantes fonctionnelles

| Composante | Responsabilité | Capacités liées |
|------------|----------------|-----------------|
| [Composante] | [Responsabilité] | [C-001, C-002] |

## 12. Modules applicatifs suggérés
Inclure seulement si utile pour le développeur.

| Module | Responsabilité | Capacités liées |
|--------|----------------|-----------------|
| [Module] | [Responsabilité] | [C-001, C-002] |

## 13. Matrice de couverture fonctionnelle

| Capacité | Règles (RA) | Exigences (EF) | Critères (CA) |
|----------|-------------|----------------|---------------|
| C-001 | RA-001, RA-002 | EF-001 | CA-001, CA-002 |

## 14. Définition de prêt pour développement

Une capacité est prête à être développée lorsque :
- [ ] L'objectif est clairement défini et approuvé
- [ ] Le comportement attendu est sans ambiguïté
- [ ] L'algorithme de traitement est complet (si applicable)
- [ ] Les composants d'interface sont spécifiés (si applicable)
- [ ] Les intégrations API sont identifiées avec leurs paramètres (si applicable)
- [ ] Les règles et exigences sont référencées
- [ ] Les critères d'acceptation sont testables
- [ ] Les cas limites sont identifiés
- [ ] Les exemples fonctionnels sont présents

## 15. Définition de terminé

Une capacité est terminée lorsque :
- [ ] Tout le comportement attendu est implémenté
- [ ] Tous les critères d'acceptation sont couverts
- [ ] Tous les cas limites identifiés sont gérés
- [ ] Les règles transversales applicables sont respectées
- [ ] Les tests ont été produits et exécutés
- [ ] Une revue de conformité a été effectuée
- [ ] Aucun écart fonctionnel non résolu ne subsiste

## 16. Paramètres système
[Utiliser cette section pour tous les projets ayant des valeurs configurables ou paramétrées.
Omettre uniquement si le projet n'a aucune constante paramétrable.]

Les paramètres ci-dessous sont des valeurs configurables du système. Ils ne doivent jamais être
hardcodés dans le code — toujours les référencer par leur code de paramètre.

| Code paramètre | Nom fonctionnel | Valeur par défaut | Description | Capacités concernées |
|----------------|-----------------|-------------------|-------------|----------------------|
| PARAM_001 | [Nom lisible] | [Valeur] | [Description de ce que ce paramètre contrôle] | [C-001, C-002] |

## 17. Messages utilisateur
[Utiliser cette section pour tous les projets ayant des messages affichés à l'utilisateur.
Omettre uniquement si aucun message n'est prévu.]

Les messages ci-dessous sont les textes exacts à afficher à l'utilisateur. Ils ne doivent jamais
être rédigés librement dans le code — toujours utiliser les textes définis ici.

| No | Condition de déclenchement | Type | Message FR | Message EN | Capacité |
|----|---------------------------|------|------------|------------|----------|
| MSG-001 | [Condition] | [Succès / Erreur / Avertissement / Information] | [Texte français exact] | [Exact English text] | [C-001] |

## 18. Directives pour l'IA de développement

> ✅ Cette section s'adresse directement à l'IA de développement et doit être lue et respectée
> lors de toute implémentation basée sur ce dossier fonctionnel.

### 18.1 Points d'attention pour l'IA
[À compléter par l'analyste selon les particularités du projet]

### 18.2 Anti-patterns à éviter

- ❌ Implémenter plusieurs capacités simultanément sans validation intermédiaire
- ❌ Modifier des règles transversales sans revue d'impact sur toutes les capacités
- ❌ Générer des tests sans les exécuter
- ❌ Accepter du code qui ne couvre pas tous les critères d'acceptation
- ❌ Ignorer les paramètres système — ne jamais hardcoder les valeurs paramétrées
- ❌ Inventer des libellés d'interface — utiliser exactement les textes de la section 17
- ✅ Toujours résumer le plan d'implémentation avant de coder
- ✅ Faire valider les interfaces entre capacités avant implémentation
- ✅ Respecter l'ordre des algorithmes de traitement numérotés


---

Contenu attendu de la version Word client :
- page titre ou en-tête documentaire;
- informations du document (version, date, auteur, statut);
- sommaire exécutif;
- portée (inclus et exclus);
- hypothèses et décisions confirmées;
- vocabulaire fonctionnel;
- feuille de route fonctionnelle;
- vue d'interface cible sous forme de tableau;
- maquettes d'interface (images fournies par l'analyste);
- exigences non fonctionnelles;
- règles transversales;
- capacités fonctionnelles avec, pour chaque capacité :
  - priorité, phase suggérée, statut;
  - objectif;
  - comportement attendu;
  - règles et exigences;
  - critères d'acceptation;
  - cas limites à couvrir;
  - notes d'implémentation seulement si compréhensibles et utiles au client;
- modèle de données fonctionnel, si utile à la compréhension;
- architecture fonctionnelle, en version non technique;
- matrice de couverture fonctionnelle;
- définition de prêt pour développement;
- définition de terminé.

Mise en forme Word attendue :
- document professionnel, sobre et lisible;
- titres hiérarchisés;
- tableaux clairs;
- blocs de priorité en début de chaque capacité;
- pas de maquette ASCII;
- pas de contenu inutilement technique;
- le document doit pouvoir être transmis au client pour validation.

Contraintes de rédaction :
- écrire en français clair;
- utiliser des identifiants stables : C-001, RA-001, EF-001, CA-001, RT-001, ENF-001, MSG-001, PARAM-001;
- éviter le verbiage inutile;
- éviter les doublons;
- distinguer clairement ce qui est confirmé, à valider, inclus et exclu;
- structurer pour qu'un développeur puisse donner une seule capacité à une IA et lui demander de l'implémenter;
- garder la capacité comme unité de compréhension, d'approbation, d'implémentation et de test;
- pour les exemples fonctionnels : fournir 1-2 exemples concrets par capacité (format Entrée → Sortie);
- pour les cas limites : identifier sans détailler (les détails seront dans rules.md);
- pour les exigences non fonctionnelles : toujours remplir la colonne "Capacités concernées" pour traçabilité;
- pour les libellés d'interface : toujours fournir FR et EN;
- pour les paramètres système : toujours utiliser un code stable (PARAM_XXX) plutôt qu'une valeur littérale.

Principe directeur :
Une capacité doit contenir tout ce dont elle a besoin pour être comprise, approuvée, codée et testée.

Le dossier fonctionnel est conçu pour être :
- Suffisamment complet pour permettre le développement direct sur des projets simples;
- Suffisamment structuré pour servir de source à la génération des 3 documents techniques détaillés (spec.md, rules.md, tests.md) sur des projets complexes;
- Toujours orienté approbation client avec un équilibre entre lisibilité métier et précision technique.

Règle de décision :
- Projet simple (< 5 capacités) → Simplifier : retirer sections 11.2, 12, 13; fusionner règles transversales dans les capacités si peu nombreuses
- Projet standard (5-10 capacités, logique métier directe) → Utiliser le dossier fonctionnel directement pour coder; sections 16 et 17 selon pertinence
- Projet complexe (> 10 capacités, logique métier complexe, intégrations API) → Utiliser sections 16 et 17; générer les 3 documents techniques (voir prompts-dev.md)
- Projet très complexe (> 20 capacités) → Ajouter un diagramme de dépendances entre capacités (Mermaid); envisager un découpage en sous-dossiers par domaine fonctionnel
```
