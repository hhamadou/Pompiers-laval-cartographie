import React, { useState } from 'react'
import styles from './SearchBar.module.css'
import { MESSAGES } from '../../config/params.js'

/**
 * SearchBar — C-002, CA-005
 * Champ de saisie d'adresse d'intervention + bouton Localiser.
 * Si plusieurs résultats Nominatim, affiche une liste déroulante (max 3).
 * Référence : section 9 C-002, CA-005.
 *
 * @param {object}   props
 * @param {Function} props.onLocaliser     Appelé avec l'adresse saisie (recherche)
 * @param {Function} props.onSelectionner  Appelé avec {lat, lon} quand l'utilisateur choisit une suggestion
 * @param {Array}    props.suggestions     Tableau de {lat, lon, libelle} retourné par geoEngine
 * @param {boolean}  props.chargement      True pendant le géocodage
 * @param {string}   props.messageErreur   Message d'erreur à afficher (ou '')
 */
export default function SearchBar({ onLocaliser, onSelectionner, suggestions = [], chargement, messageErreur }) {
  const [adresse, setAdresse] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (adresse.trim()) onLocaliser(adresse.trim())
  }

  function handleChoixSuggestion(suggestion) {
    setAdresse(suggestion.libelle)
    onSelectionner(suggestion)
  }

  return (
    <div className={styles.searchBarContainer}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder="Adresse d'intervention (ex: 450 boul. Industriel, Laval)"
          aria-label="Adresse d'intervention"
          disabled={chargement}
        />
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
