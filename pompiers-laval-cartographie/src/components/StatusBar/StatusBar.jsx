import React from 'react'
import styles from './StatusBar.module.css'
import { MESSAGES } from '../../config/params.js'

/**
 * StatusBar — C-001
 * Indicateur de statut des données en barre supérieure.
 * Référence : section 9 C-001, composants d'interface réf. 1/2/3.
 *
 * @param {object} props
 * @param {'chargement' | 'pret'} props.statut
 * @param {number} props.nombreBatiments
 */
export default function StatusBar({ statut, nombreBatiments }) {
  return (
    <div className={styles.statusBar}>
      <span className={styles.appTitle}>🚒 SSI Laval — Sites à risques</span>
      {statut === 'chargement' && (
        <span className={`${styles.badge} ${styles.badgeChargement}`}>
          {MESSAGES.CHARGEMENT_EN_COURS}
        </span>
      )}
      {statut === 'pret' && (
        <span className={`${styles.badge} ${styles.badgePret}`}>
          ✓ {MESSAGES.BATIMENTS_CHARGES(nombreBatiments)}
        </span>
      )}
    </div>
  )
}
