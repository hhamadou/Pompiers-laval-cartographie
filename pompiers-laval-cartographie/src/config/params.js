// ============================================================
// Paramètres système — NE JAMAIS HARDCODER CES VALEURS
// Référence : section 16 du dossier fonctionnel
// ============================================================

export const PARAMS = {
  /** PARAM_001 — Rayon fixe en mètres autour du point d'intervention */
  RAYON_RECHERCHE: 500,

  /** PARAM_002 — Couleur hex des markers niveau 1 (danger élevé) */
  COULEUR_DANGER_ELEVE: '#CC0000',

  /** PARAM_003 — Couleur hex des markers niveau 2 (danger modéré) */
  COULEUR_DANGER_MODERE: '#FF6600',

  /** PARAM_004 — Couleur hex des markers niveau 3 (danger faible) */
  COULEUR_DANGER_FAIBLE: '#FFCC00',

  /** PARAM_005 — Secondes avant déclenchement du fallback Nominatim */
  DELAI_TIMEOUT_GEOCODAGE: 3,
}

// ============================================================
// Messages utilisateur — NE JAMAIS RÉDIGER LIBREMENT DANS LE CODE
// Référence : section 17 du dossier fonctionnel
// ============================================================

export const MESSAGES = {
  /** MSG-001 — Bref instant au démarrage */
  CHARGEMENT_EN_COURS: 'Chargement des données en cours...',

  /** MSG-002 — Chargement bundle terminé. Remplacer {n} par le nombre réel */
  BATIMENTS_CHARGES: (n) => `${n} bâtiments chargés`,

  /** MSG-004 — Nominatim indisponible ou timeout */
  LOCALISATION_INDISPONIBLE:
    "Localisation indisponible. Cliquez directement sur la carte pour définir le point d'intervention.",

  /** MSG-005 — Adresse introuvable */
  ADRESSE_NON_TROUVEE:
    "Adresse non trouvée. Vérifiez l'adresse ou cliquez directement sur la carte.",

  /** MSG-006 — Tuiles carte indisponibles */
  FOND_CARTE_INDISPONIBLE:
    'Fond de carte indisponible — les données restent consultables.',

  /** MSG-007 — Aucun bâtiment dans le rayon */
  AUCUN_BATIMENT: 'Aucun bâtiment à risque dans ce périmètre.',
}

// ============================================================
// Niveaux de danger — dérivés de la valeur numérique dans les données
// Référence : DEC-003, RT-001
// ============================================================

export const NIVEAUX_DANGER = {
  1: { libelle: 'Élevé', couleur: PARAMS.COULEUR_DANGER_ELEVE },
  2: { libelle: 'Modéré', couleur: PARAMS.COULEUR_DANGER_MODERE },
  3: { libelle: 'Faible', couleur: PARAMS.COULEUR_DANGER_FAIBLE },
}
