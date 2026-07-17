# Template de Documentation d'Anomalie

## Informations Générales

| Champ | Valeur |
|-------|--------|
| **ID Anomalie** | [ANO-XXXX] |
| **Titre** | [Titre court et descriptif] |
| **Date de découverte** | [AAAA-MM-JJ] |
| **Découvert par** | [Nom de la personne] |
| **Projet** | [Nom du projet] |
| **Version/Release** | [Version du logiciel] |
| **Statut** | [Nouveau / En cours / Résolu / Fermé / Réouvert] |

---

## Classification

### Priorité

- [ ] **Critique** - Bloque complètement l'utilisation du système
- [ ] **Élevée** - Impact majeur sur les fonctionnalités principales
- [ ] **Moyenne** - Impact modéré, contournement possible
- [ ] **Faible** - Impact mineur, cosmétique ou amélioration

### Sévérité

- [ ] **Bloquante** - Empêche la poursuite des tests ou l'utilisation
- [ ] **Majeure** - Fonctionnalité importante non disponible
- [ ] **Mineure** - Problème gênant mais non bloquant
- [ ] **Cosmétique** - Problème d'affichage ou de présentation

### Type

- [ ] Fonctionnel
- [ ] Performance
- [ ] Sécurité
- [ ] Accessibilité
- [ ] Utilisabilité
- [ ] Interface utilisateur
- [ ] Données
- [ ] Intégration
- [ ] Documentation

---

## Environnement

### Environnement de Découverte

- [ ] Développement
- [ ] Test/QA
- [ ] Pré-production
- [ ] Production

### Configuration Technique

| Élément | Détails |
|---------|---------|
| **Système d'exploitation** | [Windows 11 / macOS 13 / Linux Ubuntu 22.04] |
| **Navigateur** | [Chrome 120 / Firefox 121 / Safari 17 / Edge 120] |
| **Résolution d'écran** | [1920x1080 / 1366x768 / etc.] |
| **Appareil** | [Desktop / Laptop / Tablette / Mobile] |
| **Version de l'application** | [X.Y.Z] |
| **Base de données** | [Type et version] |
| **Serveur** | [Configuration serveur si pertinent] |

### Données de Test Utilisées

```
Utilisateur : [ID ou nom d'utilisateur de test]
Rôle : [Rôle de l'utilisateur]
Données spécifiques : [Décrire les données utilisées]
```

---

## Description de l'Anomalie

### Résumé

[Description concise du problème en 1-2 phrases]

**Exemple :**
> Lors de la soumission d'un formulaire avec des caractères spéciaux dans le champ "Nom", le système affiche une erreur 500 au lieu de valider ou rejeter la saisie avec un message approprié.

### Comportement Observé

[Description détaillée de ce qui se passe actuellement]

**Ce qui se passe :**
- [Point 1]
- [Point 2]
- [Point 3]

### Comportement Attendu

[Description détaillée de ce qui devrait se passer]

**Ce qui devrait se passer :**
- [Point 1]
- [Point 2]
- [Point 3]

### Impact

**Impact utilisateur :**
[Décrire comment cela affecte les utilisateurs]

**Impact métier :**
[Décrire les conséquences métier]

**Nombre d'utilisateurs affectés :**
- [ ] Tous les utilisateurs
- [ ] Groupe spécifique : [préciser]
- [ ] Utilisateurs occasionnels
- [ ] Estimation : [X%] des utilisateurs

---

## Étapes de Reproduction

### Préconditions

[Conditions qui doivent être remplies avant de reproduire l'anomalie]

1. [Précondition 1]
2. [Précondition 2]
3. [Précondition 3]

### Étapes Détaillées

**Étape 1 :**
[Action précise à effectuer]
- Détail supplémentaire si nécessaire
- Données à saisir : [valeurs exactes]

**Étape 2 :**
[Action suivante]
- Détail supplémentaire
- Données à saisir : [valeurs exactes]

**Étape 3 :**
[Action suivante]
- Détail supplémentaire

**Étape N :**
[Dernière action avant l'apparition de l'anomalie]

### Résultat Obtenu

[Décrire exactement ce qui se produit après les étapes ci-dessus]

### Fréquence de Reproduction

- [ ] **Systématique** - Se produit à chaque fois (100%)
- [ ] **Fréquent** - Se produit souvent (>50%)
- [ ] **Occasionnel** - Se produit parfois (10-50%)
- [ ] **Rare** - Se produit rarement (<10%)
- [ ] **Non reproductible** - Ne peut pas être reproduit de manière fiable

**Taux de reproduction :** [X/Y tentatives]

---

## Preuves et Captures

### Captures d'Écran

**Capture 1 : [Description]**
![Description de la capture](chemin/vers/capture1.png)

**Capture 2 : [Description]**
![Description de la capture](chemin/vers/capture2.png)

### Vidéo de Reproduction

[Lien vers la vidéo ou description de la vidéo]

### Messages d'Erreur

```
[Copier-coller le message d'erreur exact]
```

### Logs Système

```
[Extraits pertinents des logs]
Timestamp: [AAAA-MM-JJ HH:MM:SS]
Level: [ERROR/WARNING]
Message: [Message du log]
Stack trace: [Si applicable]
```

### Logs Console Navigateur

```javascript
// Console JavaScript
[Copier-coller les erreurs de la console]
```

### Requêtes Réseau

```
Request URL: [URL]
Request Method: [GET/POST/PUT/DELETE]
Status Code: [Code HTTP]
Response: [Réponse si pertinente]
```

---

## Analyse Technique

### Composants Affectés

- [ ] Interface utilisateur
- [ ] API Backend
- [ ] Base de données
- [ ] Service externe
- [ ] Autre : [préciser]

**Modules/Fichiers concernés :**
- [Module 1] : [Fichier/Composant]
- [Module 2] : [Fichier/Composant]

### Cause Probable

[Si identifiée, décrire la cause probable de l'anomalie]

### Règles Métier Violées

- [RM-XXX] : [Description de la règle métier non respectée]
- [RM-YYY] : [Autre règle]

---

## Contournement

### Solution de Contournement Disponible

- [ ] Oui
- [ ] Non

### Description du Contournement

[Si un contournement existe, le décrire en détail]

**Étapes du contournement :**
1. [Étape 1]
2. [Étape 2]
3. [Étape 3]

**Limitations du contournement :**
- [Limitation 1]
- [Limitation 2]

---

## Informations Complémentaires

### Anomalies Liées

- [ANO-XXXX] : [Description de l'anomalie liée]
- [ANO-YYYY] : [Description de l'anomalie liée]

### Exigences Fonctionnelles Liées

- [BF-XXX] : [Référence au besoin fonctionnel]
- [CU-XXX] : [Référence au cas d'usage]

### Historique

| Date | Action | Auteur | Commentaire |
|------|--------|--------|-------------|
| AAAA-MM-JJ | Création | [Nom] | Anomalie découverte |
| AAAA-MM-JJ | Assignation | [Nom] | Assigné à l'équipe dev |
| AAAA-MM-JJ | Résolution | [Nom] | Correctif appliqué |
| AAAA-MM-JJ | Test | [Nom] | Correctif validé |
| AAAA-MM-JJ | Fermeture | [Nom] | Anomalie fermée |

---

## Résolution

### Assignation

| Champ | Valeur |
|-------|--------|
| **Assigné à** | [Nom de la personne/équipe] |
| **Date d'assignation** | [AAAA-MM-JJ] |
| **Date cible de résolution** | [AAAA-MM-JJ] |

### Correctif Appliqué

**Date de résolution :** [AAAA-MM-JJ]

**Description du correctif :**
[Décrire la solution implémentée]

**Fichiers modifiés :**
- [Fichier 1] : [Description des modifications]
- [Fichier 2] : [Description des modifications]

**Commit/PR :**
- Commit ID : [ID du commit]
- Pull Request : [Lien vers la PR]

### Tests de Validation

**Tests effectués :**
- [ ] Test du scénario principal
- [ ] Tests de régression
- [ ] Tests des cas limites
- [ ] Tests de performance (si applicable)
- [ ] Tests d'accessibilité (si applicable)

**Résultats des tests :**
[Décrire les résultats des tests de validation]

**Testeur :** [Nom]
**Date de validation :** [AAAA-MM-JJ]

### Tests de Non-Régression

**Scénarios testés :**
1. [Scénario 1] : [Résultat]
2. [Scénario 2] : [Résultat]
3. [Scénario 3] : [Résultat]

---

## Fermeture

### Critères de Fermeture

- [ ] Correctif implémenté et déployé
- [ ] Tests de validation réussis
- [ ] Tests de non-régression réussis
- [ ] Documentation mise à jour (si nécessaire)
- [ ] Approbation du client/responsable métier

### Commentaires de Fermeture

[Commentaires finaux sur la résolution de l'anomalie]

**Fermé par :** [Nom]
**Date de fermeture :** [AAAA-MM-JJ]

---

## Notes et Commentaires

### Commentaires de l'Équipe

**[Date] - [Auteur] :**
[Commentaire]

**[Date] - [Auteur] :**
[Commentaire]

### Leçons Apprises

[Si applicable, noter les leçons apprises pour éviter des anomalies similaires]

---

## Checklist de Documentation

Avant de soumettre l'anomalie, vérifier que :

- [ ] Le titre est clair et descriptif
- [ ] La priorité et la sévérité sont correctement évaluées
- [ ] L'environnement est complètement documenté
- [ ] Les étapes de reproduction sont détaillées et numérotées
- [ ] Des captures d'écran ou vidéos sont incluses
- [ ] Les messages d'erreur sont copiés textuellement
- [ ] L'impact est clairement décrit
- [ ] Un contournement est documenté (si disponible)
- [ ] Les références aux exigences sont incluses

---

## Conseils d'Utilisation

1. **Soyez précis** : Plus les détails sont précis, plus vite l'anomalie sera résolue
2. **Reproduisez d'abord** : Assurez-vous de pouvoir reproduire l'anomalie avant de la documenter
3. **Capturez tout** : Screenshots, logs, messages d'erreur - tout est utile
4. **Numérotez les étapes** : Facilitez la reproduction par l'équipe de développement
5. **Mettez à jour régulièrement** : Gardez le statut et les commentaires à jour
6. **Testez le correctif** : Validez toujours que le correctif résout bien le problème
7. **Vérifiez la non-régression** : Assurez-vous que le correctif n'introduit pas de nouveaux problèmes