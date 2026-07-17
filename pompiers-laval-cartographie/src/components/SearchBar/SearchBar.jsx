import React, { useState, useEffect, useRef } from 'react'
import styles from './SearchBar.module.css'
import { MESSAGES } from '../../config/params.js'

const DEBOUNCE_MS = 300

/**
 * SearchBar — C-002, CA-005
 * Champ de saisie d'adresse d'intervention + bouton Localiser.
 * Autocomplétion live (debounce 300ms) pendant la frappe.
 * Bouton ✕ pour effacer/réinitialiser la recherche.
 * Si plusieurs résultats Nominatim, affiche une liste déroulante (max 3).
 * Référence : section 9 C-002, CA-005.
 *
 * @param {object}   props
 * @param {Function} props.onLocaliser     Appelé avec l'adresse saisie (recherche manuelle via Entrée/bouton)
 * @param {Function} props.onSelectionner  Appelé avec {lat, lon} quand l'utilisateur choisit une suggestion
 * @param {Function} props.onReinitialiser Appelé quand l'utilisateur efface la recherche
 * @param {Array}    props.suggestions     Tableau de {lat, lon, libelle} retourné par geoEngine
 * @param {boolean}  props.chargement      True pendant le géocodage
 * @param {string}   props.messageErreur   Message d'erreur à afficher (ou '')
 */
export default function SearchBar({ onLocaliser, onSelectionner, onReinitialiser, suggestions = [], chargement, messageErreur }) {
  const [adresse, setAdresse] = useState('')
  const debounceRef = useRef(null)

  // Autocomplétion — déclenche la recherche après 300ms d'inactivité
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    const trimmed = adresse.trim()
    // Ne chercher qu'à partir de 4 caractères pour éviter des requêtes inutiles
    if (trimmed.length >= 4) {
      debounceRef.current = setTimeout(() => {
        onLocaliser(trimmed)
      }, DEBOUNCE_MS)
    }
    return () => clearTimeout(debounceRef.current)
  }, [adresse])

  function handleSubmit(e) {
    e.preventDefault()
    if (adresse.trim()) {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      onLocaliser(adresse.trim())
    }
  }

  function handleChoixSuggestion(suggestion) {
    setAdresse(suggestion.libelle)
    onSelectionner(suggestion)
  }

  function handleEffacer() {
    setAdresse('')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    onReinitialiser()
  }

  return (
    <div className={styles.searchBarContainer}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="text"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            placeholder="Adresse d'intervention (ex: 450 boul. Industriel, Laval)"
            aria-label="Adresse d'intervention"
            disabled={chargement}
          />
          {/* Bouton Effacer — visible dès qu'il y a du texte */}
          {adresse.length > 0 && (
            <button
              type="button"
              className={styles.boutonEffacer}
              onClick={handleEffacer}
              aria-label="Effacer la recherche"
            >
              ✕
            </button>
          )}
        </div>
        <button
          className={styles.bouton}
          type="submit"
          disabled={chargement || !adresse.trim()}
          aria-label="Localiser"
        >
          {chargement ? '...' : '📍 Localiser'}
        </button>
      </form>

      {/* CA-005 — Liste déroulante si Nominatim retourne plusieurs résultats */}
      {suggestions.length > 1 && (
        <ul className={styles.suggestions} role="listbox" aria-label="Résultats de géocodage">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className={styles.suggestionItem}
              role="option"
              onClick={() => handleChoixSuggestion(s)}
            >
              {s.libelle}
            </li>
          ))}
        </ul>
      )}

      {messageErreur && (
        <p className={styles.messageErreur} role="alert">
          {messageErreur}
        </p>
      )}
    </div>
  )
}
