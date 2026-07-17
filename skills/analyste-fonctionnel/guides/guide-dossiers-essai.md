# Guide de Rédaction de Dossiers d'Essai

## Introduction

Ce guide vous accompagne dans la création de dossiers d'essai (plans de test) complets et efficaces pour valider les fonctionnalités d'une application. Un bon dossier d'essai assure une couverture complète des tests et facilite la détection des anomalies.

---

## 1. Qu'est-ce qu'un Dossier d'Essai ?

Un dossier d'essai est un document qui décrit :
- **Quoi tester** : Les fonctionnalités et scénarios à valider
- **Comment tester** : Les étapes détaillées pour chaque test
- **Résultats attendus** : Ce qui devrait se produire
- **Critères de succès** : Quand considérer le test réussi

### Types de Tests

1. **Tests fonctionnels** : Validation des fonctionnalités
2. **Tests de régression** : Vérification que rien n'est cassé
3. **Tests d'intégration** : Validation des interactions entre composants
4. **Tests d'acceptation** : Validation par le client
5. **Tests de performance** : Validation de la rapidité
6. **Tests de sécurité** : Validation de la protection des données

---

## 2. Structure d'un Dossier d'Essai

### 2.1 En-tête du Document

```markdown
# Dossier d'Essai - [Nom de la Fonctionnalité]

| Champ | Valeur |
|-------|--------|
| **Projet** | [Nom du projet] |
| **Module/Fonctionnalité** | [Nom] |
| **Version testée** | [X.Y.Z] |
| **Date de création** | [AAAA-MM-JJ] |
| **Auteur** | [Nom de l'analyste] |
| **Statut** | [Brouillon / En révision / Approuvé] |
| **Environnement de test** | [Dev / Test / Pré-prod] |
```

### 2.2 Historique des Versions

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0 | AAAA-MM-JJ | [Nom] | Création initiale |
| 1.1 | AAAA-MM-JJ | [Nom] | Ajout de cas de test |

### 2.3 Références

- **Dossier fonctionnel** : [Référence]
- **Cas d'usage** : [CU-XXX]
- **User stories** : [US-XXX]
- **Exigences** : [REQ-XXX]

---

## 3. Préparation des Tests

### 3.1 Analyse des Exigences

**Étapes :**
1. Lire et comprendre le dossier fonctionnel
2. Identifier toutes les exigences à tester
3. Repérer les règles métier critiques
4. Noter les cas limites et exceptions
5. Identifier les dépendances

**Questions à se poser :**
- Quelles sont les fonctionnalités principales ?
- Quels sont les scénarios d'utilisation ?
- Quelles sont les règles métier à valider ?
- Quels sont les cas d'erreur possibles ?
- Quelles sont les contraintes techniques ?

### 3.2 Identification des Scénarios de Test

**Types de scénarios :**

1. **Scénarios positifs (Happy Path)**
   - Utilisation normale et attendue
   - Données valides
   - Flux principal

2. **Scénarios négatifs**
   - Données invalides
   - Erreurs utilisateur
   - Conditions d'erreur

3. **Scénarios limites (Edge Cases)**
   - Valeurs minimales/maximales
   - Champs vides
   - Caractères spéciaux
   - Volumes importants

4. **Scénarios alternatifs**
   - Flux alternatifs
   - Chemins secondaires
   - Options différentes

### 3.3 Matrice de Traçabilité

| Exigence | Cas de Test | Priorité | Statut |
|----------|-------------|----------|--------|
| BF-001 | TC-001, TC-002 | Haute | À tester |
| BF-002 | TC-003 | Moyenne | À tester |
| RM-001 | TC-004, TC-005 | Haute | À tester |

---

## 4. Rédaction des Cas de Test

### 4.1 Structure d'un Cas de Test

```markdown
## TC-001 : [Titre descriptif du cas de test]

**Objectif :** [Ce que ce test valide]

**Priorité :** [Critique / Haute / Moyenne / Basse]

**Type :** [Fonctionnel / Régression / Intégration / etc.]

**Exigences couvertes :** [BF-XXX, RM-XXX]

### Préconditions
- [Condition 1 qui doit être vraie avant le test]
- [Condition 2]
- [Condition 3]

### Données de Test
| Champ | Valeur | Type |
|-------|--------|------|
| [Champ 1] | [Valeur] | [Valide/Invalide] |
| [Champ 2] | [Valeur] | [Valide/Invalide] |

### Étapes de Test
| # | Action | Données | Résultat Attendu |
|---|--------|---------|------------------|
| 1 | [Action précise] | [Données à utiliser] | [Ce qui devrait se passer] |
| 2 | [Action suivante] | [Données] | [Résultat attendu] |
| 3 | [Action] | [Données] | [Résultat] |

### Résultat Attendu Final
[Description du résultat global attendu après toutes les étapes]

### Postconditions
- [État du système après le test]
- [Données créées/modifiées]

### Critères de Succès
- [ ] [Critère 1]
- [ ] [Critère 2]
- [ ] [Critère 3]

### Notes
[Informations supplémentaires, dépendances, points d'attention]
```

### 4.2 Exemple Concret

```markdown
## TC-001 : Création d'un compte utilisateur avec données valides

**Objectif :** Valider que l'utilisateur peut créer un compte avec des informations valides

**Priorité :** Haute

**Type :** Fonctionnel

**Exigences couvertes :** BF-001, RM-005

### Préconditions
- L'application est accessible
- L'utilisateur n'a pas de compte existant
- La base de données est accessible

### Données de Test
| Champ | Valeur | Type |
|-------|--------|------|
| Nom | Dupont | Valide |
| Prénom | Jean | Valide |
| Courriel | jean.dupont@example.com | Valide |
| Mot de passe | Test@1234 | Valide (8+ car., maj, min, chiffre, spécial) |
| Confirmation | Test@1234 | Valide |

### Étapes de Test
| # | Action | Données | Résultat Attendu |
|---|--------|---------|------------------|
| 1 | Naviguer vers la page d'inscription | - | Page d'inscription affichée |
| 2 | Saisir le nom | Dupont | Champ accepte la saisie |
| 3 | Saisir le prénom | Jean | Champ accepte la saisie |
| 4 | Saisir le courriel | jean.dupont@example.com | Champ accepte la saisie |
| 5 | Saisir le mot de passe | Test@1234 | Indicateur de force affiché |
| 6 | Confirmer le mot de passe | Test@1234 | Champ accepte la saisie |
| 7 | Cliquer sur "Créer le compte" | - | Formulaire soumis |
| 8 | Observer le résultat | - | Message de succès affiché |

### Résultat Attendu Final
- Le compte est créé dans la base de données
- Un courriel de confirmation est envoyé
- L'utilisateur est redirigé vers la page de connexion
- Message : "Votre compte a été créé avec succès. Veuillez vérifier votre courriel."

### Postconditions
- Un nouvel utilisateur existe dans la base de données
- Un courriel de confirmation a été envoyé
- L'utilisateur peut se connecter après validation du courriel

### Critères de Succès
- [ ] Le compte est créé sans erreur
- [ ] Toutes les données sont enregistrées correctement
- [ ] Le courriel de confirmation est reçu dans les 5 minutes
- [ ] L'utilisateur peut se connecter après validation

### Notes
- Vérifier que le mot de passe est bien hashé en base de données
- Tester avec différents formats de courriel valides
```

---

## 5. Techniques de Conception de Tests

### 5.1 Partitionnement en Classes d'Équivalence

**Principe :** Diviser les données d'entrée en groupes (classes) qui devraient être traités de la même manière.

**Exemple : Champ "Âge" (18-65 ans)**

| Classe | Valeurs | Valide/Invalide | Test |
|--------|---------|-----------------|------|
| Trop jeune | < 18 | Invalide | 17 |
| Valide | 18-65 | Valide | 25, 40, 65 |
| Trop âgé | > 65 | Invalide | 66 |

### 5.2 Analyse des Valeurs Limites

**Principe :** Tester les valeurs aux frontières des classes d'équivalence.

**Exemple : Champ "Âge" (18-65 ans)**

Valeurs à tester :
- 17 (juste en dessous)
- 18 (limite inférieure)
- 19 (juste au-dessus)
- 64 (juste en dessous)
- 65 (limite supérieure)
- 66 (juste au-dessus)

### 5.3 Tables de Décision

**Principe :** Représenter toutes les combinaisons de conditions et leurs résultats.

**Exemple : Validation de connexion**

| Condition | Test 1 | Test 2 | Test 3 | Test 4 |
|-----------|--------|--------|--------|--------|
| Courriel valide | Oui | Oui | Non | Non |
| Mot de passe valide | Oui | Non | Oui | Non |
| **Résultat** | **Connexion réussie** | **Erreur MDP** | **Erreur courriel** | **Erreur courriel** |

### 5.4 Tests de Transition d'État

**Principe :** Tester les transitions entre différents états d'un objet.

**Exemple : États d'une commande**

```
Nouvelle → En traitement → Expédiée → Livrée
    ↓           ↓             ↓
Annulée    Annulée       Retournée
```

**Tests à créer :**
- Nouvelle → En traitement
- En traitement → Expédiée
- Expédiée → Livrée
- Nouvelle → Annulée
- En traitement → Annulée
- Livrée → Retournée

### 5.5 Tests Combinatoires (Pairwise Testing)

**Principe :** Tester toutes les paires de paramètres plutôt que toutes les combinaisons.

**Exemple : Formulaire avec 3 champs**
- Navigateur : Chrome, Firefox, Safari
- OS : Windows, Mac, Linux
- Langue : FR, EN

Au lieu de 27 tests (3×3×3), on peut réduire à ~9 tests en couvrant toutes les paires.

---

## 6. Données de Test

### 6.1 Types de Données

**Données valides :**
- Respectent tous les critères de validation
- Représentent des cas d'usage réels
- Couvrent différents formats acceptables

**Données invalides :**
- Violent les règles de validation
- Testent la robustesse du système
- Vérifient les messages d'erreur

**Données limites :**
- Valeurs minimales et maximales
- Champs vides
- Longueurs extrêmes

**Données spéciales :**
- Caractères spéciaux : `<>'"&;`
- Caractères Unicode : émojis, accents
- Injection SQL : `'; DROP TABLE users--`
- XSS : `<script>alert('XSS')</script>`

### 6.2 Gestion des Données de Test

**Bonnes pratiques :**
- Créer un jeu de données de test réutilisable
- Documenter les données et leur utilisation
- Isoler les données de test des données de production
- Nettoyer les données après les tests
- Utiliser des données anonymisées si basées sur la production

**Exemple de jeu de données :**

```markdown
### Utilisateurs de Test

| ID | Nom | Courriel | Rôle | Mot de passe | Usage |
|----|-----|----------|------|--------------|-------|
| U001 | Test Admin | admin@test.com | Admin | Test@1234 | Tests admin |
| U002 | Test User | user@test.com | User | Test@1234 | Tests utilisateur |
| U003 | Test Guest | guest@test.com | Guest | Test@1234 | Tests invité |
```

---

## 7. Exécution des Tests

### 7.1 Préparation de l'Environnement

**Checklist :**
- [ ] Environnement de test disponible
- [ ] Version correcte déployée
- [ ] Base de données initialisée
- [ ] Données de test chargées
- [ ] Accès et permissions configurés
- [ ] Outils de test prêts

### 7.2 Exécution

**Processus :**
1. Vérifier les préconditions
2. Suivre les étapes exactement comme documentées
3. Observer et noter les résultats
4. Comparer avec les résultats attendus
5. Documenter tout écart
6. Capturer des preuves (captures d'écran, logs)

### 7.3 Documentation des Résultats

**Pour chaque cas de test :**

| TC-ID | Titre | Date | Testeur | Résultat | Anomalies | Commentaires |
|-------|-------|------|---------|----------|-----------|--------------|
| TC-001 | Création compte | 2024-01-15 | Jean | ✅ Réussi | - | RAS |
| TC-002 | Connexion invalide | 2024-01-15 | Jean | ❌ Échoué | ANO-123 | Message d'erreur incorrect |
| TC-003 | Réinitialisation MDP | 2024-01-15 | Jean | ⚠️ Bloqué | - | Serveur mail indisponible |

**Légende :**
- ✅ **Réussi** : Test passé, résultat conforme
- ❌ **Échoué** : Test échoué, anomalie détectée
- ⚠️ **Bloqué** : Test impossible à exécuter
- ⏸️ **En attente** : Test non encore exécuté
- 🔄 **À retester** : Anomalie corrigée, à valider

---

## 8. Gestion des Anomalies

### 8.1 Documentation d'une Anomalie

Lorsqu'un test échoue, documenter l'anomalie :

1. **Créer un rapport d'anomalie** (voir [`template-anomalie.md`](../templates/template-anomalie.md))
2. **Lier au cas de test** : Référencer le TC-ID
3. **Capturer les preuves** : Screenshots, logs, vidéo
4. **Décrire l'écart** : Attendu vs Observé
5. **Évaluer la sévérité** : Critique, Majeure, Mineure
6. **Assigner** : À l'équipe de développement

### 8.2 Suivi des Anomalies

| Anomalie | TC-ID | Sévérité | Statut | Assigné à | Date résolution |
|----------|-------|----------|--------|-----------|-----------------|
| ANO-123 | TC-002 | Majeure | En cours | Dev Team | - |
| ANO-124 | TC-005 | Mineure | Résolu | Dev Team | 2024-01-16 |

### 8.3 Tests de Régression

Après correction d'une anomalie :
1. **Retester le cas de test** qui a échoué
2. **Tester les cas connexes** (régression)
3. **Valider la correction** complète
4. **Fermer l'anomalie** si validée

---

## 9. Rapport de Test

### 9.1 Structure du Rapport

```markdown
# Rapport d'Essai - [Nom de la Fonctionnalité]

## Résumé Exécutif

| Métrique | Valeur |
|----------|--------|
| **Total de cas de test** | 50 |
| **Tests réussis** | 42 (84%) |
| **Tests échoués** | 5 (10%) |
| **Tests bloqués** | 3 (6%) |
| **Anomalies trouvées** | 8 |
| **Anomalies critiques** | 1 |
| **Recommandation** | ⚠️ Corrections nécessaires avant déploiement |

## Détails des Tests

### Tests Réussis (42)
[Liste des TC-ID réussis]

### Tests Échoués (5)
| TC-ID | Titre | Anomalie | Sévérité |
|-------|-------|----------|----------|
| TC-002 | ... | ANO-123 | Majeure |

### Tests Bloqués (3)
| TC-ID | Titre | Raison | Action requise |
|-------|-------|--------|----------------|
| TC-010 | ... | Serveur indisponible | Corriger infrastructure |

## Anomalies Détectées

### Critiques (1)
- ANO-125 : Perte de données lors de la sauvegarde

### Majeures (3)
- ANO-123 : Message d'erreur incorrect
- ANO-126 : Performance dégradée
- ANO-127 : Validation manquante

### Mineures (4)
[Liste des anomalies mineures]

## Couverture des Tests

| Module | Exigences | Tests | Couverture |
|--------|-----------|-------|------------|
| Authentification | 10 | 15 | 100% |
| Gestion utilisateurs | 8 | 12 | 100% |
| Rapports | 5 | 8 | 80% |

## Recommandations

1. **Corriger l'anomalie critique** ANO-125 avant tout déploiement
2. **Résoudre les anomalies majeures** pour améliorer l'expérience
3. **Compléter les tests bloqués** une fois l'infrastructure corrigée
4. **Augmenter la couverture** du module Rapports à 100%

## Risques Identifiés

- Risque de perte de données (ANO-125)
- Performance insuffisante sous charge (ANO-126)
- Validation de sécurité incomplète (ANO-127)

## Conclusion

Le système présente une bonne stabilité générale (84% de réussite), mais nécessite des corrections avant le déploiement en production, notamment pour l'anomalie critique de perte de données.
```

### 9.2 Métriques de Qualité

**Taux de réussite :**
```
Taux de réussite = (Tests réussis / Total tests) × 100
```

**Densité d'anomalies :**
```
Densité = Nombre d'anomalies / Nombre de cas de test
```

**Couverture des exigences :**
```
Couverture = (Exigences testées / Total exigences) × 100
```

---

## 10. Tests d'Acceptation Client

### 10.1 Préparation

**Documents à fournir :**
- [ ] Dossier d'essai simplifié pour le client
- [ ] Guide d'utilisation
- [ ] Données de test préparées
- [ ] Environnement de test accessible
- [ ] Support disponible

### 10.2 Scénarios d'Acceptation

**Caractéristiques :**
- Basés sur les cas d'usage réels
- Langage métier (pas technique)
- Scénarios de bout en bout
- Critères d'acceptation clairs

**Exemple :**

```markdown
## Scénario d'Acceptation 1 : Traiter une demande de service

**En tant que** gestionnaire de demandes
**Je veux** traiter une nouvelle demande
**Afin de** fournir le service au client

### Étapes
1. Consulter la liste des nouvelles demandes
2. Ouvrir la demande #12345
3. Vérifier les informations du client
4. Assigner la demande à un technicien
5. Ajouter une note interne
6. Changer le statut à "En traitement"
7. Envoyer une notification au client

### Critères d'Acceptation
- [ ] La demande apparaît dans la liste du technicien
- [ ] Le client reçoit une notification par courriel
- [ ] L'historique de la demande est mis à jour
- [ ] Le statut est visible pour tous les intervenants
```

### 10.3 Fiche de Validation Client

| Scénario | Testé par | Date | Résultat | Commentaires | Signature |
|----------|-----------|------|----------|--------------|-----------|
| SC-001 | Client | 2024-01-20 | ✅ Accepté | RAS | [Signature] |
| SC-002 | Client | 2024-01-20 | ❌ Refusé | Amélioration demandée | [Signature] |

---

## 11. Automatisation des Tests

### 11.1 Quand Automatiser ?

**Bons candidats pour l'automatisation :**
- Tests répétitifs (régression)
- Tests de performance
- Tests de charge
- Tests de fumée (smoke tests)
- Validation de données

**À garder manuels :**
- Tests exploratoires
- Tests d'utilisabilité
- Tests d'acceptation initiaux
- Tests de nouveaux flux

### 11.2 Structure d'un Test Automatisé

```javascript
describe('Création de compte utilisateur', () => {
  beforeEach(() => {
    // Préconditions
    cy.visit('/inscription');
  });

  it('TC-001: Devrait créer un compte avec données valides', () => {
    // Étapes
    cy.get('#nom').type('Dupont');
    cy.get('#prenom').type('Jean');
    cy.get('#courriel').type('jean.dupont@example.com');
    cy.get('#motdepasse').type('Test@1234');
    cy.get('#confirmation').type('Test@1234');
    cy.get('button[type="submit"]').click();

    // Assertions (résultats attendus)
    cy.contains('Votre compte a été créé avec succès');
    cy.url().should('include', '/connexion');
  });

  afterEach(() => {
    // Nettoyage
    cy.task('deleteTestUser', 'jean.dupont@example.com');
  });
});
```

---

## 12. Bonnes Pratiques

### 12.1 Rédaction

✅ **À faire :**
- Être précis et détaillé
- Utiliser un langage clair
- Numéroter les étapes
- Inclure les données exactes
- Documenter les résultats attendus
- Ajouter des captures d'écran si utile

❌ **À éviter :**
- Instructions vagues ("Tester la fonctionnalité")
- Étapes manquantes
- Résultats attendus ambigus
- Dépendances non documentées

### 12.2 Organisation

- **Grouper** les tests par module/fonctionnalité
- **Prioriser** les tests critiques
- **Maintenir** les tests à jour
- **Versionner** les dossiers d'essai
- **Réviser** régulièrement

### 12.3 Exécution

- **Suivre** exactement les étapes
- **Documenter** tous les résultats
- **Capturer** les preuves
- **Signaler** immédiatement les anomalies critiques
- **Communiquer** l'avancement

---

## 13. Outils et Ressources

### 13.1 Outils de Gestion de Tests

- **TestRail** : Gestion complète de tests
- **Zephyr** : Intégré à Jira
- **qTest** : Suite complète de test management
- **Azure Test Plans** : Intégré à Azure DevOps

### 13.2 Outils d'Automatisation

- **Selenium** : Tests web automatisés
- **Cypress** : Tests E2E modernes
- **Playwright** : Tests multi-navigateurs
- **Jest** : Tests unitaires JavaScript
- **Postman** : Tests d'API

### 13.3 Outils de Capture

- **Snagit** : Captures d'écran annotées
- **Loom** : Enregistrement vidéo
- **OBS Studio** : Enregistrement d'écran
- **Browser DevTools** : Logs et network

---

## 14. Checklist Finale

Avant de considérer les tests terminés :

- [ ] Tous les cas de test sont exécutés
- [ ] Toutes les anomalies sont documentées
- [ ] Les anomalies critiques sont résolues
- [ ] Les tests de régression sont passés
- [ ] La couverture des exigences est complète
- [ ] Le rapport de test est rédigé
- [ ] Le client a validé (tests d'acceptation)
- [ ] La documentation est à jour
- [ ] Les données de test sont nettoyées
- [ ] Les leçons apprises sont documentées

---

## Conseils Finaux

1. **Commencez tôt** : Rédigez les tests pendant le développement
2. **Soyez exhaustif** : Couvrez tous les scénarios
3. **Restez organisé** : Structure claire et logique
4. **Documentez tout** : Résultats, anomalies, décisions
5. **Communiquez** : Tenez l'équipe informée
6. **Itérez** : Améliorez continuellement vos tests
7. **Automatisez** : Quand c'est pertinent
8. **Pensez utilisateur** : Testez comme un utilisateur réel