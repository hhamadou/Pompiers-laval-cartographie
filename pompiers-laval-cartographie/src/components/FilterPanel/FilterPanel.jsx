import React from 'react'
import styles from './FilterPanel.module.css'
import { NIVEAUX_DANGER } from '../../config/params.js'

/**
 * FilterPanel — C-004
 * Boutons toggle niveau de danger + liste déroulante type d'établissement.
 * Référence : section 9 C-004, composants d'interface réf. 1/2/3/4.
 *
 * Règle RA-010 : filtres niveau danger tous actifs par défaut.
 * Règle RA-011 : types d'établissement générés dynamiquement depuis le JSON.
 * Règle RA-012 : les filtres n'affectent que l'affichage.
 *
 * @param {object}   props
 * @param {object}   props.filtresNiveau     { 1: bool, 2: bool, 3: bool }
 * @param {string}   props.filtreType        Type sélectionné ou '' (tous)
 * @param {string[]} props.typesDisponibles  Liste des types uniques
 * @param {Function} props.onToggleNiveau    Appelé avec le numéro de niveau
 * @param {Function} props.onChangerType     Appelé avec la valeur sélectionnée
 */
export default function FilterPanel({
  filtresNiveau,
  filtreType,
  typesDisponibles,
  onToggleNiveau,
  onChangerType,
}) {
  return (
    <div className={styles.filterPanel}>
      <span className={styles.label}>Filtres :</span>

      {/* Boutons toggle niveau de danger — RA-010 */}
      <div className={styles.toggleGroup} role="group" aria-label="Filtrer par niveau de danger">
        {Object.entries(NIVEAUX_DANGER).map(([niveau, { libelle, couleur }]) => (
          <button
            key={niveau}
            className={`${styles.toggleBtn} ${filtresNiveau[niveau] ? styles.actif : styles.inactif}`}
            style={filtresNiveau[niveau] ? { backgroundColor: couleur, borderColor: couleur } : {}}
            onClick={() => onToggleNiveau(Number(niveau))}
            aria-pressed={filtresNiveau[niveau]}
            aria-label={`Niveau ${libelle}`}
          >
            {libelle}
          </button>
        ))}
      </div>

      {/* Liste déroulante type d'établissement — RA-011 */}
      <select
        className={styles.select}
        value={filtreType}
        onChange={(e) => onChangerType(e.target.value)}
        aria-label="Filtrer par type d'établissement"
      >
        <option value="">Tous les types</option>
        {typesDisponibles.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  )
}
