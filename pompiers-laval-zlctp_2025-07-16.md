# ZLCTP Handoff Package — Pompiers Laval Cartographie — Généré le 2025-07-16

---

## 1. Project One-Liner

Développer une SPA React (application web monopage) pour le Service de Sécurité Incendie (SSI) de la Ville de Laval, permettant aux dispatchers et chefs de caserne d'identifier en quelques secondes les bâtiments contenant des matières dangereuses dans un rayon de 500 mètres autour d'un point d'intervention, via une carte interactive Leaflet/OpenStreetMap.

---

## 2. Current Status Snapshot

- **Date/heure :** 2025-07-16 (mis à jour)
- **Dernière action complétée :** Recalibrage des coordonnées GPS de tous les bâtiments du JSON vers la zone Nominatim réelle (centre BAT-001 : `45.5675, -73.7501`). Adresse de test validée : `3030 boul Le Carrefour, Laval`. `npm run build` ✅ + `npm run test` ✅ (10/10).
- **Environnement validé :** Node.js v24.18.0 / npm v11.16.0 / Windows 10
- **Prochaine action immédiate :** Lancer `npm run dev`, saisir `3030 boul Le Carrefour, Laval`, **choisir la suggestion** dans la liste → les markers doivent apparaître.
- **État fonctionnel :** Prêt pour validation visuelle complète.

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
- **useState + useContext** (pas de Zustand/Redux)
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

- L'utilisateur est direct et bref : "go", "on va oublier le projet des recettes"
- Il fait confiance aux propositions techniques sans négocier les détails
- Il travaille en français
- Il est pragmatique : POC d'abord, pas d'over-engineering
- Apprécie les résumés structurés avec tableaux

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

---

## 8. Code produit — État exact de chaque fichier

### Structure complète du projet généré

```
pompiers-laval-cartographie/
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── src/
│   ├── App.jsx                          ← Orchestration C-001→C-005
│   ├── App.module.css
│   ├── main.jsx
│   ├── config/
│   │   └── params.js                    ← PARAM_001–005, MSG-001–007, NIVEAUX_DANGER
│   ├── data/
│   │   └── batiments.json               ← 34 établissements Laval
│   ├── modules/
│   │   ├── dataLoader.js                ← C-001 : import statique JSON
│   │   └── geoEngine.js                 ← C-002/003 : haversine + Nominatim + CA-005 suggestions + User-Agent
│   └── components/
│       ├── StatusBar/
│       │   ├── StatusBar.jsx            ← C-001 : badge statut
│       │   └── StatusBar.module.css
│       ├── SearchBar/
│       │   ├── SearchBar.jsx            ← C-002 + CA-005 : saisie adresse + liste déroulante suggestions
│       │   └── SearchBar.module.css     ← styles suggestions ajoutés
│       ├── MapView/
│       │   ├── MapView.jsx              ← C-002/003 + MSG-006 : carte Leaflet, markers, cercle, TileErrorWatcher
│       │   └── MapView.module.css       ← style .messageFondCarte ajouté
│       ├── FilterPanel/
│       │   ├── FilterPanel.jsx          ← C-004 : toggles danger + type
│       │   └── FilterPanel.module.css
│       └── BuildingSheet/
│           ├── BuildingSheet.jsx        ← C-005 : modale 7 champs
│           └── BuildingSheet.module.css
└── tests/
    └── geoEngine.test.js                ← 10 tests unitaires haversine + filtrage
```

### Lacunes connues — ✅ Toutes corrigées

1. **CA-005 ✅** : `geoEngine.js` expose `geocoderAdresseSuggestions()` (limit:3). `SearchBar.jsx` affiche une liste déroulante si >1 résultat. `App.jsx` câble la sélection via `handleSelectionnerSuggestion`.

2. **MSG-006 ✅** : `MapView.jsx` contient `TileErrorWatcher` qui écoute l'événement `tileerror` de Leaflet et affiche `MESSAGES.FOND_CARTE_INDISPONIBLE` en bannière.

3. **User-Agent Nominatim ✅** : Constante `NOMINATIM_HEADERS` ajoutée dans `geoEngine.js` avec `User-Agent: PompiersLavalCartographie/0.1 (intranet-ssi-laval)`, partagée par les deux fonctions de géocodage.

---

## 9. Prochaines étapes (dans l'ordre)

### ✅ Toutes les étapes techniques sont complétées

| Étape | Statut |
|---|---|
| `npm install` — dépendances | ✅ |
| `npm run build` — 88 modules, 0 erreur | ✅ |
| `npm run test` — 10/10 passent | ✅ |
| README.md — instructions PowerShell | ✅ |
| CA-005 — liste déroulante 3 suggestions | ✅ |
| MSG-006 — bannière tileerror | ✅ |
| User-Agent Nominatim | ✅ |

### Étape immédiate — Validation visuelle

```powershell
cd C:\Users\XXHamadou\.bob\playground\pompiers-laval-cartographie
npm run dev
# → Ouvrir http://localhost:5173 dans le navigateur
```

> Si `npm` n'est pas reconnu, fermer et rouvrir le terminal PowerShell après l'installation de Node.js.

**Checklist de validation :**
- [ ] L'application s'ouvre et affiche "34 bâtiments chargés"
- [ ] Saisir "450 boulevard Industriel, Laval" → carte se centre, cercle 500m s'affiche
- [ ] Des markers colorés apparaissent dans le rayon
- [ ] Si Nominatim retourne >1 résultat → liste déroulante apparaît sous le champ (CA-005)
- [ ] Cliquer sur un marker → fiche synthétique s'ouvre avec les 7 champs
- [ ] Toggles de filtres fonctionnent
- [ ] Clic sur la carte positionne le point d'intervention

### Étape suivante — Build production (déploiement intranet)

```powershell
npm run build
# → dossier /dist à déposer sur le serveur Windows intranet
```

---

## 10. Pour reprendre ce travail avec un autre LLM

Colle ce fichier en entier et dis : **"Voici un ZLCTP Handoff Package. Lis-le intégralement et poursuis le travail."**

Le prochain LLM aura tout le contexte nécessaire pour continuer sans perte.
