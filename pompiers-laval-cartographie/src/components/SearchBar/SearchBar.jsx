import React, { useState } from 'react'
import styles from './SearchBar.module.css'
import { MESSAGES } from '../../config/params.js'

/**
 * SearchBar — C-002
 * Champ de saisie d'adresse d'intervention + bouton Localiser.
 * Référence : section 9 C-002, composants d'interface.
 *
 * @param {object}   props
 * @param {Function} props.onLocaliser  Appelé avec l'adresse saisie
 * @param {boolean}  props.chargement   True pendant le géocodage
 * @param {string}   props.messageErreur Message d'erreur à afficher (ou '')
 */
export default function SearchBar({ onLocaliser, chargement, messageErreur }) {
  const [adresse, setAdresse] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (adresse.trim()) onLocaliser(adresse.trim())
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
      {messageErreur && (
        <p className={styles.messageErreur} role="alert">
          {messageErreur}
        </p>
      )}
    </div>
  )
}
