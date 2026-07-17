# Guide d'entrevue — Dossier fonctionnel IA ready
## Projets gouvernementaux complexes avec intégrations API

Ce guide est destiné à être utilisé par l'IA pour conduire une entrevue structurée auprès de
l'analyste fonctionnel. L'objectif est de collecter toutes les informations nécessaires pour
générer un dossier fonctionnel IA ready complet selon le template v5.

---

## Instructions pour l'IA

Tu conduis une entrevue structurée en 7 étapes. Pour chaque étape :
1. Pose les questions de l'étape en les numérotant clairement.
2. Attends les réponses avant de passer à l'étape suivante.
3. Si une réponse est incomplète ou ambiguë, pose une question de relance ciblée.
4. Si l'analyste répond qu'une information est inconnue ou non applicable, note-le et avance.
5. À la fin de chaque étape, fais un résumé de ce que tu as compris avant de continuer.
6. Une fois toutes les étapes complétées, vérifie la checklist finale avant de générer le dossier.
7. Génère le dossier fonctionnel en utilisant le template :
   `~/.bob/skills/analyste-fonctionnel/templates/template-prompt_dossier_fonctionnel_ia_ready_v5.md`

Convention de réponse si l'analyste ne peut pas fournir une information :
- **INCONNU** : l'information n'est pas encore connue
- **NON APPLICABLE** : l'information ne s'applique pas à ce projet
- **À CONFIRMER** : l'information existe mais doit être validée avec le client

---

## Étape 1 — Contexte organisationnel et objectif métier

Ces questions établissent le cadre dans lequel s'inscrit le projet.

**Q1.** Dans quel système ou produit parent cette fonctionnalité s'intègre-t-elle ?
*(Ex. : portail citoyen, système de gestion interne, application mobile)*

**Q2.** Quel est l'environnement technique du projet ?
*(Ex. : .NET, Java Spring, React + Node.js)*

**Q3.** Quel est le type d'application ?
*(Ex. : interface web interactive, API REST, traitement batch, application hybride)*

**Q4.** Pourquoi développe-t-on cette fonctionnalité ? Quel problème résout-elle pour l'organisation ?

**Q5.** Qui sont les utilisateurs finaux ?
*(Préciser les rôles : citoyen, agent, administrateur, etc., et leur niveau de familiarité technique)*

**Q6.** Dans quelles circonstances les utilisateurs utiliseront-ils cette fonctionnalité ?
*(Ex. : en réponse à une demande, de façon proactive, à intervalle régulier)*

---

## Étape 2 — Fonctionnalités et navigation

Ces questions définissent le périmètre fonctionnel et le parcours utilisateur.

**Q7.** Quelles sont les 3 à 5 actions principales que l'utilisateur doit pouvoir effectuer ?

**Q8.** Y a-t-il des étapes obligatoires dans un ordre précis ? Si oui, décris la séquence.

**Q9.** D'où peut-on accéder à cette fonctionnalité dans l'application ?
*(Ex. : menu principal, page d'accueil, lien depuis une autre fonctionnalité — préciser l'identifiant
si connu)*

**Q10.** Quels paramètres ou informations sont nécessaires à l'entrée de cette fonctionnalité ?
*(Ex. : identifiant de l'utilisateur connecté, numéro de dossier, origine de l'appel)*

**Q11.** Où l'utilisateur est-il redirigé ou que voit-il après avoir complété l'action principale ?

**Q12.** Y a-t-il plusieurs points de sortie possibles selon le résultat ? Si oui, lesquels ?

---

## Étape 3 — Interface utilisateur

Ces questions permettent de spécifier les composants d'écran pour la section 10 du dossier.

**Q13.** Peux-tu décrire les éléments principaux de l'écran, dans l'ordre d'apparition ?
*(Ex. : titre de page, texte d'introduction, bouton d'action, tableau de résultats)*

Pour chaque élément identifié, précise si possible :
- Son libellé en français (et en anglais si le projet est bilingue)
- Son type (bouton, texte, hyperlien, champ de saisie, tableau, icône, etc.)
- Sa condition d'affichage (toujours visible, ou seulement dans certaines conditions ?)
- Ce qui se passe quand l'utilisateur interagit avec lui

**Q14.** Y a-t-il des dialogues modaux (fenêtres contextuelles) ? Si oui, dans quelles situations
s'affichent-ils et que contiennent-ils ?

**Q15.** Y a-t-il des états visuels différents pour certains éléments ?
*(Ex. : bouton actif / inactif, icône succès / erreur / en cours)*

---

## Étape 4 — Intégrations et données

Ces questions documentent les dépendances vers d'autres systèmes.

**Q16.** Cette fonctionnalité doit-elle communiquer avec d'autres systèmes ou APIs ?

Si **OUI**, pour chaque système ou API :
- **Identifiant ou nom** de l'API
- **Rôle** : que fait cette API dans le contexte de cette fonctionnalité ?
- **Criticité** : que se passe-t-il si cette API est indisponible ? (bloquant ou non)
- **Paramètres d'entrée** : quelles informations lui sont transmises ?
- **Données obtenues** : quelles informations sont récupérées en retour ?

**Q17.** Y a-t-il des données qui doivent être stockées ou mises à jour ? Si oui, lesquelles ?

**Q18.** Y a-t-il des données lues en entrée pour initialiser l'écran ?
*(Ex. : données du profil de l'utilisateur, état du dossier, préférences)*

---

## Étape 5 — Règles, contraintes et paramètres système

Ces questions alimentent les sections règles, exigences et paramètres du dossier.

**Q19.** Y a-t-il des limites quantitatives ?
*(Ex. : nombre maximum d'éléments, taille maximale d'un fichier, délai d'expiration)*

**Q20.** Y a-t-il des formats ou types acceptés ou refusés ?
*(Ex. : formats de fichiers, formats de dates, longueurs de champs)*

**Q21.** Y a-t-il des règles de validation spécifiques à appliquer sur les données saisies ou
reçues ?

**Q22.** Y a-t-il des valeurs configurables qui ne doivent pas être codées en dur dans
l'application ?
*(Ex. : délais, seuils, nombres maximum, textes paramétrables)*
Pour chaque valeur : préciser le nom fonctionnel, la valeur suggérée par défaut, et sa description.

**Q23.** Quelles sont les exigences de performance ?
*(Ex. : temps de réponse cible, disponibilité attendue)*

**Q24.** Quelles sont les exigences d'accessibilité ?
*(Ex. : conformité WCAG 2.1 niveau AA, navigation au clavier, lecteurs d'écran)*

---

## Étape 6 — Messages utilisateur et gestion des erreurs

Ces questions alimentent la section 18 du dossier (messages utilisateur).

**Q25.** Quels messages de succès l'utilisateur doit-il voir, et dans quelles conditions ?

**Q26.** Quels messages d'erreur l'utilisateur doit-il voir, et dans quelles conditions ?
*(Préciser le texte exact si connu, ou décrire la situation qui déclenche l'erreur)*

**Q27.** Quels messages d'avertissement ou d'information l'utilisateur doit-il voir ?

**Q28.** Le projet est-il bilingue (français et anglais) ? Si oui, les versions anglaises des
messages sont-elles déjà connues ?

---

## Étape 7 — Cas limites et situations exceptionnelles

Ces questions garantissent que les cas non nominaux sont couverts.

> **Principe de fallback** : Pour chaque dépendance externe (API, service, source de données),
> documenter systématiquement trois niveaux de réponse :
> 1. **Dégradation gracieuse** : que peut encore faire l'utilisateur si la dépendance est absente ?
> 2. **Données de secours** : y a-t-il un cache, un localStorage, une source alternative ?
> 3. **Message utilisateur** : que voit l'utilisateur et quelle action lui propose-t-on ?
>
> Dans un contexte opérationnel critique (urgence, sécurité publique), le fallback doit être
> **bulletproof** : l'application ne doit jamais afficher un écran blanc ou bloquer l'utilisateur
> sans alternative. Une fonctionnalité dégradée vaut mieux qu'une application inutilisable.

**Q29.** Que se passe-t-il si une API externe est indisponible ou retourne une erreur ?
*(Pour chaque API identifiée à l'étape 4, documenter les trois niveaux : dégradation gracieuse,
données de secours, message utilisateur)*

Pour chaque API, préciser aussi :
- Le comportement si l'API est lente (timeout) — à partir de combien de secondes ?
- Le comportement si l'API retourne des données partielles ou corrompues
- Si l'API est CRITIQUE : l'application peut-elle fonctionner sans elle, même en mode dégradé ?

**Q30.** Que se passe-t-il si l'utilisateur tente de dépasser les limites définies à l'étape 5 ?

**Q31.** Que se passe-t-il si l'utilisateur quitte la fonctionnalité en cours de processus
(fermeture d'onglet, navigation arrière, expiration de session) ?

**Q32.** Que se passe-t-il si une validation échoue ? L'utilisateur peut-il corriger et réessayer ?

**Q33.** Y a-t-il des situations où la fonctionnalité n'est pas disponible ou doit se comporter
différemment selon l'état du dossier ou le profil de l'utilisateur ?

**Q34.** Y a-t-il des exigences de traçabilité ou d'audit ?
*(Ex. : journalisation des actions, historique des transmissions, audit trail)*

---

## Checklist finale avant génération du dossier

Avant de générer le dossier fonctionnel, vérifier que tu disposes de :

### Contexte
- [ ] Système parent et environnement technique identifiés
- [ ] Objectif métier clairement formulé
- [ ] Utilisateurs cibles et leurs rôles définis
- [ ] Circonstances d'utilisation décrites

### Fonctionnalités
- [ ] Actions principales listées (3 à 5 minimum)
- [ ] Séquence d'étapes décrite si ordre obligatoire
- [ ] Points d'accès et de sortie identifiés
- [ ] Paramètres d'entrée et de sortie documentés

### Interface
- [ ] Éléments d'écran principaux décrits avec libellés
- [ ] Dialogues modaux identifiés (si applicables)
- [ ] États visuels documentés (si applicables)

### Intégrations
- [ ] APIs identifiées avec rôle, criticité, paramètres d'entrée et données obtenues
- [ ] Données stockées ou mises à jour identifiées

### Règles et paramètres
- [ ] Limites quantitatives documentées
- [ ] Règles de validation identifiées
- [ ] Valeurs paramétrables listées avec codes PARAM_XXX
- [ ] Exigences de performance et d'accessibilité notées

### Messages
- [ ] Messages de succès documentés
- [ ] Messages d'erreur documentés
- [ ] Bilinguisme FR/EN précisé

### Cas limites
- [ ] Comportements en cas d'indisponibilité API documentés
- [ ] Comportement en cas de dépassement de limites documenté
- [ ] Comportement en cas d'abandon du processus documenté
- [ ] Exigences de traçabilité notées

---

## Note sur la règle de décision du template v5

Une fois l'entrevue complétée, appliquer la règle de décision suivante pour adapter la
profondeur du dossier généré :

| Taille du projet | Action |
|-----------------|--------|
| Moins de 5 capacités | Simplifier : retirer sections 11.2, 12, 13; fusionner règles transversales si peu nombreuses |
| 5 à 10 capacités, logique directe | Utiliser le dossier directement pour coder; sections 16 et 17 selon pertinence |
| Plus de 10 capacités ou intégrations API | Utiliser sections 16 et 17; générer spec.md / rules.md / tests.md (voir templates/Prompts/) |
| Plus de 20 capacités | Ajouter diagramme de dépendances Mermaid; envisager découpage par domaine fonctionnel |
