# Pompiers Laval — Cartographie des sites à risques

Application web SPA (React + Leaflet) à destination des dispatchers et chefs de caserne du Service de Sécurité Incendie (SSI) de la Ville de Laval.

Permet d'identifier rapidement les bâtiments contenant des matières dangereuses dans un rayon de 500 mètres autour d'un point d'intervention.

---

## Prérequis

- [Node.js](https://nodejs.org/) v18+ (testé avec v24.18.0)
- npm v10+ (testé avec v11.16.0)
- Git (optionnel)

## Lancer le projet

Ouvrir un terminal **PowerShell** dans le dossier du projet :

```powershell
cd C:\Users\XXHamadou\.bob\playground\pompiers-laval-cartographie
npm install        # une seule fois après clonage ou installation de Node
npm run dev        # démarre le serveur de développement
```

Ouvrir ensuite **http://localhost:5173** dans le navigateur.

> 💡 Si `npm` n'est pas reconnu, fermer et rouvrir le terminal après l'installation de Node.js.

## Tests unitaires

```powershell
npm run test
# → 10 tests doivent passer (geoEngine : haversine + filtrage)
```

## Build production (déploiement intranet)

```powershell
npm run build
# → dossier /dist généré, à déposer sur le serveur Windows intranet
```

---

## Stack technique

- React 18 + Vite 5
- react-leaflet 4 + Leaflet 1.9
- OpenStreetMap + Nominatim (géocodage)
- Données intégrées au bundle (import JSON statique)

## Branches

- `main` — production
- `develop` — intégration
- `feature/C-001`, `feature/C-002`, ... — développement par capacité

## Conventions de commits

```
feat: description     # nouvelle fonctionnalité
fix: description      # correction de bug
chore: description    # config, dépendances, docs
```

---

## Historique des modifications

### SearchBar — Recherche manuelle uniquement (`fix`)
- Suppression du `useEffect` de debounce qui déclenchait `onLocaliser` à chaque frappe.
- La recherche Nominatim n'est plus déclenchée pendant la frappe.
- Elle s'exécute uniquement via le bouton **📍 Localiser** ou la touche **Entrée**.
- La liste de suggestions CA-005 (max 3 résultats) reste fonctionnelle après le submit.
- Imports `useEffect` et `useRef` retirés de `SearchBar.jsx` (devenus inutiles).
