import { PARAMS, MESSAGES } from '../config/params.js'

/**
 * Module GeoEngine — C-002, C-003
 * Géocodage Nominatim, calcul haversine, gestion du point d'intervention.
 * Référence : section 12 du dossier fonctionnel.
 */

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'

/**
 * Convertit une adresse textuelle en coordonnées GPS via Nominatim.
 * Règle DEC-006 : Nominatim (OpenStreetMap) — gratuit, sans clé API.
 * Règle DEC-007 : Si Nominatim est indisponible, l'utilisateur peut cliquer sur la carte.
 *
 * @param {string} adresse
 * @returns {Promise<{lat: number, lon: number} | null>}
 */
export async function geocoderAdresse(adresse) {
  const controller = new AbortController()
  const timeoutId = setTimeout(
    () => controller.abort(),
    PARAMS.DELAI_TIMEOUT_GEOCODAGE * 1000
  )

  try {
    const params = new URLSearchParams({
      q: adresse,
      format: 'json',
      limit: '1',
      countrycodes: 'ca',
    })
    const reponse = await fetch(`${NOMINATIM_URL}?${params}`, {
      signal: controller.signal,
      headers: { 'Accept-Language': 'fr' },
    })
    const resultats = await reponse.json()
    if (!resultats || resultats.length === 0) return null
    return { lat: parseFloat(resultats[0].lat), lon: parseFloat(resultats[0].lon) }
  } catch {
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Calcule la distance en mètres entre deux points GPS (formule haversine).
 *
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number} Distance en mètres
 */
export function calculerDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000 // rayon Terre en mètres
  const phi1 = (lat1 * Math.PI) / 180
  const phi2 = (lat2 * Math.PI) / 180
  const dphi = ((lat2 - lat1) * Math.PI) / 180
  const dlambda = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(dphi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlambda / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

/**
 * Filtre les bâtiments dans le rayon PARAM_001 (500m) autour d'un point.
 * Référence : RT-004, PARAM_001.
 *
 * Règle DEC-009 : si le bâtiment a des coordonnées GPS dans le JSON,
 * elles sont utilisées directement (bypass Nominatim).
 *
 * @param {Array}  batiments    Liste complète des bâtiments
 * @param {number} lat          Latitude du point d'intervention
 * @param {number} lon          Longitude du point d'intervention
 * @returns {Array} Bâtiments dans le rayon, enrichis d'une propriété `distance`
 */
export function filtrerParRayon(batiments, lat, lon) {
  return batiments
    .filter((b) => b.latitude != null && b.longitude != null)
    .map((b) => ({
      ...b,
      distance: Math.round(calculerDistance(lat, lon, b.latitude, b.longitude)),
    }))
    .filter((b) => b.distance <= PARAMS.RAYON_RECHERCHE)
    .sort((a, b) => a.distance - b.distance)
}
