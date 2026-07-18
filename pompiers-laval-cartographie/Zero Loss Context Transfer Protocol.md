# Zero Loss Context Transfer Protocol
## Projet : Pompiers Laval — Cartographie des sites à risques

> Ce fichier est la source de vérité du projet. Il documente tout : décisions prises, rejets, état courant, conventions, historique des modifications. À mettre à jour après chaque session de travail.

---

## 1. Identité du projet

| Champ | Valeur |
|---|---|
| Nom | `pompiers-laval-cartographie` |
| Chemin local | `C:\Users\XXHamadou\.bob\playground\pompiers-laval-cartographie` |
| Type | SPA web (intranet) |
| Version | 0.1.0 |
| Cible | Dispatchers et chefs de caserne — SSI Ville de Laval |
| Objectif | Identifier les bâtiments à matières dangereuses dans un rayon de 500 m autour d'un point d'intervention |

---

## 2. Stack technique

| Couche | Technologie | Version |
|---|---|---|
| UI | React | 18.3.1 |
| Build | Vite | 5.4.19 |
| Carte | react-leaflet + Leaflet | 4.2.1 + 1.9.4 |
| Fond de carte | OpenStreetMap (tuiles OSM) | — |
| Géocodage | Nominatim (OSM) — sans clé API | — |
| Tests | Vitest + jsdom | 2.1.9 |
| Données | Import JSON statique bundlé | — |
| Styles | CSS Modules | — |
| Runtime | Node.js v24.18.0 / npm v11.16.0 | — |

---

## 3. Structure du projet

```
pompiers-laval-cartographie/
├── index.html
├── vite.config.js              # plugins react + config vitest (jsdom, globals)
├── package.json
├── src/
│   ├── main.jsx                # ReactDOM.createRoot — React.StrictMode
│   ├── App.jsx                 # Orchestrateur — tout l'état global
│   ├── App.module.css          # Reset global + layout flex colonne 100vh
│   ├── config/
│   │   └── params.js           # PARAMS, MESSAGES, NIVEAUX_DANGER
│   ├── data/
│   │   └── batiments.json      # 50+ bâtiments — données fictives représentatives
│   ├── modules/
│   │   ├── dataLoader.js       # chargerBatiments() — import statique JSON
│   │   └── geoEngine.js        # haversine, filtrerParRayon, Nominatim
│   └── components/
│       ├── StatusBar/          # Barre titre + badge état
│       ├── SearchBar/          # Saisie adresse + liste suggestions
│       ├── FilterPanel/        # Filtres niveau danger + type établissement
│       ├── MapView/            # Carte Leaflet complète
│       └── BuildingSheet/      # Fiche modale bâtiment sélectionné
└── tests/
    └── geoEngine.test.js       # 10 tests — haversine + filtrerParRayon
```

---

## 4. Modèle de données — `batiments.json`

Chaque bâtiment possède les champs suivants :

| Champ | Type | Obligatoire | Notes |
|---|---|---|---|
| `id` | string | ✓ | Format `BAT-NNN` |
| `nom` | string | ✓ | Nom de l'établissement |
| `adresse` | string | ✓ | Adresse complète |
| `type_etablissement` | string | ✓ | Ex : "Industrie chimique", "Entrepôt général" |
| `matieres_dangereuses` | string[] | ✓ | Liste des matières |
| `quantites` | string[] \| null | ✓ | Peut contenir des `null` internes ou être `null` |
| `niveau_danger` | integer (1\|2\|3) | ✓ | 1=Élevé, 2=Modéré, 3=Faible |
| `consignes` | string \| null | ✗ | Absente sur certains bâtiments |
| `latitude` | number \| null | ✗ | Null → exclu silencieusement du filtrage (RA-009) |
| `longitude` | number \| null | ✗ | Idem |

**Cas particuliers connus dans les données :**
- `BAT-010` : pas de `latitude`/`longitude` du tout (champs absents)
- `BAT-011` : `latitude: null, longitude: null` explicite
- `BAT-016` : `quantites` avec `null` internes `["60 L", null, "40 L", null]`
- `BAT-006` : `quantites: null` et `consignes: null`

---

## 5. Paramètres système — `params.js`

### PARAMS
| Clé | Valeur | Référence |
|---|---|---|
| `RAYON_RECHERCHE` | 500 (mètres) | PARAM_001 |
| `COULEUR_DANGER_ELEVE` | `#CC0000` | PARAM_002 |
| `COULEUR_DANGER_MODERE` | `#FF6600` | PARAM_003 |
| `COULEUR_DANGER_FAIBLE` | `#FFCC00` | PARAM_004 |
| `DELAI_TIMEOUT_GEOCODAGE` | 3 (secondes) | PARAM_005 |

### MESSAGES
| Clé | Contenu | Référence |
|---|---|---|
| `CHARGEMENT_EN_COURS` | `'Chargement des données en cours...'` | MSG-001 |
| `BATIMENTS_CHARGES` | `(n) => \`${n} bâtiments chargés\`` | MSG-002 |
| `LOCALISATION_INDISPONIBLE` | Message Nominatim indisponible | MSG-004 |
| `ADRESSE_NON_TROUVEE` | Message adresse introuvable | MSG-005 |
| `FOND_CARTE_INDISPONIBLE` | Message tuiles indisponibles | MSG-006 |
| `AUCUN_BATIMENT` | `'Aucun bâtiment à risque dans ce périmètre.'` | MSG-007 |

### NIVEAUX_DANGER
```js
{ 1: { libelle: 'Élevé',  couleur: '#CC0000' },
  2: { libelle: 'Modéré', couleur: '#FF6600' },
  3: { libelle: 'Faible', couleur: '#FFCC00' } }
```

---

## 6. Modules

### `dataLoader.js`
- Export : `chargerBatiments()` → retourne `batimentsData` (import statique)
- Chargement **synchrone** — pas de `useEffect` asynchrone requis
- Données toujours disponibles dès le démarrage du bundle

### `geoEngine.js`
- `geocoderAdresseSuggestions(adresse)` → `Promise<Array<{lat, lon, libelle}>>` — max 3 résultats, timeout `PARAM_005`
- `geocoderAdresse(adresse)` → `Promise<{lat, lon} | null>` — 1 seul résultat (utilisé en interne)
- `calculerDistance(lat1, lon1, lat2, lon2)` → mètres (formule haversine, R=6 371 000 m)
- `filtrerParRayon(batiments, lat, lon)` → bâtiments dans `RAYON_RECHERCHE`, enrichis de `distance` (arrondi entier), triés par distance croissante
- Politique Nominatim : `User-Agent: PompiersLavalCartographie/0.1`, `Accept-Language: fr`, `countrycodes: ca`

---

## 7. Composants

### `App.jsx`
Orchestrateur principal. Contient tout l'état global :
- `pointIntervention` `{lat, lon}` ou `null`
- `geocodageEnCours` boolean
- `messageErreur` string
- `batimentSelectionne` objet ou `null`
- `suggestions` tableau CA-005
- `filtresNiveau` `{ 1: bool, 2: bool, 3: bool }` — tous `true` par défaut (RA-010)
- `filtreType` string — `''` = tous (RA-011)
- `TOUS_BATIMENTS` constante module-level (chargement synchrone C-001)
- `TYPES_DISPONIBLES` constante module-level — types uniques triés (RA-011)
- `batimentsDansRayon` — `useMemo` sur `pointIntervention`
- `batimentsFiltres` — `useMemo` sur `batimentsDansRayon + filtres`

### `StatusBar`
- Props : `statut ('chargement'|'pret')`, `nombreBatiments`
- Affiche le titre `🚒 SSI Laval — Sites à risques` + badge état
- Fond `#1a1a2e`, bordure bas `#cc0000`

### `SearchBar`
- Props : `onLocaliser`, `onSelectionner`, `onReinitialiser`, `suggestions`, `chargement`, `messageErreur`
- **La recherche se déclenche uniquement via bouton 📍 Localiser ou touche Entrée** — pas d'autocomplétion automatique à la frappe
- Bouton ✕ (effacer) visible dès qu'il y a du texte
- Liste suggestions CA-005 affichée si `suggestions.length > 1`
- Bouton Localiser désactivé si champ vide ou chargement en cours

### `FilterPanel`
- Props : `filtresNiveau`, `filtreType`, `typesDisponibles`, `onToggleNiveau`, `onChangerType`
- 3 boutons toggle niveau (Élevé/Modéré/Faible) — couleur active = couleur du niveau
- `<select>` type établissement — option "Tous les types" = `''`
- Les filtres n'affectent que l'affichage, données en mémoire intactes (RA-012)

### `MapView`
- Props : `pointIntervention`, `batimentsFiltres`, `batimentActifId`, `onClicCarte`, `onClicMarker`
- Centre initial : `[45.5646, -73.7439]` (Laval), zoom 13
- `RecenterMap` : repositionne la carte au zoom 15 sur `pointIntervention`
- `ClickHandler` : clic carte → `onClicCarte({lat, lon})` — ignore les clics sur `path`/`circle` (markers)
- `TileErrorWatcher` : écoute `tileerror` Leaflet → `MSG-006`
- Couche principale OSM + couche fallback OSM France (opacity 0)
- Cercle `RAYON_RECHERCHE` autour du point d'intervention
- Marker point d'intervention : `CircleMarker` blanc, tooltip `📍 Point d'intervention`
- Markers bâtiments : `CircleMarker` coloré par niveau, rayon 10 (14 si actif), étiquette distance permanente
- Marker actif (fiche ouverte) : rayon 14, bordure blanche épaisse, étiquette dark `#1a1a2e`
- `MSG-007` affiché si `pointIntervention && batimentsFiltres.length === 0`

### `BuildingSheet`
- Props : `batiment`, `onFermer`
- Modale en `position: fixed` — coin bas-droit desktop, bas-centre mobile (< 600px)
- Fermeture : bouton ✕, clic overlay, touche Échap
- Bordure gauche colorée selon `niveau_danger`
- 5 champs affichés : Type établissement, Niveau danger + distance, Matières dangereuses (liste `<ul>`), Quantités connues, Consignes particulières
- Règle RA-014 : champ vide/null/[] → `'Non renseigné'`
- Règle RA-015 : badge coloré niveau danger

---

## 8. Tests — `tests/geoEngine.test.js`

**10 tests — tous passent ✓**

| Suite | Test |
|---|---|
| `calculerDistance` | retourne 0 pour deux points identiques |
| `calculerDistance` | calcule une distance réaliste entre deux points de Laval (~150m) |
| `calculerDistance` | retourne une valeur positive même si coordonnées inversées |
| `filtrerParRayon` | exclut les bâtiments hors rayon de 500m |
| `filtrerParRayon` | inclut les bâtiments dans le rayon |
| `filtrerParRayon` | exclut silencieusement les bâtiments sans coordonnées GPS (RA-009) |
| `filtrerParRayon` | enrichit chaque bâtiment retenu avec `distance` en mètres |
| `filtrerParRayon` | retourne liste vide si aucun bâtiment dans le rayon |
| `filtrerParRayon` | trie les résultats par distance croissante |
| `filtrerParRayon` | respecte le rayon PARAM_001 de 500m |

---

## 9. Décisions d'architecture (ADR)

| Réf | Décision | Raison |
|---|---|---|
| DEC-003 | Niveau danger dérivé de la valeur numérique 1/2/3 | Simplicité, mapping direct dans `NIVEAUX_DANGER` |
| DEC-006 | Nominatim (OpenStreetMap) pour le géocodage | Gratuit, sans clé API, usage intranet |
| DEC-007 | Fallback clic carte si Nominatim indisponible | Résilience — l'opérateur peut toujours placer le point manuellement |
| DEC-008 | `TileErrorWatcher` Leaflet pour détecter tuiles indisponibles | Pas de polling, événement natif Leaflet |
| DEC-009 | Coordonnées GPS des bâtiments directement dans le JSON | Bypass Nominatim pour les bâtiments — performances et fiabilité |
| DEC-010 | Import JSON statique bundlé | Déploiement intranet sans API backend, zéro dépendance réseau pour les données |

---

## 10. Règles métier (RA / RT)

| Réf | Règle |
|---|---|
| RA-007 | Étiquette de distance permanente sur chaque marker |
| RA-008 | Marker actif (fiche ouverte) visuellement distinct |
| RA-009 | Bâtiments sans coordonnées GPS exclus silencieusement du filtrage |
| RA-010 | Filtres niveau danger tous actifs par défaut |
| RA-011 | Types d'établissement générés dynamiquement depuis le JSON au démarrage |
| RA-012 | Les filtres n'affectent que l'affichage — données en mémoire intactes |
| RA-013 | Une seule fiche BuildingSheet ouverte à la fois |
| RA-014 | Champ vide/null/[] dans la fiche → afficher `'Non renseigné'` |
| RA-015 | Badge niveau danger coloré avec couleur PARAM_002/003/004 |
| RT-001 | Marker coloré selon `niveau_danger` — couleurs issues de `NIVEAUX_DANGER` |
| RT-004 | Filtrage dans le rayon `PARAM_001` (500m) via haversine |

---

## 11. Ce qui a été rejeté / écarté

| Élément | Raison du rejet |
|---|---|
| Autocomplétion live (debounce à la frappe) | Déclenchait des recherches sur des adresses incomplètes (ex : "Hôpital" au lieu de "Hôpital de la Cité-de-la-Santé") — retiré au profit d'une recherche manuelle uniquement |
| API géocodage avec clé (Google Maps, Mapbox) | Coût, complexité gestion clé API, inutile pour intranet |
| Backend / API REST pour les données | Hors scope — données statiques suffisantes, déploiement intranet simple |
| Base de données | Même raison — JSON bundlé suffit pour le volume actuel |
| Leaflet `Marker` avec icône PNG | Problèmes d'import d'assets avec Vite — remplacé par `CircleMarker` SVG natif |
| `useEffect` asynchrone pour charger les données | Chargement synchrone possible via import statique — plus simple |

---

## 12. Conventions du projet

### Commits
```
feat: description     # nouvelle fonctionnalité
fix: description      # correction de bug
chore: description    # config, dépendances, docs
```

### Branches
- `main` — production
- `develop` — intégration
- `feature/C-001`, `feature/C-002`, ... — développement par capacité

### Code
- Pas de valeurs hardcodées — tout passe par `PARAMS` ou `MESSAGES`
- CSS Modules pour tous les composants
- Messages utilisateur définis uniquement dans `params.js`
- Langue : français partout (code, commentaires, UI)

---

## 13. Historique des modifications

### [Session 1] — Mise en place initiale
- Scaffolding Vite + React + react-leaflet
- Création `batiments.json` (50+ bâtiments fictifs représentatifs)
- `params.js` : PARAMS, MESSAGES, NIVEAUX_DANGER
- `dataLoader.js` + `geoEngine.js` (haversine, filtrerParRayon, Nominatim)
- Composants : StatusBar, SearchBar, FilterPanel, MapView, BuildingSheet
- 10 tests unitaires geoEngine — tous passants
- `App.jsx` : état global, flux complet C-001 à C-005

### [Session 2] — Améliorations (3 non documentées individuellement)
- Améliorations apportées au projet (détail non conservé dans le contexte initial)

### [Session 3] — Fix SearchBar : recherche manuelle uniquement (`fix`)
- **Problème** : le `useEffect` avec debounce 300ms déclenchait `onLocaliser` pendant la frappe, provoquant des recherches Nominatim sur des adresses incomplètes
- **Solution** : suppression du `useEffect`, de `useRef`, de la constante `DEBOUNCE_MS` et de tous les `clearTimeout` dans `SearchBar.jsx`
- La recherche ne se déclenche désormais que via le bouton **📍 Localiser** ou la touche **Entrée**
- La liste de suggestions CA-005 (max 3 résultats) reste fonctionnelle après le submit
- 10 tests — toujours tous passants ✓
