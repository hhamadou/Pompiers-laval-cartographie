import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, CircleMarker, Circle, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './MapView.module.css'
import { PARAMS, NIVEAUX_DANGER, MESSAGES } from '../../config/params.js'

const CENTRE_LAVAL = [45.5646, -73.7439]
const ZOOM_INITIAL = 13

/**
 * Composant interne : repositionne la carte sur le point d'intervention.
 * Référence : C-002, C-003.
 */
function RecenterMap({ point }) {
  const map = useMap()
  useEffect(() => {
    if (point) map.setView([point.lat, point.lon], 15)
  }, [point, map])
  return null
}

/**
 * Composant interne : capture les clics sur la carte (fallback Nominatim).
 * Référence : C-002, DEC-007.
 */
function ClickHandler({ onClic }) {
  useMapEvents({
    click(e) {
      onClic({ lat: e.latlng.lat, lon: e.latlng.lng })
    },
  })
  return null
}

/**
 * MapView — C-002, C-003, C-004
 * Rendu Leaflet, markers colorés, cercle de rayon 500m, étiquettes de distance.
 * Référence : section 12 du dossier fonctionnel.
 *
 * @param {object}   props
 * @param {object}   props.pointIntervention  {lat, lon} ou null
 * @param {Array}    props.batimentsFiltres   Bâtiments dans le rayon après filtres, enrichis de `distance`
 * @param {Function} props.onClicCarte        Appelé avec {lat, lon} lors d'un clic sur la carte
 * @param {Function} props.onClicMarker       Appelé avec le bâtiment sélectionné
 */
export default function MapView({ pointIntervention, batimentsFiltres, onClicCarte, onClicMarker }) {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={CENTRE_LAVAL}
        zoom={ZOOM_INITIAL}
        className={styles.map}
        zoomControl={true}
      >
        {/* Couche principale OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={19}
        />
        {/* Couche de fallback — carte OSM alternative */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap France</a>'
          maxZoom={20}
          opacity={0}
        />

        <ClickHandler onClic={onClicCarte} />
        {pointIntervention && <RecenterMap point={pointIntervention} />}

        {/* Cercle de rayon PARAM_001 = 500m autour du point d'intervention */}
        {pointIntervention && (
          <Circle
            center={[pointIntervention.lat, pointIntervention.lon]}
            radius={PARAMS.RAYON_RECHERCHE}
            pathOptions={{ color: '#1a1a2e', fillColor: '#1a1a2e', fillOpacity: 0.05, weight: 2 }}
          />
        )}

        {/* Marker du point d'intervention */}
        {pointIntervention && (
          <CircleMarker
            center={[pointIntervention.lat, pointIntervention.lon]}
            radius={8}
            pathOptions={{ color: '#1a1a2e', fillColor: '#fff', fillOpacity: 1, weight: 3 }}
          >
            <Tooltip permanent direction="top" offset={[0, -10]}>
              📍 Point d'intervention
            </Tooltip>
          </CircleMarker>
        )}

        {/* Markers bâtiments à risque — RT-001, RT-002, RA-008 */}
        {batimentsFiltres.map((batiment) => {
          const niveau = NIVEAUX_DANGER[batiment.niveau_danger]
          const couleur = niveau ? niveau.couleur : '#888'
          return (
            <CircleMarker
              key={batiment.id}
              center={[batiment.latitude, batiment.longitude]}
              radius={10}
              pathOptions={{
                color: couleur,
                fillColor: couleur,
                fillOpacity: 0.85,
                weight: 2,
              }}
              eventHandlers={{ click: () => onClicMarker(batiment) }}
            >
              {/* Étiquette de distance — RA-007 */}
              <Tooltip permanent direction="bottom" offset={[0, 8]} className={styles.distanceLabel}>
                {batiment.distance} m
              </Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>

      {/* MSG-007 — aucun bâtiment dans le rayon */}
      {pointIntervention && batimentsFiltres.length === 0 && (
        <div className={styles.messageAucunResultat} role="status">
          {MESSAGES.AUCUN_BATIMENT}
        </div>
      )}
    </div>
  )
}
