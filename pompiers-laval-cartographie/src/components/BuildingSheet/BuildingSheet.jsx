import React, { useEffect } from 'react'
import styles from './BuildingSheet.module.css'
import { NIVEAUX_DANGER } from '../../config/params.js'

const NON_RENSEIGNE = 'Non renseigné'

/**
 * BuildingSheet — C-005
 * Fiche synthétique modale d'un bâtiment sélectionné.
 * Affiche les 7 champs définis dans le modèle de données (section 10).
 *
 * Règle RA-013 : une seule fiche à la fois.
 * Règle RA-014 : champ vide → "Non renseigné".
 * Règle RA-015 : badge niveau de danger avec couleur PARAM_002/003/004.
 *
 * @param {object}   props
 * @param {object}   props.batiment   Bâtiment sélectionné (ou null)
 * @param {Function} props.onFermer   Appelé pour fermer la fiche
 */
export default function BuildingSheet({ batiment, onFermer }) {
  // Fermeture avec la touche Échap — accessibilité clavier
  useEffect(() => {
    if (!batiment) return
    function handleKey(e) {
      if (e.key === 'Escape') onFermer()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [batiment, onFermer])

  if (!batiment) return null

  const niveau = NIVEAUX_DANGER[batiment.niveau_danger]
  const couleur = niveau ? niveau.couleur : '#888'
  const libelleNiveau = niveau ? niveau.libelle : 'Inconnu'

  // RA-014 : valeur vide → "Non renseigné"
  function valeur(v) {
    if (v == null || v === '' || (Array.isArray(v) && v.length === 0)) return NON_RENSEIGNE
    if (Array.isArray(v)) return v.filter(Boolean).join(', ') || NON_RENSEIGNE
    return v
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Fiche synthétique — ${batiment.nom}`}
      onClick={(e) => { if (e.target === e.currentTarget) onFermer() }}
    >
      <div className={styles.modale}>
        {/* En-tête */}
        <div className={styles.entete} style={{ borderLeftColor: couleur }}>
          <div>
            <h2 className={styles.nom}>{batiment.nom}</h2>
            <p className={styles.adresse}>{valeur(batiment.adresse)}</p>
          </div>
          <button
            className={styles.boutonFermer}
            onClick={onFermer}
            aria-label="Fermer la fiche"
          >
            ✕
          </button>
        </div>

        {/* Corps — 7 champs du modèle de données */}
        <div className={styles.corps}>
          <dl className={styles.liste}>

            <div className={styles.champ}>
              <dt>Type d'établissement</dt>
              <dd>{valeur(batiment.type_etablissement)}</dd>
            </div>

            <div className={styles.champ}>
              <dt>Niveau de danger</dt>
              <dd>
                <span
                  className={styles.badge}
                  style={{ backgroundColor: couleur }}
                  aria-label={`Niveau de danger : ${libelleNiveau}`}
                >
                  {libelleNiveau}
                </span>
                {batiment.distance != null && (
                  <span className={styles.distance}> — {batiment.distance} m</span>
                )}
              </dd>
            </div>

            <div className={styles.champ}>
              <dt>Matières dangereuses</dt>
              <dd>
                {Array.isArray(batiment.matieres_dangereuses) && batiment.matieres_dangereuses.length > 0
                  ? (
                    <ul className={styles.listeMatieres}>
                      {batiment.matieres_dangereuses.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  )
                  : NON_RENSEIGNE
                }
              </dd>
            </div>

            <div className={styles.champ}>
              <dt>Quantités connues</dt>
              <dd>{valeur(batiment.quantites)}</dd>
            </div>

            <div className={`${styles.champ} ${styles.champConsignes}`}>
              <dt>⚠ Consignes particulières</dt>
              <dd>{valeur(batiment.consignes)}</dd>
            </div>

          </dl>
        </div>
      </div>
    </div>
  )
}
