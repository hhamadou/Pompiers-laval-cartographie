# Pompiers Laval — Cartographie des sites à risques

Application web SPA (React + Leaflet) à destination des dispatchers et chefs de caserne du Service de Sécurité Incendie (SSI) de la Ville de Laval.

Permet d'identifier rapidement les bâtiments contenant des matières dangereuses dans un rayon de 500 mètres autour d'un point d'intervention.

---

## Prérequis

- [Node.js](https://nodejs.org/) v20+
- npm v10+

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
# → http://localhost:5173
```

## Build production

```bash
npm run build
# → dossier /dist à déposer sur le serveur intranet Windows
```

## Tests

```bash
npm run test
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
