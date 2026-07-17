import batimentsData from '../data/batiments.json'

/**
 * Module DataLoader — C-001
 * Charge les données JSON intégrées au bundle (import statique).
 * Référence : section 12 du dossier fonctionnel.
 *
 * Le chargement est synchrone — pas de useEffect asynchrone requis.
 * Les données sont toujours disponibles dès le démarrage du bundle.
 */

/**
 * Retourne la liste complète des bâtiments depuis le bundle.
 * @returns {Array} Liste des bâtiments à risque
 */
export function chargerBatiments() {
  return batimentsData
}
