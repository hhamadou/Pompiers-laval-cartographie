import { describe, it, expect } from 'vitest'
import { calculerDistance, filtrerParRayon } from '../src/modules/geoEngine.js'
import { PARAMS } from '../src/config/params.js'

// ─── calculerDistance (formule haversine) ────────────────────────────────────

describe('calculerDistance', () => {
  it('retourne 0 pour deux points identiques', () => {
    expect(calculerDistance(45.5646, -73.7439, 45.5646, -73.7439)).toBe(0)
  })

  it('calcule une distance réaliste entre deux points de Laval (~130m)', () => {
    // BAT-001 et BAT-002 du fichier JSON
    const dist = calculerDistance(45.5646, -73.7439, 45.5658, -73.7428)
    expect(dist).toBeGreaterThan(100)
    expect(dist).toBeLessThan(200)
  })

  it('retourne une valeur positive même si les coordonnées sont inversées', () => {
    const d1 = calculerDistance(45.5646, -73.7439, 45.5658, -73.7428)
    const d2 = calculerDistance(45.5658, -73.7428, 45.5646, -73.7439)
    expect(d1).toBeCloseTo(d2, 1)
  })
})

// ─── filtrerParRayon ──────────────────────────────────────────────────────────

const POINT_CENTRE = { lat: 45.5646, lon: -73.7439 }

const BATIMENTS_TEST = [
  // Dans le rayon (~0m du centre)
  { id: 'A', latitude: 45.5646, longitude: -73.7439, niveau_danger: 1 },
  // Dans le rayon (~130m)
  { id: 'B', latitude: 45.5658, longitude: -73.7428, niveau_danger: 2 },
  // Hors rayon (loin)
  { id: 'C', latitude: 46.0, longitude: -74.0, niveau_danger: 3 },
  // Sans coordonnées GPS — RA-009 : exclu silencieusement
  { id: 'D', latitude: null, longitude: null, niveau_danger: 1 },
  // Exactement à 500m (cas limite — inclus selon CA bord)
]

describe('filtrerParRayon', () => {
  it('exclut les bâtiments hors rayon de 500m', () => {
    const resultat = filtrerParRayon(BATIMENTS_TEST, POINT_CENTRE.lat, POINT_CENTRE.lon)
    const ids = resultat.map((b) => b.id)
    expect(ids).not.toContain('C')
  })

  it('inclut les bâtiments dans le rayon', () => {
    const resultat = filtrerParRayon(BATIMENTS_TEST, POINT_CENTRE.lat, POINT_CENTRE.lon)
    const ids = resultat.map((b) => b.id)
    expect(ids).toContain('A')
    expect(ids).toContain('B')
  })

  it('exclut silencieusement les bâtiments sans coordonnées GPS — RA-009', () => {
    const resultat = filtrerParRayon(BATIMENTS_TEST, POINT_CENTRE.lat, POINT_CENTRE.lon)
    const ids = resultat.map((b) => b.id)
    expect(ids).not.toContain('D')
  })

  it('enrichit chaque bâtiment retenu avec une propriété distance en mètres', () => {
    const resultat = filtrerParRayon(BATIMENTS_TEST, POINT_CENTRE.lat, POINT_CENTRE.lon)
    resultat.forEach((b) => {
      expect(typeof b.distance).toBe('number')
      expect(b.distance).toBeGreaterThanOrEqual(0)
    })
  })

  it('retourne une liste vide si aucun bâtiment dans le rayon', () => {
    const resultat = filtrerParRayon(BATIMENTS_TEST, 48.0, -75.0)
    expect(resultat).toHaveLength(0)
  })

  it('trie les résultats par distance croissante', () => {
    const resultat = filtrerParRayon(BATIMENTS_TEST, POINT_CENTRE.lat, POINT_CENTRE.lon)
    for (let i = 1; i < resultat.length; i++) {
      expect(resultat[i].distance).toBeGreaterThanOrEqual(resultat[i - 1].distance)
    }
  })

  it('respecte le rayon PARAM_001 de 500m', () => {
    const resultat = filtrerParRayon(BATIMENTS_TEST, POINT_CENTRE.lat, POINT_CENTRE.lon)
    resultat.forEach((b) => {
      expect(b.distance).toBeLessThanOrEqual(PARAMS.RAYON_RECHERCHE)
    })
  })
})
