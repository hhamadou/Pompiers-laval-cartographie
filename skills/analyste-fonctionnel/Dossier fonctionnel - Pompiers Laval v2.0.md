# Dossier fonctionnel IA Ready — Cartographie des sites à risques — SSI Ville de Laval

| Champ            | Valeur                                                                                          |
|----------------|-----------------------------------------------------------------------------------------------|
| Version          | 2.0                                                                                             |
| Date             | 2025-07-16                                                                                      |
| Statut           | Validé — en production POC                                                                      |
| Auteur           | Analyste fonctionnel                                                                            |
| Changements v2.0 | Intégration des écarts identifiés post-implémentation : autocomplétion frappe (C-002), bouton Effacer/Réinitialiser (C-002), marker actif distingué (C-005), fermeture Échap + overlay (C-005), ARIA accessibilité (ENF-003), stack technique officielle (section 19 nouvelle), responsive tablette (ENF-004 étendu), police minimale fiche (EF-009 précisé) |

> 📎 Note : Des prompts de démarrage pour le développeur (prise de connaissance, conventions, implémentation par capacité) sont disponibles dans le dossier `templates/Prompts/` du framework.

---

## 1\. Sommaire exécutif

Le Service de sécurité incendie (SSI) de la Ville de Laval souhaite doter ses dispatchers et chefs de caserne d'un outil web simple et rapide permettant d'identifier les bâtiments à risque (matières dangereuses) dans le périmètre immédiat d'une intervention.

Actuellement, cette information est dispersée dans des fichiers gérés manuellement par les inspecteurs, rendant la recherche lente et peu fiable en situation d'urgence. L'application proposée centralise ces données sur une carte interactive consultable en quelques secondes, avec des codes couleur visuels et des fiches synthétiques par bâtiment.

La solution est une application web monopage (SPA), déployée sur l'intranet municipal, sans authentification requise. Les données sont chargées depuis un fichier JSON intégré au bundle React et affichées sur une carte Leaflet/OpenStreetMap. L'utilisateur saisit une adresse d'intervention — avec autocomplétion pendant la frappe — ou clique directement sur la carte pour visualiser les bâtiments à risque dans un rayon de 500 mètres, avec leur niveau de danger et leur distance approximative.

**Valeur métier :** Réduction du temps de consultation de l'information terrain en situation d'urgence, amélioration de la préparation opérationnelle, réduction du risque d'erreur humaine lors d'interventions impliquant des matières dangereuses.

---

## 2\. Portée

### 2.1 Inclus

- Affichage d'une carte interactive avec les bâtiments à risque géolocalisés

- Saisie d'une adresse d'intervention avec autocomplétion pendant la frappe (debounce 300ms)

- Géocodage automatique via Nominatim et affichage d'une liste de suggestions si plusieurs résultats

- Bouton Effacer permettant de réinitialiser complètement la recherche en cours

- Visualisation des bâtiments dans un rayon fixe de 500 mètres avec codes couleur

- Affichage de la distance approximative entre le point d'intervention et chaque bâtiment

- Marker du bâtiment sélectionné visuellement distingué sur la carte (contour blanc, taille agrandie)

- Filtrage des bâtiments par niveau de danger et par type d'établissement

- Consultation d'une fiche synthétique par bâtiment (7 champs)

- Fermeture de la fiche via bouton ✕, touche Échap ou clic sur l'overlay

- Chargement des données depuis un fichier JSON intégré directement au bundle de l'application (POC)

### 2.2 Exclus

- Authentification et gestion des utilisateurs

- File watcher automatique (surveillance de dossier) — hors périmètre POC

- Validation antivirus Microsoft Defender — hors périmètre POC

- Modification ou mise à jour des données par l'utilisateur

- Historique des interventions ou traçabilité des consultations

- Notifications ou alertes automatiques

- Intégration avec les systèmes CAD existants

- Application mobile native

---

## 3\. Hypothèses et décisions confirmées

| ID      | Décision                                                                                                                                | Statut                     |
|-------|---------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| DEC-001 | Le rayon de recherche est fixe à 500 mètres — non ajustable par l'utilisateur                                                           | Confirmé                   |
| DEC-002 | Pas d'authentification requise — application ouverte sur l'intranet municipal                                                           | Confirmé                   |
| DEC-003 | Le niveau de danger est une valeur numérique dans les données : 1 = Élevé, 2 = Modéré, 3 = Faible                                       | Confirmé                   |
| DEC-004 | Le fichier de données est intégré directement au bundle de l'application (import JSON) — aucune action utilisateur requise au démarrage | Confirmé                   |
| DEC-005 | Pas de localStorage pour la POC — les données sont toujours disponibles via le bundle, aucune persistance inter-session n'est requise   | Confirmé                   |
| DEC-006 | Le géocodage des adresses utilise Nominatim (OpenStreetMap) — gratuit, sans clé API                                                     | Confirmé                   |
| DEC-007 | Si Nominatim est indisponible, l'utilisateur peut cliquer directement sur la carte                                                      | Confirmé                   |
| DEC-008 | Le fond de carte utilise les tuiles OpenStreetMap avec source secondaire en fallback                                                    | Confirmé                   |
| DEC-009 | Les coordonnées GPS (latitude/longitude) dans le fichier JSON permettent de bypasser le géocodage                                       | Confirmé                   |
| DEC-010 | L'application est déployée sur un serveur Windows local (intranet municipal)                                                            | À confirmer avec équipe TI |
| DEC-011 | L'autocomplétion Nominatim se déclenche après 300ms d'inactivité, à partir de 4 caractères saisis                                      | Confirmé                   |
| DEC-012 | Le bouton Effacer remet l'intégralité de l'état applicatif à zéro (point, markers, fiche, suggestions, erreurs)                        | Confirmé                   |
| DEC-013 | Le marker du bâtiment dont la fiche est ouverte est visuellement distingué — sa couleur de danger reste identifiable (fillColor inchangé) | Confirmé                   |

---

## 4\. Vocabulaire fonctionnel

| Terme                | Définition                                                                                                          |
|--------------------|-------------------------------------------------------------------------------------------------------------------|
| Bâtiment à risque    | Établissement répertorié comme contenant des matières dangereuses, documenté par les inspecteurs du SSI             |
| Point d'intervention | Adresse ou coordonnées GPS définissant le centre du périmètre de recherche                                          |
| Rayon de recherche   | Distance fixe de 500 mètres autour du point d'intervention dans laquelle les bâtiments à risque sont affichés       |
| Niveau de danger     | Classification du risque d'un bâtiment : 1 = Élevé (rouge), 2 = Modéré (orange), 3 = Faible (jaune)                 |
| Fiche synthétique    | Fenêtre contextuelle affichant les 7 informations clés d'un bâtiment sélectionné sur la carte                       |
| Marker               | Icône colorée positionnée sur la carte à l'emplacement d'un bâtiment à risque                                       |
| Marker actif         | Marker du bâtiment dont la fiche synthétique est actuellement ouverte — visuellement distingué des autres markers   |
| Géocodage            | Conversion d'une adresse textuelle en coordonnées GPS (latitude, longitude) via Nominatim                           |
| Autocomplétion       | Déclenchement automatique du géocodage pendant la frappe, après un délai d'inactivité (debounce)                    |
| Bundle               | Fichier JavaScript compilé de l'application React — les données JSON y sont intégrées directement (import statique) |
| Dispatcher           | Opérateur au centre de commandement qui reçoit les appels et coordonne les interventions                            |
| Chef de caserne      | Responsable d'une équipe d'intervention sur le terrain                                                              |
| Réinitialisation     | Action de remettre l'application dans son état initial : aucun point, aucun marker, aucune fiche ouverte            |

---

## 5\. Feuille de route fonctionnelle

| Phase        | Capacités                                          | Objectif                                                                                                   |
|------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| MVP          | C-001, C-002, C-003                                | Application fonctionnelle permettant de visualiser les bâtiments à risque dans un périmètre d'intervention |
| Avancé       | C-004, C-005                                       | Enrichissement de la consultation avec filtres et fiches détaillées                                        |
| Optimisation | File watcher, validation antivirus, PWA hors ligne | Automatisation du chargement et robustesse opérationnelle                                                  |

---

## 6\. Vue d'interface cible

| Zone                       | Éléments                                                                                              | Rôle                                  |
|--------------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------|
| Barre supérieure           | Indicateur de statut des données, champ adresse avec autocomplétion, bouton Localiser, bouton Effacer | Contrôle principal de l'intervention  |
| Liste de suggestions       | Liste déroulante sous le champ — affichée si Nominatim retourne plusieurs résultats                   | Sélection de l'adresse précise        |
| Panneau de filtres         | Boutons toggle niveau de danger, liste type d'établissement                                           | Affinage de la visualisation          |
| Zone carte                 | Carte Leaflet, markers colorés (marker actif distingué), cercle de rayon, étiquettes de distance      | Visualisation géospatiale des risques |
| Fiche synthétique (modale) | 7 champs du bâtiment sélectionné, fermeture ✕ / Échap / overlay                                      | Consultation du détail d'un bâtiment  |

---

## 7\. Exigences non fonctionnelles

| ID      | Exigence                                     | Cible                             | Capacités concernées | Commentaire                                                                              |
|-------|--------------------------------------------|---------------------------------|--------------------|---------------------------------------------------------------------------------------|
| ENF-001 | Temps de chargement initial                  | < 3 secondes                      | Toutes               | Sur réseau intranet standard                                                              |
| ENF-002 | Affichage des markers après saisie d'adresse | < 2 secondes                      | C-002, C-003         | Inclut géocodage et filtrage                                                              |
| ENF-003 | Lisibilité et accessibilité                  | Contraste WCAG AA + ARIA complet  | Toutes               | Tablette en plein soleil, stress — attributs aria-label, role, aria-pressed obligatoires |
| ENF-004 | Compatibilité tablette                       | Interface responsive (768px+)     | Toutes               | Usage terrain chef de caserne — media queries requises, police min 14px                  |
| ENF-005 | Disponibilité hors ligne (partielle)         | Service Worker + cache navigateur | C-003, C-004, C-005  | Hors périmètre POC — phase Optimisation seulement                                        |

---

## 8\. Règles transversales

| ID     | Règle                                                                                                                                       | Capacités concernées       |
|------|-------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| RT-001 | Le niveau de danger est toujours dérivé de la valeur numérique dans les données (1/2/3) — jamais calculé ou interprété autrement            | C-001, C-003, C-004, C-005 |
| RT-002 | Les codes couleur des markers sont toujours lus depuis les paramètres système (PARAM_002, PARAM_003, PARAM_004) — jamais hardcodés          | C-001, C-003, C-005        |
| RT-003 | Les données JSON sont intégrées au bundle — elles sont toujours disponibles au démarrage, sans action utilisateur ni vérification de cache  | C-001                      |
| RT-004 | Le rayon de recherche est toujours PARAM_001 (500m) — jamais modifiable par l'utilisateur                                                   | C-002, C-003               |
| RT-005 | Les libellés affichés à l'utilisateur sont toujours lus depuis la section 17 (Messages utilisateur) — jamais rédigés librement dans le code | Toutes                     |
| RT-006 | Le fillColor du marker actif reste la couleur de danger du bâtiment — seuls le contour, le poids et la taille changent                      | C-005                      |

---

## 9\. Capacités fonctionnelles

### C-001 — Initialisation de l'application

| Priorité | Phase suggérée | Statut    |
|--------|--------------|---------|
| Critique | MVP            | ✅ Validé |

#### Objectif

Initialiser l'application au démarrage en rendant les données des bâtiments à risque disponibles pour la visualisation cartographique. Les données JSON sont intégrées directement dans le bundle React (import statique) — elles sont toujours disponibles sans action de l'utilisateur ni vérification de cache. L'indicateur de statut confirme que l'application est prête.

#### Comportement attendu

- Au démarrage, l'application charge les données JSON intégrées au bundle (import statique)

- Le chargement est synchrone et transparent — aucune attente perceptible par l'utilisateur

- L'indicateur de statut affiche immédiatement le nombre de bâtiments chargés

- Les capacités C-002 à C-005 sont disponibles dès le chargement terminé

#### Algorithme de traitement

| Étape | Nom                        | Détail                                                                                                                                          |
|-----|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| 1     | Charger les données bundle | Lire le fichier JSON importé statiquement dans le bundle React. Initialiser la liste des bâtiments en mémoire. Passer à l'état DONNÉES_VALIDES. |
| 2     | Afficher l'indicateur      | Mettre à jour le badge : "X bâtiments chargés". Rendre les capacités C-002 à C-005 disponibles.                                                 |

#### Spécification des composants d'interface

| Réf. | Libellé FR                           | Type de composant | Condition d'affichage     | Action / Dynamique | Source / Destination          |
|----|------------------------------------|-----------------|-------------------------|------------------|-----------------------------|
| 1    | Indicateur de statut                 | Badge/texte       | Toujours affiché          | Aucune             | État interne de l'application |
| 2    | "Chargement des données en cours..." | Texte informatif  | Bref instant au démarrage | Aucune             | MSG-001                       |
| 3    | "X bâtiments chargés"                | Badge vert        | État DONNÉES_VALIDES      | Aucune             | Données bundle                |

#### Règles applicables

| ID     | Règle                                                                                                            |
|------|----------------------------------------------------------------------------------------------------------------|
| RA-001 | Les données JSON sont importées statiquement dans le bundle — elles ne peuvent pas être corrompues à l'exécution |
| RA-002 | Les données POC sont considérées valides par défaut — aucune validation de schéma requise pour la POC            |

#### Exigences applicables

| ID     | Exigence                                                                           |
|------|----------------------------------------------------------------------------------|
| EF-001 | Les données doivent être disponibles en moins de 3 secondes au démarrage (ENF-001) |
| EF-002 | L'indicateur de statut doit refléter l'état réel des données à tout moment         |

#### Critères d'acceptation

| ID     | Critère                             | Formulation                                                                                                                                                                  |
|------|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CA-001 | Chargement automatique au démarrage | Étant donné que l'application vient d'être ouverte, quand le bundle est chargé, alors les données JSON sont disponibles en mémoire et le badge affiche "X bâtiments chargés" |
| CA-002 | Application prête immédiatement     | Quand l'indicateur affiche "X bâtiments chargés", alors les capacités C-002 à C-005 sont toutes disponibles                                                                  |

#### Cas limites à couvrir

1. Bundle correctement intégré mais liste de bâtiments vide (JSON = tableau vide)

#### Notes d'implémentation

- Importer le fichier JSON directement dans le composant App React via un module dédié (`dataLoader.js`)

- Le chargement est synchrone — pas de `useEffect` de chargement asynchrone requis pour les données

- Les types d'établissement uniques sont extraits au chargement avec `Array.from(new Set(...))`

---

### C-002 — Définition du point d'intervention

| Priorité | Phase suggérée | Statut    |
|--------|--------------|---------|
| Critique | MVP            | ✅ Validé |

#### Objectif

Permettre à l'utilisateur de définir le point central de l'intervention, soit en saisissant une adresse (géocodée automatiquement pendant la frappe ou à la validation), soit en cliquant directement sur la carte. Un bouton Effacer permet de remettre toute la session à zéro.

#### Comportement attendu

- L'utilisateur saisit une adresse dans le champ dédié

- **Autocomplétion :** dès 4 caractères saisis, la recherche Nominatim se déclenche automatiquement après 300ms d'inactivité (debounce) — sans que l'utilisateur appuie sur "Localiser"

- L'utilisateur peut aussi valider explicitement en cliquant sur "Localiser" ou en appuyant sur Entrée — le debounce en cours est alors annulé et la recherche part immédiatement

- Si Nominatim retourne plusieurs résultats, afficher les 3 premiers dans une liste déroulante

- Si Nominatim retourne 1 seul résultat, positionner directement le point sans liste

- Si Nominatim est indisponible ou dépasse le timeout (PARAM_005), afficher MSG-004

- L'utilisateur peut alternativement cliquer directement sur la carte pour définir le point

- Une fois le point défini, un marker spécial (différent des bâtiments) indique le point d'intervention

- Le cercle de rayon PARAM_001 (500m) s'affiche automatiquement autour du point

- **Bouton Effacer (✕) :** visible dès qu'il y a du texte dans le champ — réinitialise le champ, annule le debounce en cours, et remet tout l'état applicatif à zéro (point d'intervention, markers, fiche ouverte, suggestions, messages d'erreur)

#### Algorithme de traitement

| Étape | Nom                       | Détail                                                                                                                                                          |
|-----|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| A     | Source du point           | Si saisie d'adresse : passer à l'étape 1. Si clic sur carte : passer à l'étape 4. Si clic sur ✕ : passer à l'étape 5.                                          |
| 1     | Appel Nominatim           | Envoyer l'adresse à l'API Nominatim (déclenché par debounce ou soumission). Démarrer timer PARAM_005.                                                           |
| B     | Résultat Nominatim        | Si timeout ou erreur : passer à l'étape 3. Si 0 résultat : passer à l'étape 3. Si 1 résultat : passer à l'étape 4. Si plusieurs résultats : passer à l'étape 2. |
| 2     | Sélection résultat        | Afficher les 3 premiers résultats. Attendre sélection utilisateur. Passer à l'étape 4.                                                                          |
| 3     | Fallback                  | Afficher MSG-004 ou MSG-005. Attendre clic sur carte.                                                                                                           |
| 4     | Positionner le point      | Placer marker d'intervention sur les coordonnées. Centrer la carte. Afficher cercle rayon PARAM_001. Déclencher C-003.                                          |
| 5     | Réinitialiser             | Effacer le champ adresse. Annuler le debounce. Supprimer point d'intervention, markers, fiche ouverte, suggestions, messages d'erreur.                          |

#### Spécification des composants d'interface

| Réf. | Libellé FR                    | Type de composant         | Condition d'affichage           | Action / Dynamique                                | Source / Destination           |
|----|-----------------------------|-------------------------|---------------------------------|--------------------------------------------------|------------------------------|
| 1    | Adresse d'intervention        | Champ texte               | Toujours affiché                 | Saisie libre — déclenche autocomplétion (debounce) | Entrée utilisateur → Nominatim |
| 2    | Localiser                     | Bouton principal          | Toujours affiché                 | Au clic : déclenche géocodage immédiat             | C-002                          |
| 3    | ✕ Effacer                    | Bouton icône (dans champ) | Quand champ non vide             | Au clic : réinitialise toute la session            | DEC-012                        |
| 4    | [Liste résultats Nominatim]   | Liste déroulante          | Si plusieurs résultats Nominatim | Sélection → positionne le point                   | Nominatim → carte              |
| 5    | [Marker point d'intervention] | Marker carte (distinctif) | Quand point défini               | Aucune                                             | Coordonnées GPS                |
| 6    | [Cercle de rayon]             | Layer Leaflet             | Quand point défini               | Aucune                                             | PARAM_001                      |

#### Intégrations API

**API-003 — Nominatim (OpenStreetMap)**

- Rôle : Convertir l'adresse saisie en coordonnées GPS

- Criticité : IMPORTANTE — fallback disponible (clic sur carte)

- Politique d'usage : header `User-Agent` obligatoire identifiant l'application + `Accept-Language: fr`

- Paramètres d'entrée :

| Élément      | Valeur                                      |
|------------|-------------------------------------------|
| Adresse      | Texte saisi par l'utilisateur               |
| Format       | json                                        |
| Limit        | 3                                           |
| countrycodes | ca (Canada uniquement)                      |

- Données obtenues :

| Élément      | Description                                   |
|------------|---------------------------------------------|
| lat          | Latitude du résultat                          |
| lon          | Longitude du résultat                         |
| display_name | Adresse formatée pour affichage dans la liste |

#### Règles applicables

| ID     | Règle                                                                                                                       |
|------|---------------------------------------------------------------------------------------------------------------------------|
| RA-003 | L'autocomplétion ne se déclenche qu'à partir de 4 caractères — évite les requêtes Nominatim sur des saisies trop courtes   |
| RA-004 | Si Nominatim ne répond pas dans PARAM_005 secondes, déclencher le fallback sans attendre                                   |
| RA-005 | Le clic sur carte est toujours disponible comme alternative au géocodage, indépendamment de l'état de Nominatim            |
| RA-006 | Le marker d'intervention doit être visuellement distinct des markers de bâtiments (forme ou couleur différente)            |
| RA-016 | Le bouton ✕ Effacer est visible dans le champ dès qu'il contient du texte — il disparaît quand le champ est vide           |
| RA-017 | La réinitialisation est totale : point d'intervention, markers, fiche ouverte, suggestions, messages d'erreur — tout à zéro |

#### Exigences applicables

| ID     | Exigence                                                                          |
|------|---------------------------------------------------------------------------------|
| EF-003 | L'adresse doit être géocodée et le point affiché en moins de 2 secondes (ENF-002) |
| EF-004 | Le fallback clic sur carte doit fonctionner sans aucune dépendance réseau         |
| EF-010 | L'autocomplétion ne doit pas envoyer plus d'une requête par 300ms (PARAM_006)     |

#### Critères d'acceptation

| ID     | Critère                        | Formulation                                                                                                                                                               |
|------|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CA-004 | Géocodage réussi               | Étant donné une adresse valide, quand l'utilisateur clique Localiser, alors la carte se centre sur l'adresse et le cercle de 500m s'affiche                               |
| CA-005 | Adresse ambiguë                | Étant donné une adresse retournant plusieurs résultats, quand l'utilisateur clique Localiser, alors les 3 premiers résultats sont proposés dans une liste                 |
| CA-006 | Nominatim indisponible         | Étant donné que Nominatim est indisponible, quand l'utilisateur clique Localiser, alors MSG-004 s'affiche et le clic sur carte reste fonctionnel                          |
| CA-007 | Clic sur carte                 | Étant donné n'importe quel état de Nominatim, quand l'utilisateur clique sur la carte, alors le point d'intervention est défini à cet emplacement                        |
| CA-019 | Autocomplétion pendant frappe  | Étant donné 4 caractères ou plus saisis, quand l'utilisateur cesse de taper pendant 300ms, alors une recherche Nominatim est déclenchée automatiquement                  |
| CA-020 | Bouton Effacer visible         | Étant donné du texte dans le champ, alors le bouton ✕ est visible à droite du champ                                                                                      |
| CA-021 | Réinitialisation complète      | Quand l'utilisateur clique ✕, alors le champ est vidé, le point d'intervention supprimé, les markers effacés, la fiche fermée, les suggestions et erreurs disparaissent   |

#### Cas limites à couvrir

1. Adresse introuvable (0 résultat Nominatim)

2. Nominatim timeout (> PARAM_005 secondes)

3. Nominatim retourne plusieurs résultats ambigus

4. Utilisateur clique hors de la zone géographique de Laval

5. Utilisateur clique ✕ avant que le debounce soit écoulé — le debounce doit être annulé

6. Utilisateur appuie sur Entrée pendant le debounce — la recherche doit partir immédiatement

#### Scénarios Gherkin

```gherkin
Scénario : Autocomplétion pendant la frappe
  Étant donné que le champ adresse est vide
  Quand l'utilisateur saisit "3030 boul Le Carrefour"
  Et qu'il cesse de taper pendant 300ms
  Alors une recherche Nominatim est déclenchée automatiquement
  Et les résultats s'affichent dans la liste déroulante

Scénario : Réinitialisation via bouton Effacer
  Étant donné qu'un point d'intervention est défini et des markers sont affichés
  Quand l'utilisateur clique sur le bouton ✕
  Alors le champ est vidé
  Et le point d'intervention disparaît
  Et les markers sont effacés
  Et la carte revient à son état initial

Scénario : Géocodage d'une adresse valide
  Étant donné que des données sont chargées
  Et que Nominatim est disponible
  Quand l'utilisateur saisit "3 Place du Souvenir, Laval" et clique Localiser
  Alors la carte se centre sur les coordonnées correspondantes
  Et un cercle de 500m s'affiche
  Et les bâtiments à risque dans le rayon sont affichés
```

#### Notes d'implémentation

- Utiliser `fetch` avec `AbortController` pour implémenter le timeout Nominatim (PARAM_005)

- Debounce : `useEffect` sur la valeur du champ + `useRef` pour le timer — annuler le timer au unmount

- Le seuil de 4 caractères évite les appels Nominatim sur des saisies comme "Lav" qui retournent des centaines de résultats

- Respecter la politique d'usage Nominatim : `User-Agent` identifiant l'application + `Accept-Language: fr`

- Le bouton ✕ est positionné en `absolute` à l'intérieur d'un wrapper relatif — le champ a un `padding-right` réservé

---

### C-003 — Visualisation des bâtiments à risque dans le périmètre

| Priorité | Phase suggérée | Statut    |
|--------|--------------|---------|
| Critique | MVP            | ✅ Validé |

#### Objectif

Afficher sur la carte tous les bâtiments à risque situés dans le rayon PARAM_001 autour du point d'intervention, avec leur code couleur de danger et leur distance approximative.

#### Comportement attendu

- Dès qu'un point d'intervention est défini (via C-002), calculer la distance entre ce point et chaque bâtiment

- Afficher uniquement les bâtiments dont la distance est ≤ PARAM_001 (500m)

- Chaque bâtiment est représenté par un marker coloré selon son niveau de danger (PARAM_002/003/004)

- Une étiquette de distance approximative est affichée près de chaque marker

- Si aucun bâtiment n'est dans le rayon, afficher MSG-007

- Si les filtres C-004 sont actifs, n'afficher que les bâtiments correspondant aux filtres

- En cas d'indisponibilité des tuiles de fond de carte, afficher MSG-006 en bannière — les données restent consultables

#### Algorithme de traitement

| Étape | Nom                         | Détail                                                                                                                 |
|-----|---------------------------|----------------------------------------------------------------------------------------------------------------------|
| 1     | Calculer les distances      | Pour chaque bâtiment de la liste, calculer la distance haversine entre ses coordonnées GPS et le point d'intervention  |
| A     | Filtrer par rayon           | Si distance ≤ PARAM_001 : inclure dans la liste de résultats. Sinon : exclure.                                         |
| B     | Filtrer par critères actifs | Si filtres C-004 actifs : appliquer les filtres sur la liste de résultats.                                             |
| 2     | Afficher les markers        | Pour chaque bâtiment retenu : créer un marker Leaflet coloré selon niveau_danger. Positionner sur ses coordonnées GPS. |
| 3     | Afficher les distances      | Sous chaque marker, afficher la distance arrondie (ex. : "120 m")                                                      |
| C     | Vérifier résultats          | Si liste vide : afficher MSG-007.                                                                                      |

#### Spécification des composants d'interface

| Réf. | Libellé FR                                   | Type de composant  | Condition d'affichage            | Action / Dynamique        | Source / Destination |
|----|--------------------------------------------|------------------|--------------------------------|-------------------------|--------------------|
| 1    | [Marker rouge]                               | Marker carte       | Niveau danger = 1, dans le rayon | Au clic : déclenche C-005 | PARAM_002            |
| 2    | [Marker orange]                              | Marker carte       | Niveau danger = 2, dans le rayon | Au clic : déclenche C-005 | PARAM_003            |
| 3    | [Marker jaune]                               | Marker carte       | Niveau danger = 3, dans le rayon | Au clic : déclenche C-005 | PARAM_004            |
| 4    | [Étiquette distance]                         | Texte sur carte    | Quand marker affiché             | Aucune                    | Calcul haversine     |
| 5    | "Aucun bâtiment à risque dans ce périmètre." | Message informatif | Si 0 résultat                    | Aucune                    | MSG-007              |
| 6    | "Fond de carte indisponible..."              | Bannière orange    | Si erreur tuile OSM (tileerror)  | Aucune                    | MSG-006              |

#### Règles applicables

| ID     | Règle                                                                                                                            |
|------|--------------------------------------------------------------------------------------------------------------------------------|
| RA-007 | La distance est calculée par la formule haversine (distance à vol d'oiseau) — affichée arrondie au mètre le plus proche          |
| RA-008 | La couleur du marker est toujours déterminée par la valeur niveau_danger du bâtiment, jamais calculée autrement (RT-001, RT-002) |
| RA-009 | Si un bâtiment n'a pas de coordonnées GPS valides, il est exclu silencieusement des résultats                                    |

#### Exigences applicables

| ID     | Exigence                                                                                                      |
|------|-------------------------------------------------------------------------------------------------------------|
| EF-005 | Les markers doivent s'afficher en moins de 2 secondes après définition du point (ENF-002)                     |
| EF-006 | Les codes couleur doivent respecter un contraste suffisant pour une lecture en conditions dégradées (ENF-003) |

#### Critères d'acceptation

| ID     | Critère                         | Formulation                                                                                                              |
|------|-------------------------------|------------------------------------------------------------------------------------------------------------------------|
| CA-008 | Affichage markers dans le rayon | Étant donné un point d'intervention défini, alors seuls les bâtiments à ≤ 500m sont affichés avec leur couleur de danger |
| CA-009 | Distance affichée               | Chaque marker affiche la distance arrondie en mètres                                                                     |
| CA-010 | Aucun résultat                  | Étant donné un point sans bâtiments dans le rayon, alors MSG-007 s'affiche                                               |
| CA-011 | Cohérence couleurs              | Le marker rouge correspond uniquement aux bâtiments avec niveau_danger = 1                                               |
| CA-022 | Bannière fond de carte          | Étant donné une erreur de chargement de tuile OSM, alors MSG-006 s'affiche en bannière et les données restent accessibles |

#### Cas limites à couvrir

1. Aucun bâtiment dans le rayon de 500m

2. Bâtiment exactement à 500m (inclus)

3. Bâtiment sans coordonnées GPS valides dans le fichier JSON

4. Grand nombre de bâtiments dans le rayon (performance)

5. Réseau indisponible — tuiles OSM non chargées

#### Notes d'implémentation

- Formule haversine disponible en JavaScript pur — pas de librairie nécessaire

- Configurer une deuxième couche TileLayer (source secondaire OSM France) dès le départ

- Écouter l'événement `tileerror` de Leaflet pour déclencher MSG-006

---

### C-004 — Filtrage des bâtiments affichés

| Priorité | Phase suggérée | Statut    |
|--------|--------------|---------|
| Élevée   | Avancé         | ✅ Validé |

#### Objectif

Permettre à l'utilisateur de restreindre l'affichage des bâtiments selon le niveau de danger et/ou le type d'établissement, afin de cibler rapidement les risques les plus pertinents pour l'intervention.

#### Comportement attendu

- Des boutons toggle permettent de filtrer par niveau de danger (rouge, orange, jaune — actifs par défaut)

- Une liste déroulante permet de filtrer par type d'établissement (tous les types par défaut)

- Les filtres sont appliqués immédiatement à chaque changement, sans bouton de confirmation

- Les markers sur la carte sont mis à jour instantanément selon les filtres actifs

- Si les filtres excluent tous les bâtiments, MSG-007 s'affiche

- Les filtres persistent tant que l'utilisateur ne les réinitialise pas ou ne clique pas sur ✕ Effacer

#### Spécification des composants d'interface

| Réf. | Libellé FR           | Type de composant | Condition d'affichage  | Action / Dynamique             | Source / Destination            |
|----|--------------------|-----------------|----------------------|------------------------------|-------------------------------|
| 1    | Élevé                | Bouton toggle     | Quand données chargées | Toggle ON/OFF → filtre markers | État filtre → C-003             |
| 2    | Modéré               | Bouton toggle     | Quand données chargées | Toggle ON/OFF → filtre markers | État filtre → C-003             |
| 3    | Faible               | Bouton toggle     | Quand données chargées | Toggle ON/OFF → filtre markers | État filtre → C-003             |
| 4    | Type d'établissement | Liste déroulante  | Quand données chargées | Sélection → filtre markers     | Valeurs uniques du JSON → C-003 |

#### Règles applicables

| ID     | Règle                                                                                                     |
|------|---------------------------------------------------------------------------------------------------------|
| RA-010 | Les filtres par niveau de danger sont tous actifs par défaut au chargement                                |
| RA-011 | La liste des types d'établissement est générée dynamiquement à partir des valeurs uniques du fichier JSON |
| RA-012 | Les filtres n'affectent que l'affichage — les données en mémoire restent intactes                         |

#### Exigences applicables

| ID     | Exigence                                                                                   |
|------|------------------------------------------------------------------------------------------|
| EF-007 | La mise à jour des markers suite à un changement de filtre doit être instantanée (< 500ms) |

#### Critères d'acceptation

| ID     | Critère                   | Formulation                                                                                                                        |
|------|-------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| CA-012 | Filtre niveau de danger   | Quand l'utilisateur désactive le niveau "Faible", alors les markers jaunes disparaissent de la carte                               |
| CA-013 | Filtre type établissement | Quand l'utilisateur sélectionne "Industrie chimique", alors seuls les markers de ce type sont affichés                             |
| CA-014 | Filtres cumulatifs        | Quand plusieurs filtres sont actifs simultanément, alors seuls les bâtiments correspondant à TOUS les filtres actifs sont affichés |

#### Cas limites à couvrir

1. Tous les niveaux de danger désactivés (aucun marker affiché)

2. Filtre qui exclut tous les bâtiments du rayon (MSG-007)

3. Type d'établissement avec un seul bâtiment dans la base

4. Clic sur ✕ Effacer — les filtres reviennent à leur état par défaut (tous actifs, type = tous)

#### Notes d'implémentation

- Implémenter le filtrage comme une dérivation de l'état React (`useMemo`) plutôt qu'une modification des données

- Les types d'établissement sont extraits des données JSON au chargement avec `Array.from(new Set(...))`

---

### C-005 — Consultation de la fiche synthétique d'un bâtiment

| Priorité | Phase suggérée | Statut    |
|--------|--------------|---------|
| Élevée   | Avancé         | ✅ Validé |

#### Objectif

Permettre à l'utilisateur de consulter le détail complet d'un bâtiment à risque en cliquant sur son marker sur la carte. Le marker correspondant est visuellement distingué pendant que la fiche est ouverte.

#### Comportement attendu

- Au clic sur un marker, une fiche synthétique s'affiche dans une fenêtre modale

- La fiche affiche les 7 champs confirmés du bâtiment

- Le niveau de danger est affiché avec son code couleur correspondant

- Le marker du bâtiment sélectionné change d'apparence : contour blanc épais, rayon agrandi — sa couleur de fond (danger) reste inchangée et identifiable

- L'utilisateur peut fermer la fiche de trois façons : clic sur le bouton ✕, touche Échap, ou clic sur l'overlay semi-transparent derrière la modale

- Une seule fiche est affichée à la fois — ouvrir une nouvelle fiche ferme la précédente et met à jour le marker actif

#### Spécification des composants d'interface

| Réf. | Libellé FR              | Type de composant      | Condition d'affichage   | Action / Dynamique                        | Source / Destination                    |
|----|-----------------------|----------------------|------------------------|------------------------------------------|---------------------------------------|
| 1    | [Fiche synthétique]     | Modale                 | Au clic sur marker      | Affichage des 7 champs                    | Données JSON du bâtiment                |
| 2    | Nom du bâtiment         | Texte titre            | Dans la modale          | Aucune                                    | Champ nom du JSON                       |
| 3    | Adresse                 | Texte                  | Dans la modale          | Aucune                                    | Champ adresse du JSON                   |
| 4    | Type d'établissement    | Texte                  | Dans la modale          | Aucune                                    | Champ type_etablissement du JSON        |
| 5    | Matières dangereuses    | Liste                  | Dans la modale          | Aucune                                    | Champ matieres_dangereuses du JSON      |
| 6    | Quantités connues       | Texte                  | Dans la modale          | Aucune                                    | Champ quantites du JSON                 |
| 7    | Niveau de danger        | Badge coloré           | Dans la modale          | Aucune                                    | Champ niveau_danger → PARAM_002/003/004 |
| 8    | Consignes particulières | Texte                  | Dans la modale          | Aucune                                    | Champ consignes du JSON                 |
| 9    | ✕ Fermer                | Bouton tertiaire       | Dans la modale          | Au clic : ferme la modale                 | Aucune                                  |
| 10   | [Overlay]               | Fond semi-transparent  | Quand modale ouverte    | Au clic : ferme la modale                 | Aucune                                  |
| 11   | [Marker actif]          | Marker carte modifié   | Quand fiche ouverte     | Contour blanc épais, rayon agrandi        | DEC-013, RT-006                         |

#### Règles applicables

| ID     | Règle                                                                                                                                    |
|------|----------------------------------------------------------------------------------------------------------------------------------------|
| RA-013 | Une seule fiche peut être ouverte à la fois — cliquer sur un autre marker ferme la fiche courante et ouvre la nouvelle                   |
| RA-014 | Si un champ est vide dans les données JSON, afficher "Non renseigné" plutôt qu'un champ vide                                             |
| RA-015 | Le badge de niveau de danger utilise les mêmes couleurs que le marker (PARAM_002/003/004 — RT-002)                                       |
| RA-018 | Quand la fiche est ouverte, le marker correspondant a : radius agrandi, contour blanc (color=#ffffff), poids de contour doublé (weight=4) |
| RA-019 | La fermeture de la fiche remet le marker à son apparence normale — le marker actif redevient un marker standard                          |
| RA-020 | Le marker actif ne masque pas les markers voisins — son fillColor (couleur danger) reste identique à son état non-actif (RT-006)         |

#### Exigences applicables

| ID     | Exigence                                                                                                               |
|------|----------------------------------------------------------------------------------------------------------------------|
| EF-008 | La fiche doit s'afficher instantanément au clic (< 200ms) — les données sont déjà en mémoire                          |
| EF-009 | La fiche doit être lisible sur tablette — taille de police minimale 14px sur tous les éléments, contraste WCAG AA      |

#### Critères d'acceptation

| ID     | Critère                    | Formulation                                                                                                                          |
|------|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| CA-015 | Affichage fiche            | Quand l'utilisateur clique sur un marker, alors la fiche synthétique s'affiche avec les 7 champs                                     |
| CA-016 | Badge couleur              | Le badge de niveau de danger affiche la couleur correspondante (rouge/orange/jaune)                                                  |
| CA-017 | Champ vide                 | Si un champ est absent des données, alors "Non renseigné" est affiché                                                                |
| CA-018 | Fermeture bouton           | Quand l'utilisateur clique ✕ ou sur un autre marker, alors la fiche se ferme                                                         |
| CA-023 | Fermeture touche Échap     | Quand la fiche est ouverte et que l'utilisateur appuie sur Échap, alors la fiche se ferme                                            |
| CA-024 | Fermeture overlay          | Quand l'utilisateur clique sur le fond semi-transparent derrière la modale, alors la fiche se ferme                                  |
| CA-025 | Marker actif distingué     | Quand la fiche d'un bâtiment est ouverte, alors son marker sur la carte a un contour blanc, un rayon plus grand et son étiquette est en surbrillance |
| CA-026 | fillColor marker inchangé  | Le marker actif conserve sa couleur de danger (rouge/orange/jaune) — seuls le contour et la taille changent                          |

#### Cas limites à couvrir

1. Bâtiment avec champs optionnels vides (quantités, consignes)

2. Liste de matières dangereuses très longue (> 10 matières)

3. Clic rapide sur plusieurs markers successifs

4. Clic sur ✕ Effacer alors qu'une fiche est ouverte — la fiche doit se fermer avec la réinitialisation

#### Notes d'implémentation

- Passer l'`id` du bâtiment sélectionné à `MapView` via une prop `batimentActifId` — MapView adapte le rendu du marker correspondant

- Fermeture Échap : `useEffect` sur `document.addEventListener('keydown')` — nettoyage au unmount

- Fermeture overlay : `onClick` sur le conteneur de la modale avec `if (e.target === e.currentTarget) onFermer()`

- Taille de police minimale 14px sur tous les éléments de la fiche (EF-009)

---

## 10\. Modèle de données fonctionnel

| Objet    | Champ                | Type            | Description                              | Obligatoire                     |
|--------|--------------------|---------------|----------------------------------------|-------------------------------|
| Bâtiment | id                   | String          | Identifiant unique (ex: BAT-001)         | Oui                             |
| Bâtiment | nom                  | String          | Nom de l'établissement                   | Oui                             |
| Bâtiment | adresse              | String          | Adresse complète                         | Oui                             |
| Bâtiment | type_etablissement   | String          | Catégorie de l'établissement             | Oui                             |
| Bâtiment | matieres_dangereuses | String[]        | Liste des matières dangereuses présentes | Oui                             |
| Bâtiment | quantites            | String[]        | Quantités associées aux matières         | Non                             |
| Bâtiment | niveau_danger        | Integer (1/2/3) | 1 = Élevé, 2 = Modéré, 3 = Faible        | Oui                             |
| Bâtiment | consignes            | String          | Consignes particulières d'intervention   | Non                             |
| Bâtiment | latitude             | Float           | Coordonnée GPS — latitude                | Non (bypass géocodage si présent) |
| Bâtiment | longitude            | Float           | Coordonnée GPS — longitude               | Non (bypass géocodage si présent) |

---

## 11\. Architecture fonctionnelle et états du système

### 11.1 États du système

| État                | Description                                                     | Capacités disponibles             | Transitions                            |
|-------------------|---------------------------------------------------------------|---------------------------------|--------------------------------------|
| CHARGEMENT_EN_COURS | Bref instant au démarrage pendant le rendu initial du bundle    | Aucune (interface verrouillée)    | → DONNÉES_VALIDES dès le bundle chargé |
| DONNÉES_VALIDES     | Données JSON disponibles en mémoire (chargées depuis le bundle) | C-001, C-002, C-003, C-004, C-005 | État terminal pour la POC              |

---

## 12\. Modules applicatifs

| Module        | Responsabilité                                                                                             | Capacités liées     |
|-------------|----------------------------------------------------------------------------------------------------------|-------------------|
| DataLoader    | Import statique du JSON bundle, initialisation de l'état des bâtiments en mémoire                          | C-001               |
| GeoEngine     | Géocodage Nominatim (avec debounce), calcul haversine, gestion du point d'intervention                     | C-002, C-003        |
| MapView       | Rendu Leaflet, markers (dont marker actif distingué), cercle de rayon, étiquettes de distance, TileErrorWatcher | C-002, C-003, C-004, C-005 |
| FilterPanel   | Gestion des filtres danger/type, dérivation de la liste filtrée                                            | C-004               |
| BuildingSheet | Affichage de la fiche synthétique modale, fermeture ✕/Échap/overlay                                       | C-005               |

---

## 13\. Matrice de couverture fonctionnelle

| Capacité | Règles (RA)                                                        | Exigences (EF)           | Critères (CA)                                    |
|--------|------------------------------------------------------------------|------------------------|------------------------------------------------|
| C-001    | RA-001, RA-002                                                     | EF-001, EF-002           | CA-001, CA-002                                   |
| C-002    | RA-003, RA-004, RA-005, RA-006, RA-016, RA-017                     | EF-003, EF-004, EF-010   | CA-004, CA-005, CA-006, CA-007, CA-019, CA-020, CA-021 |
| C-003    | RA-007, RA-008, RA-009, RT-001, RT-002, RT-003, RT-004             | EF-005, EF-006           | CA-008, CA-009, CA-010, CA-011, CA-022           |
| C-004    | RA-010, RA-011, RA-012                                             | EF-007                   | CA-012, CA-013, CA-014                           |
| C-005    | RA-013, RA-014, RA-015, RA-018, RA-019, RA-020, RT-002, RT-006     | EF-008, EF-009           | CA-015, CA-016, CA-017, CA-018, CA-023, CA-024, CA-025, CA-026 |

---

## 14\. Définition de prêt pour développement

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

---

## 15\. Définition de terminé

Une capacité est terminée lorsque :

- [ ] Tout le comportement attendu est implémenté

- [ ] Tous les critères d'acceptation sont couverts

- [ ] Tous les cas limites identifiés sont gérés

- [ ] Les règles transversales applicables sont respectées

- [ ] Les tests ont été produits et exécutés

- [ ] Une revue de conformité a été effectuée

- [ ] Aucun écart fonctionnel non résolu ne subsiste

---

## 16\. Paramètres système

Les paramètres ci-dessous sont des valeurs configurables du système. Ils ne doivent jamais être hardcodés dans le code — toujours les référencer par leur code de paramètre.

| Code paramètre | Nom fonctionnel           | Valeur par défaut | Description                                                         | Capacités concernées |
|--------------|-----------------------|-----------------|-------------------------------------------------------------------|--------------------| 
| PARAM_001      | Rayon de recherche        | 500               | Rayon fixe en mètres autour du point d'intervention                 | C-002, C-003         |
| PARAM_002      | Couleur danger élevé      | #CC0000           | Couleur hex des markers niveau 1 (rouge)                            | C-001, C-003, C-005  |
| PARAM_003      | Couleur danger modéré     | #FF6600           | Couleur hex des markers niveau 2 (orange)                           | C-001, C-003, C-005  |
| PARAM_004      | Couleur danger faible     | #FFCC00           | Couleur hex des markers niveau 3 (jaune)                            | C-001, C-003, C-005  |
| PARAM_005      | Délai timeout géocodage   | 3                 | Secondes avant déclenchement du fallback Nominatim                  | C-002                |
| PARAM_006      | Délai debounce frappe     | 300               | Millisecondes d'inactivité avant déclenchement de l'autocomplétion  | C-002                |

---

## 17\. Messages utilisateur

Les messages ci-dessous sont les textes exacts à afficher à l'utilisateur. Ils ne doivent jamais être rédigés librement dans le code — toujours utiliser les textes définis ici.

| No      | Condition de déclenchement                          | Type          | Message FR                                                                                          | Capacité     |
|-------|---------------------------------------------------|-------------|---------------------------------------------------------------------------------------------------|------------|
| MSG-001 | Bref instant au démarrage (rendu initial)           | Information   | "Chargement des données en cours..."                                                                | C-001        |
| MSG-002 | Chargement bundle terminé                           | Succès        | "X bâtiments chargés"                                                                               | C-001        |
| MSG-004 | Nominatim indisponible ou timeout                   | Avertissement | "Localisation indisponible. Cliquez directement sur la carte pour définir le point d'intervention." | C-002        |
| MSG-005 | Adresse introuvable (0 résultat Nominatim)          | Erreur        | "Adresse non trouvée. Vérifiez l'adresse ou cliquez directement sur la carte."                      | C-002        |
| MSG-006 | Tuiles carte indisponibles (événement tileerror)    | Avertissement | "Fond de carte indisponible — les données restent consultables."                                    | C-003        |
| MSG-007 | Aucun bâtiment dans le rayon (ou filtres excluent tout) | Information | "Aucun bâtiment à risque dans ce périmètre."                                                        | C-003, C-004 |

---

## 18\. Directives pour l'IA de développement

> ✅ Cette section s'adresse directement à l'IA de développement et doit être lue et respectée lors de toute implémentation basée sur ce dossier fonctionnel.

### 18.1 Points d'attention pour l'IA

- **L'ordre d'implémentation recommandé est C-001 → C-002 → C-003 → C-004 → C-005** — chaque capacité dépend de la précédente

- **Les données POC sont intégrées à l'application** — ne pas implémenter le file watcher ni le scan antivirus (hors périmètre)

- **Le rayon est fixe** (PARAM_001 = 500m) — ne pas implémenter de slider ou contrôle d'ajustement

- **Le géocodage est en deux phases** : d'abord vérifier les coordonnées GPS dans le JSON (bypass Nominatim), ensuite appeler Nominatim si nécessaire

- **Le fallback Nominatim est critique** — le clic sur carte doit toujours fonctionner indépendamment de l'état réseau

- **Leaflet doit être configuré avec une source de tuiles secondaire** dès le départ

- **L'autocomplétion utilise le même appel Nominatim que la recherche explicite** — partager la fonction `geocoderAdresseSuggestions()` entre les deux déclencheurs

- **Le marker actif ne doit pas masquer les voisins** — seuls `color`, `weight` et `radius` changent, jamais `fillColor` ni `fillOpacity`

- **Le bouton ✕ Effacer remet TOUT à zéro** — point, markers, fiche, suggestions, erreurs, debounce en cours

### 18.2 Anti-patterns à éviter

- ❌ Implémenter plusieurs capacités simultanément sans validation intermédiaire

- ❌ Modifier des règles transversales sans revue d'impact sur toutes les capacités

- ❌ Générer des tests sans les exécuter

- ❌ Accepter du code qui ne couvre pas tous les critères d'acceptation

- ❌ Ignorer les paramètres système — ne jamais hardcoder les valeurs paramétrées

- ❌ Inventer des libellés d'interface — utiliser exactement les textes de la section 17

- ❌ Hardcoder les couleurs des markers — toujours utiliser PARAM_002, PARAM_003, PARAM_004

- ❌ Implémenter le file watcher ou le scan antivirus — ces fonctionnalités sont explicitement hors périmètre POC

- ❌ Changer le `fillColor` du marker actif — cela briserait l'identification visuelle du niveau de danger (RT-006)

- ❌ Déclencher l'autocomplétion sur moins de 4 caractères — génère des requêtes inutiles et des résultats non pertinents

- ✅ Toujours résumer le plan d'implémentation avant de coder

- ✅ Faire valider les interfaces entre capacités avant implémentation

- ✅ Respecter l'ordre des algorithmes de traitement numérotés

- ✅ Vérifier les coordonnées GPS dans le JSON avant d'appeler Nominatim

---

## 19\. Stack technique officielle

Cette section documente les choix technologiques validés lors de l'implémentation POC. Tout développeur ou IA reprenant ce projet doit respecter ces choix sauf décision explicite contraire.

| Composant          | Technologie          | Version   | Justification                                          |
|------------------|--------------------|---------|----------------------------------------------------|
| Framework UI       | React                | 18.x      | Composants fonctionnels + hooks — standard industrie   |
| Bundler            | Vite                 | 5.x       | HMR ultra-rapide, build optimisé                       |
| Langage            | JavaScript ES6+      | —         | POC — TypeScript non requis                            |
| Cartographie       | react-leaflet        | 4.x       | Wrapper React pour Leaflet                             |
| Cartographie       | leaflet              | 1.9.x     | Bibliothèque cartographique — tiles OSM                |
| Gestion d'état     | useState + useMemo   | —         | POC — Zustand/Redux sur-dimensionné                    |
| Style              | CSS Modules          | —         | Scoping local, pas de conflit entre composants         |
| Tests unitaires    | Vitest               | 2.x       | Compatible Vite, API identique Jest                    |
| Environnement test | jsdom                | 26.x      | Simulation DOM pour Vitest                             |
| Géocodage          | Nominatim (OSM)      | —         | Gratuit, sans clé API, résultats en français           |
| Fond de carte      | OpenStreetMap        | —         | Gratuit, open-source, fallback OSM France              |
| Gestionnaire pkgs  | npm                  | 11.x      | Standard — pas de yarn/pnpm pour la POC                |
| Runtime            | Node.js              | 24.x      | Version LTS validée                                    |

### Règles de la stack

- Ne pas ajouter de dépendances supplémentaires sans validation — la stack est intentionnellement minimaliste pour un POC

- Ne pas migrer vers TypeScript sans décision explicite

- Ne pas ajouter de gestionnaire d'état global (Zustand, Redux) sans décision explicite

---

## 20\. Accessibilité (ARIA)

Cette section formalise les exigences d'accessibilité issues de ENF-003. Tous les composants doivent respecter ces attributs.

| Composant      | Attributs ARIA obligatoires                                                                              |
|--------------|--------------------------------------------------------------------------------------------------------|
| Modale fiche   | `role="dialog"`, `aria-modal="true"`, `aria-label="Fiche synthétique — [nom du bâtiment]"`               |
| Bouton fermer  | `aria-label="Fermer la fiche"`                                                                           |
| Bouton Effacer | `aria-label="Effacer la recherche"`                                                                      |
| Bouton Localiser | `aria-label="Localiser"`                                                                               |
| Champ adresse  | `aria-label="Adresse d'intervention"`                                                                    |
| Toggles filtres | `role="group"`, `aria-label="Filtrer par niveau de danger"`, `aria-pressed={true\|false}` sur chaque bouton |
| Select type    | `aria-label="Filtrer par type d'établissement"`                                                          |
| Liste suggestions | `role="listbox"`, `aria-label="Résultats de géocodage"`, `role="option"` sur chaque item              |
| Bannière erreur | `role="alert"` (MSG-004, MSG-005, MSG-006)                                                              |
| Message statut  | `role="status"` (MSG-007)                                                                               |

### Règle d'accessibilité clavier

- La touche **Échap** ferme la fiche synthétique lorsqu'elle est ouverte (CA-023)

- Tous les éléments interactifs sont accessibles au clavier (Tab, Entrée, Espace)
