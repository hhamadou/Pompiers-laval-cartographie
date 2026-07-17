# ZLCTP Handoff Package — Pompiers Laval Cartographie — Mis à jour le 2025-07-16

---

## 1. Project One-Liner

Développer une SPA React (application web monopage) pour le Service de Sécurité Incendie (SSI) de la Ville de Laval, permettant aux dispatchers et chefs de caserne d'identifier en quelques secondes les bâtiments contenant des matières dangereuses dans un rayon de 500 mètres autour d'un point d'intervention, via une carte interactive Leaflet/OpenStreetMap.

---

## 2. Current Status Snapshot

- **Date/heure :** 2025-07-16 (dernière mise à jour)
- **Dernière action complétée :** Rapport d'écarts DF produit (`rapport-d-carts-hors-dossier-fonctionnel.html`). Tâche en cours : rédaction du Dossier Fonctionnel v2.0 intégrant les écarts identifiés.
- **Environnement validé :** Node.js v24.18.0 / npm v11.16.0 / Windows 10
- **Dépôt GitHub :** `hhamadou/Pompiers-laval-cartographie` — branche active : `develop`
- **Dernier commit poussé :** `e92c62c` — docs: mise à jour ZLCTP
- **État fonctionnel :** ✅ Toutes les capacités C-001→C-005 implémentées et validées. Application fonctionnelle confirmée par l'utilisateur.
- **Prochaine action :** Finaliser et sauvegarder le DF v2.0, puis traiter ENF-004 (responsive tablette) + EF-009 (police min 14px).

---

## 3. Core Understanding & Mental Model

### Qui est l'utilisateur ?
L'utilisateur est **développeur** (pas analyste). Il a reçu un dossier fonctionnel IA-Ready produit par des analystes et est chargé de développer toute la solution.

### Contexte du projet
- **Client :** Ville de Laval, Service de Sécurité Incendie (SSI)
- **Problème actuel :** Les inspecteurs gèrent les données de matières dangereuses dans des fichiers manuels. En urgence, la recherche est lente et peu fiable.
- **Solution :** Application web intranet municipal, sans authentification, consultable en quelques secondes.
- **Nature :** POC (Proof of Concept) — pas de production complète encore.

### Décisions architecturales confirmées
| Code | Décision | Statut |
|---|---|---|
| DEC-001 | Rayon fixe 500m, non ajustable | Confirmé |
| DEC-002 | Pas d'authentification | Confirmé |
| DEC-003 | niveau_danger : 1=Élevé, 2=Modéré, 3=Faible | Confirmé |
| DEC-004 | Données JSON intégrées au bundle React (import statique) | Confirmé |
| DEC-005 | Pas de localStorage pour la POC | Confirmé |
| DEC-006 | Géocodage via Nominatim (OpenStreetMap), gratuit, sans clé API | Confirmé |
| DEC-007 | Si Nominatim indisponible → clic direct sur carte | Confirmé |
| DEC-008 | Fond de carte OpenStreetMap + source secondaire fallback | Confirmé |
| DEC-009 | Coordonnées GPS dans JSON = bypass Nominatim | Confirmé |
| DEC-010 | Déploiement sur serveur Windows local intranet | À confirmer avec équipe TI |

### Stack technique retenue (proposée et acceptée par l'utilisateur)
- **React 18** + **Vite 5** (bundler)
- **JavaScript ES6+** (pas TypeScript — POC)
- **react-leaflet 4** + **leaflet 1.9**
- **useState + useMemo** (pas de Zustand/Redux)
- **CSS Modules**
- **npm** comme gestionnaire de paquets
- **Vitest** pour les tests unitaires

### Règles non-négociables du dossier fonctionnel
- `PARAM_001` à `PARAM_005` ne doivent JAMAIS être hardcodés dans le code — toujours référencer `src/config/params.js`
- Les messages affichés à l'utilisateur doivent TOUJOURS venir de `MESSAGES` dans `src/config/params.js` — jamais écrits librement
- Les couleurs des markers TOUJOURS depuis `NIVEAUX_DANGER[niveau].couleur` — jamais hardcodées
- Ordre d'implémentation : C-001 → C-002 → C-003 → C-004 → C-005

### Portée — Ce qui est HORS périmètre POC (ne pas implémenter)
- File watcher automatique
- Validation antivirus Microsoft Defender
- Authentification et gestion des utilisateurs
- Modification des données par l'utilisateur
- Historique des interventions
- Application mobile native
- Intégration avec les systèmes CAD existants

---

## 4. Full Decision & Learning Log (chronologique)

1. **L'utilisateur demande si Bob a accès à ses fichiers** → Bob confirme l'accès au dossier `playground` uniquement

2. **Bob lit tous les fichiers du workspace** → Découverte du projet Pompiers Laval (dossier fonctionnel v1.0), des données établissements JSON, du skill analyste-fonctionnel, des outils ZLCTP

3. **L'utilisateur abandonne le projet Recettes** → Focus exclusif sur Pompiers Laval

4. **L'utilisateur demande une analyse du dossier fonctionnel** → Bob identifie ce qui est bien couvert et ce qui manque :
   - ✅ Bien couvert : fonctionnel (5 capacités), modèle de données, modules suggérés, UX, exigences non fonctionnelles, paramètres système, messages utilisateur
   - ❌ Absent : setup GitHub, stack technique précise, déploiement complet, environnements dev/prod, tests framework, accessibilité détaillée, sécurité intranet, conventions de code

5. **Bob propose des choix techniques** → L'utilisateur dit "go" sans modifications → Les choix sont validés tels quels

6. **Bob génère l'intégralité du code** :
   - Structure de projet Vite
   - `package.json`, `.gitignore`, `README.md`, `vite.config.js`, `index.html`
   - `src/config/params.js` (PARAM_001–005 + MSG-001–007)
   - `src/data/batiments.json` (copie de `donnees_etablissements.json`)
   - `src/modules/dataLoader.js` (C-001)
   - `src/modules/geoEngine.js` (C-002/003 : haversine + Nominatim)
   - `src/components/StatusBar/` (C-001)
   - `src/components/SearchBar/` (C-002)
   - `src/components/MapView/` (C-002/003)
   - `src/components/FilterPanel/` (C-004)
   - `src/components/BuildingSheet/` (C-005)
   - `src/App.jsx` (orchestration complète C-001→C-005)
   - `src/main.jsx`
   - `tests/geoEngine.test.js` (10 tests unitaires)

7. **Node.js n'est pas dans le PATH** → npm create vite échoue → Bob génère tout manuellement

8. **L'utilisateur installe Node.js** → Doit rouvrir le terminal pour que PATH soit rechargé

9. **L'utilisateur demande ce ZLCTP** avant de redémarrer → Généré

10. **Validation technique complète** → `npm run build` ✅ (88 modules, 0 erreur) + `npm run test` ✅ (10/10) sur Node v24.18.0 / npm v11.16.0

11. **Instructions de lancement documentées** → README.md mis à jour avec le chemin complet PowerShell, la version Node testée, et le tip de réouverture du terminal

12. **Correctif CA-005** → `geoEngine.js` : nouvelle fonction `geocoderAdresseSuggestions()` (limit:3, retourne `[{lat,lon,libelle}]`). `App.jsx` : affiche la liste si >1 résultat, positionne directement si 1. `SearchBar.jsx` : liste `<ul>` cliquable sous le champ. CSS ajouté.

13. **Correctif MSG-006** → `MapView.jsx` : composant interne `TileErrorWatcher` écoute `map.on('tileerror')` et affiche `MESSAGES.FOND_CARTE_INDISPONIBLE` en bannière orange en haut de la carte. CSS ajouté.

14. **Correctif User-Agent Nominatim** → `geoEngine.js` : constante `NOMINATIM_HEADERS` partagée (`User-Agent: PompiersLavalCartographie/0.1 (intranet-ssi-laval)` + `Accept-Language: fr`) — conforme à la politique d'usage Nominatim.

15. **Recalibrage coordonnées GPS** → Diagnostic : les coordonnées fictives du JSON ne correspondaient pas à des adresses connues de Nominatim → aucun bâtiment dans le rayon après géocodage. Toutes les coordonnées recalées de +0.0029 lat / -0.0062 lon. Nouvelle zone centrale : `45.5675, -73.7501` (Chomedey, Laval). Adresse de test validée : `3030 boul Le Carrefour, Laval` (1 seul résultat Nominatim, ~350m du centre). Tests unitaires mis à jour.

16. **L'utilisateur confirme que tout fonctionne** → Validation visuelle complète OK. Application conforme au DF.

17. **3 améliorations hors DF demandées et implémentées** (commit `7a50a7e`) :
    - **Autocomplétion frappe** : `SearchBar.jsx` — `useEffect` + `useRef` debounce 300ms, déclenche `onLocaliser` à partir de 4 caractères. Le submit manuel annule le debounce en cours.
    - **Bouton ✕ Effacer** : bouton positionné à l'intérieur du champ (position absolute), visible dès qu'il y a du texte. Appelle `handleReinitialiser()` dans `App.jsx` → remet tout l'état à zéro (point, markers, fiche, suggestions, erreurs).
    - **Marker actif distingué** : prop `batimentActifId` passée de `App.jsx` vers `MapView.jsx`. Quand `estActif` : radius 14 (vs 10), contour blanc `#ffffff` (vs couleur danger), weight 4 (vs 2), étiquette fond sombre. `fillColor` inchangé → couleur de danger toujours lisible. Pas de nuisance aux markers voisins.

18. **Rapport technique HTML généré et poussé** → `rapport-technique-pompiers-laval-cartographie.html` (commit `d018bd0`)

19. **Rapport d'écarts DF généré** → `rapport-d-carts-hors-dossier-fonctionnel.html`. Identifie :
    - 3 fonctionnalités ajoutées (autocomplétion, bouton Effacer, marker actif)
    - 4 comportements enrichis (Échap, overlay, ARIA, TileLayer fallback)
    - 5 décisions infra/technique (stack, CSS Modules, User-Agent, GPS, Git)
    - **2 exigences DF non couvertes** : ENF-004 (responsive tablette) + EF-009 (police min 14px)

20. **Dossier Fonctionnel v2.0 en cours de rédaction** → Intègre les 3 fonctionnalités ajoutées et les enrichissements comme exigences officielles. Sera sauvegardé dans `skills/analyste-fonctionnel/`.

---

## 5. Hard Requirements & Non-Negotiables

- **MUST** : Rayon de recherche = 500m exactement (PARAM_001), non modifiable par l'utilisateur
- **MUST** : Couleurs markers lues depuis params.js — jamais hardcodées
- **MUST** : Messages utilisateur lus depuis MESSAGES — jamais rédigés librement
- **MUST** : Données JSON intégrées au bundle (import statique) — pas de fetch, pas de localStorage
- **MUST** : Le fallback clic-sur-carte fonctionne toujours, même sans réseau
- **MUST** : Respecter l'ordre C-001 → C-002 → C-003 → C-004 → C-005
- **MUST NOT** : Implémenter file watcher — hors périmètre POC
- **MUST NOT** : Implémenter scan antivirus — hors périmètre POC
- **MUST NOT** : Implémenter authentification — hors périmètre POC
- **MUST NOT** : Permettre la modification des données par l'utilisateur
- **MUST NOT** : Modifier les règles transversales sans revue d'impact sur toutes les capacités
- **MUST NOT** : Accepter du code qui ne couvre pas tous les critères d'acceptation
- **MUST** : Champ vide dans les données → afficher "Non renseigné" (RA-014)
- **MUST** : Une seule fiche synthétique ouverte à la fois (RA-013)
- **MUST** : Bâtiment sans coordonnées GPS → exclu silencieusement (RA-009)

---

## 6. Soft Preferences & Observed Style

- L'utilisateur est direct et bref : "go", "pousse le code", "c'est parfait"
- Il fait confiance aux propositions techniques sans négocier les détails
- Il travaille en français
- Il est pragmatique : POC d'abord, pas d'over-engineering
- Apprécie les résumés structurés avec tableaux
- Vérifie régulièrement que le ZLCTP est à jour

---

## 7. All External Materials

### Fichier dossier fonctionnel (source de vérité)
**Chemin :** `skills/analyste-fonctionnel/Dossier fonctionnel - Pompiers Laval v1.0.md`
**Version :** 1.1 — Statut : À valider — Date : 2025-01-23

**Contenu critique utilisé :**
- Section 3 : 10 décisions confirmées (DEC-001 à DEC-010)
- Section 5 : Feuille de route (MVP : C-001/C-002/C-003 | Avancé : C-004/C-005)
- Section 6 : Vue d'interface cible (4 zones)
- Section 7 : Exigences non fonctionnelles (ENF-001 à ENF-005)
- Section 8 : Règles transversales (RT-001 à RT-005)
- Section 9 : 5 capacités fonctionnelles complètes
- Section 10 : Modèle de données (9 champs du bâtiment)
- Section 11 : États du système (CHARGEMENT_EN_COURS → DONNÉES_VALIDES)
- Section 12 : 5 modules applicatifs (DataLoader, GeoEngine, MapView, FilterPanel, BuildingSheet)
- Section 16 : Paramètres système (PARAM_001–005)
- Section 17 : Messages utilisateur (MSG-001, 002, 004–007)
- Section 18 : Directives IA (ordre implémentation, anti-patterns)

### Fichier de données
**Chemin :** `donnees_etablissements.json` (copié dans `src/data/batiments.json`)
**Contenu :** 34 établissements de Laval avec id, nom, adresse, type_etablissement, matieres_dangereuses, quantites, niveau_danger (1/2/3), consignes, latitude, longitude
**Note :** Certains bâtiments ont latitude/longitude null (BAT-010, BAT-011) → exclus silencieusement par geoEngine.js
**Note GPS :** Toutes les coordonnées recalées de +0.0029 lat / -0.0062 lon — zone Chomedey, Laval

---

## 8. Code produit — État exact de chaque fichier

### Structure complète du projet

```
pompiers-laval-cartographie/
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── src/
│   ├── App.jsx                          ← Orchestration C-001→C-005 + handleReinitialiser
│   ├── App.module.css
│   ├── main.jsx
│   ├── config/
│   │   └── params.js                    ← PARAM_001–005, MSG-001–007, NIVEAUX_DANGER
│   ├── data/
│   │   └── batiments.json               ← 34 établissements Laval (coordonnées recalibrées)
│   ├── modules/
│   │   ├── dataLoader.js                ← C-001 : import statique JSON
│   │   └── geoEngine.js                 ← C-002/003 : haversine + Nominatim + suggestions + User-Agent
│   └── components/
│       ├── StatusBar/
│       │   ├── StatusBar.jsx            ← C-001 : badge statut
│       │   └── StatusBar.module.css
│       ├── SearchBar/
│       │   ├── SearchBar.jsx            ← C-002 + CA-005 + autocomplétion debounce + bouton ✕ Effacer
│       │   └── SearchBar.module.css     ← .inputWrapper, .boutonEffacer ajoutés
│       ├── MapView/
│       │   ├── MapView.jsx              ← C-002/003 + MSG-006 + marker actif (batimentActifId)
│       │   └── MapView.module.css       ← .distanceLabelActif ajouté
│       ├── FilterPanel/
│       │   ├── FilterPanel.jsx          ← C-004 : toggles danger + type
│       │   └── FilterPanel.module.css
│       └── BuildingSheet/
│           ├── BuildingSheet.jsx        ← C-005 : modale 7 champs + fermeture Échap + overlay
│           └── BuildingSheet.module.css
└── tests/
    └── geoEngine.test.js                ← 10 tests unitaires haversine + filtrage
```

### État de chaque amélioration

| Fonctionnalité | Fichiers modifiés | Statut |
|---|---|---|
| CA-005 liste déroulante suggestions | `geoEngine.js`, `SearchBar.jsx`, `App.jsx` | ✅ |
| MSG-006 bannière tileerror | `MapView.jsx`, `MapView.module.css` | ✅ |
| User-Agent Nominatim | `geoEngine.js` | ✅ |
| Recalibrage GPS | `batiments.json`, `geoEngine.test.js` | ✅ |
| Autocomplétion frappe (debounce 300ms) | `SearchBar.jsx` | ✅ |
| Bouton ✕ Effacer + reset total | `SearchBar.jsx`, `SearchBar.module.css`, `App.jsx` | ✅ |
| Marker actif visuellement distingué | `MapView.jsx`, `MapView.module.css`, `App.jsx` | ✅ |

### Détail technique — marker actif

Dans `MapView.jsx`, quand `batiment.id === batimentActifId` :
- `radius` : 14 (vs 10 normal)
- `color` (contour SVG) : `#ffffff` blanc (vs couleur danger)
- `fillColor` : couleur danger — **inchangée** (identificabilité préservée)
- `weight` : 4 (vs 2 normal)
- Étiquette distance : classe `.distanceLabelActif` (fond `#1a1a2e`, texte blanc, gras)

### Détail technique — autocomplétion

Dans `SearchBar.jsx` :
- `useEffect` sur `adresse` avec `debounceRef` (useRef)
- Déclenche `onLocaliser(trimmed)` après **300ms** si `trimmed.length >= 4`
- Le submit manuel (`handleSubmit`) annule le debounce en cours via `clearTimeout`
- `handleEffacer` : efface le champ + annule debounce + appelle `onReinitialiser()`

---

## 9. Git — État du dépôt

| Élément | Valeur |
|---|---|
| Dépôt | `hhamadou/Pompiers-laval-cartographie` |
| Branche active | `develop` |
| Dernier commit | `e92c62c` — docs: mise à jour ZLCTP |
| `7a50a7e` | feat: autocomplétion frappe, bouton Effacer, marker actif distingué |
| `d018bd0` | docs: ajout rapport technique complet |
| `2b85c98` | chore: mise à jour scénario de test |
| `c8a34ae` | fix: ClickHandler ignore clics path/circle SVG |
| `a5f6e76` | fix: stopPropagation sur clic marker |
| `8c376f7` | fix: recalibrage coordonnées GPS JSON |
| `51f6dbd` | feat: CA-005, MSG-006, User-Agent, README |
| `91a334c` | Initial commit |
| Remote | `https://github.com/hhamadou/Pompiers-laval-cartographie.git` |

---

## 10. Prochaines étapes recommandées

| Priorité | Étape | Détail |
|---|---|---|
| 🔴 En cours | DF v2.0 | Finaliser et sauvegarder dans `skills/analyste-fonctionnel/Dossier fonctionnel - Pompiers Laval v2.0.md` |
| 🔴 À traiter | ENF-004 — Responsive tablette | Ajouter media queries dans les CSS. Tester sur viewport 768px / 1024px. |
| 🔴 À traiter | EF-009 — Police min 14px fiche | Vérifier `BuildingSheet.module.css` — certains `font-size: 0.85rem` peuvent descendre sous 14px. |
| 🟡 Optionnel | Build production + déploiement intranet | `npm run build` → copier `dist/` sur serveur Windows SSI. |

---

## 11. Pour reprendre ce travail avec un autre LLM

Colle ce fichier en entier et dis : **"Voici un ZLCTP Handoff Package. Lis-le intégralement et poursuis le travail."**

Le prochain LLM aura tout le contexte nécessaire pour continuer sans perte.
