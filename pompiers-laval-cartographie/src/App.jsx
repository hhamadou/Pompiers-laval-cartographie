import React, { useState, useMemo } from 'react'
import styles from './App.module.css'

import { chargerBatiments } from './modules/dataLoader.js'
import { geocoderAdresseSuggestions, filtrerParRayon } from './modules/geoEngine.js'
import { MESSAGES } from './config/params.js'

import StatusBar from './components/StatusBar/StatusBar.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import FilterPanel from './components/FilterPanel/FilterPanel.jsx'
import MapView from './components/MapView/MapView.jsx'
import BuildingSheet from './components/BuildingSheet/BuildingSheet.jsx'

// ─── C-001 : Chargement synchrone depuis le bundle ───────────────────────────
// Note dossier C-001 : "import statique — pas de useEffect asynchrone requis"
const TOUS_BATIMENTS = chargerBatiments()

// RA-011 : types d'établissement uniques, générés au démarrage
const TYPES_DISPONIBLES = Array.from(
  new Set(TOUS_BATIMENTS.map((b) => b.type_etablissement).filter(Boolean))
).sort()

// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  // ─── États principaux ────────────────────────────────────────────────────
  const [pointIntervention, setPointIntervention] = useState(null)
  const [geocodageEnCours, setGeocodageEnCours] = useState(false)
  const [messageErreur, setMessageErreur] = useState('')
  const [batimentSelectionne, setBatimentSelectionne] = useState(null)
  const [suggestions, setSuggestions] = useState([])  // CA-005

  // ─── C-004 : État des filtres — RA-010 : tous actifs par défaut ──────────
  const [filtresNiveau, setFiltresNiveau] = useState({ 1: true, 2: true, 3: true })
  const [filtreType, setFiltreType] = useState('')

  // ─── C-003 : Bâtiments dans le rayon ─────────────────────────────────────
  // RA-009 : bâtiments sans GPS exclus silencieusement (dans filtrerParRayon)
  const batimentsDansRayon = useMemo(() => {
    if (!pointIntervention) return []
    return filtrerParRayon(TOUS_BATIMENTS, pointIntervention.lat, pointIntervention.lon)
  }, [pointIntervention])

  // ─── C-004 : Filtres appliqués sur la liste dans le rayon ────────────────
  // RA-012 : les filtres n'affectent que l'affichage — données en mémoire intactes
  const batimentsFiltres = useMemo(() => {
    return batimentsDansRayon.filter((b) => {
      const passNiveau = filtresNiveau[b.niveau_danger] === true
      const passType = filtreType === '' || b.type_etablissement === filtreType
      return passNiveau && passType
    })
  }, [batimentsDansRayon, filtresNiveau, filtreType])

  // ─── C-002 + CA-005 : Géocodage de l'adresse saisie ─────────────────────
  async function handleLocaliser(adresse) {
    setGeocodageEnCours(true)
    setMessageErreur('')
    setBatimentSelectionne(null)
    setSuggestions([])

    const resultats = await geocoderAdresseSuggestions(adresse)

    setGeocodageEnCours(false)

    if (!resultats || resultats.length === 0) {
      setMessageErreur(MESSAGES.ADRESSE_NON_TROUVEE)
      return
    }
    if (resultats.length === 1) {
      // Un seul résultat — on positionne directement
      setPointIntervention(resultats[0])
    } else {
      // Plusieurs résultats — CA-005 : liste déroulante
      setSuggestions(resultats)
    }
  }

  // ─── CA-005 : Sélection d'une suggestion dans la liste déroulante ─────────
  function handleSelectionnerSuggestion(suggestion) {
    setSuggestions([])
    setBatimentSelectionne(null)
    setPointIntervention({ lat: suggestion.lat, lon: suggestion.lon })
  }

  // ─── Bouton Effacer : remet l'application à l'état initial ───────────────
  function handleReinitialiser() {
    setPointIntervention(null)
    setMessageErreur('')
    setBatimentSelectionne(null)
    setSuggestions([])
  }

  // ─── C-002 : Clic direct sur la carte (fallback Nominatim — DEC-007) ─────
  function handleClicCarte(coords) {
    setMessageErreur('')
    setBatimentSelectionne(null)
    setPointIntervention(coords)
  }

  // ─── C-004 : Toggle niveau de danger ─────────────────────────────────────
  function handleToggleNiveau(niveau) {
    setFiltresNiveau((prev) => ({ ...prev, [niveau]: !prev[niveau] }))
  }

  // ─── C-005 : Sélection d'un bâtiment — RA-013 : une seule fiche à la fois
  function handleClicMarker(batiment) {
    setBatimentSelectionne(batiment)
  }

  return (
    <div className={styles.app}>
      {/* C-001 — Indicateur de statut */}
      <StatusBar
        statut="pret"
        nombreBatiments={TOUS_BATIMENTS.length}
      />

      {/* C-002 + CA-005 — Saisie de l'adresse d'intervention */}
      <SearchBar
        onLocaliser={handleLocaliser}
        onSelectionner={handleSelectionnerSuggestion}
        onReinitialiser={handleReinitialiser}
        suggestions={suggestions}
        chargement={geocodageEnCours}
        messageErreur={messageErreur}
      />

      {/* C-004 — Filtres */}
      <FilterPanel
        filtresNiveau={filtresNiveau}
        filtreType={filtreType}
        typesDisponibles={TYPES_DISPONIBLES}
        onToggleNiveau={handleToggleNiveau}
        onChangerType={setFiltreType}
      />

      {/* C-002 + C-003 — Carte */}
      <MapView
        pointIntervention={pointIntervention}
        batimentsFiltres={batimentsFiltres}
        batimentActifId={batimentSelectionne ? batimentSelectionne.id : null}
        onClicCarte={handleClicCarte}
        onClicMarker={handleClicMarker}
      />

      {/* C-005 — Fiche synthétique */}
      <BuildingSheet
        batiment={batimentSelectionne}
        onFermer={() => setBatimentSelectionne(null)}
      />
    </div>
  )
}
