# Checklist d'Accessibilité

## Introduction

Cette checklist est basée sur les **Web Content Accessibility Guidelines (WCAG) 2.1** et couvre les niveaux A, AA et AAA. Pour la plupart des projets gouvernementaux et commerciaux, le **niveau AA** est requis.

**Légende :**
- 🔴 **Niveau A** : Exigences minimales (obligatoire)
- 🟡 **Niveau AA** : Exigences recommandées (standard)
- 🟢 **Niveau AAA** : Exigences optimales (excellence)

---

## 1. Perceptible

L'information et les composants de l'interface utilisateur doivent être présentables aux utilisateurs de manière qu'ils puissent les percevoir.

### 1.1 Alternatives Textuelles

#### 1.1.1 Contenu Non Textuel 🔴 A

- [ ] Toutes les images ont un attribut `alt` approprié
- [ ] Les images décoratives ont un `alt=""` vide
- [ ] Les images complexes (graphiques, diagrammes) ont des descriptions détaillées
- [ ] Les icônes fonctionnelles ont des labels textuels ou ARIA
- [ ] Les CAPTCHAs ont des alternatives (audio, logique)
- [ ] Les contrôles de formulaire ont des labels associés

**Exemples :**
```html
<!-- Image informative -->
<img src="logo.png" alt="Logo de l'entreprise ABC">

<!-- Image décorative -->
<img src="decoration.png" alt="">

<!-- Icône fonctionnelle -->
<button aria-label="Fermer">
  <span class="icon-close" aria-hidden="true"></span>
</button>
```

### 1.2 Média Temporel

#### 1.2.1 Audio Seulement et Vidéo Seulement (Pré-enregistré) 🔴 A

- [ ] Les contenus audio ont une transcription textuelle
- [ ] Les vidéos sans audio ont une description textuelle ou audio
- [ ] Les alternatives sont facilement accessibles

#### 1.2.2 Sous-titres (Pré-enregistré) 🔴 A

- [ ] Toutes les vidéos avec audio ont des sous-titres synchronisés
- [ ] Les sous-titres incluent les dialogues et les sons importants
- [ ] Les sous-titres sont précis et bien synchronisés

#### 1.2.3 Audio-description ou Média Alternatif (Pré-enregistré) 🔴 A

- [ ] Les vidéos ont une audio-description OU une transcription complète
- [ ] L'audio-description décrit les éléments visuels importants

#### 1.2.4 Sous-titres (En Direct) 🟡 AA

- [ ] Les contenus audio en direct ont des sous-titres synchronisés

#### 1.2.5 Audio-description (Pré-enregistré) 🟡 AA

- [ ] Toutes les vidéos pré-enregistrées ont une audio-description

### 1.3 Adaptable

#### 1.3.1 Information et Relations 🔴 A

- [ ] La structure du contenu est définie par des balises sémantiques HTML
- [ ] Les titres utilisent les balises `<h1>` à `<h6>` dans l'ordre
- [ ] Les listes utilisent `<ul>`, `<ol>`, `<li>`
- [ ] Les tableaux de données utilisent `<table>`, `<th>`, `<td>` avec `scope`
- [ ] Les formulaires utilisent `<label>` associés aux champs
- [ ] Les régions de page utilisent les landmarks ARIA appropriés

**Exemples :**
```html
<!-- Structure sémantique -->
<header>
  <nav aria-label="Navigation principale">...</nav>
</header>
<main>
  <h1>Titre principal</h1>
  <section>
    <h2>Sous-titre</h2>
  </section>
</main>
<footer>...</footer>

<!-- Formulaire accessible -->
<label for="nom">Nom complet</label>
<input type="text" id="nom" name="nom" required>

<!-- Tableau accessible -->
<table>
  <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Âge</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jean</td>
      <td>30</td>
    </tr>
  </tbody>
</table>
```

#### 1.3.2 Ordre Séquentiel Logique 🔴 A

- [ ] L'ordre de lecture (DOM) est logique et cohérent
- [ ] L'ordre de tabulation suit un flux naturel
- [ ] Le contenu a du sens même sans CSS

#### 1.3.3 Caractéristiques Sensorielles 🔴 A

- [ ] Les instructions ne dépendent pas uniquement de la forme, taille, position
- [ ] Les instructions ne dépendent pas uniquement de la couleur ou du son
- [ ] Les informations sont compréhensibles sans perception sensorielle

**Mauvais exemple :** "Cliquez sur le bouton rond à droite"
**Bon exemple :** "Cliquez sur le bouton 'Soumettre' situé en bas à droite du formulaire"

#### 1.3.4 Orientation 🟡 AA

- [ ] Le contenu ne restreint pas l'orientation (portrait/paysage)
- [ ] L'interface fonctionne dans les deux orientations
- [ ] Exception : si l'orientation est essentielle (ex: piano virtuel)

#### 1.3.5 Identifier la Finalité de la Saisie 🟡 AA

- [ ] Les champs de formulaire ont des attributs `autocomplete` appropriés
- [ ] Les types de saisie sont identifiables programmatiquement

```html
<input type="email" name="email" autocomplete="email">
<input type="tel" name="phone" autocomplete="tel">
<input type="text" name="name" autocomplete="name">
```

### 1.4 Distinguable

#### 1.4.1 Utilisation de la Couleur 🔴 A

- [ ] La couleur n'est pas le seul moyen de transmettre l'information
- [ ] Les liens sont distinguables autrement que par la couleur seule
- [ ] Les erreurs de formulaire sont indiquées par des icônes/textes en plus de la couleur

**Exemple :**
```html
<!-- Mauvais : couleur seule -->
<span style="color: red;">Erreur</span>

<!-- Bon : couleur + icône + texte -->
<span class="error">
  <span class="icon-error" aria-hidden="true">⚠</span>
  Erreur : Le champ est obligatoire
</span>
```

#### 1.4.2 Contrôle du Son 🔴 A

- [ ] Les sons qui durent plus de 3 secondes ont un contrôle de pause/arrêt
- [ ] Le volume est ajustable indépendamment du système

#### 1.4.3 Contraste (Minimum) 🟡 AA

- [ ] **Texte normal** : ratio de contraste minimum de **4.5:1**
- [ ] **Texte large** (18pt+ ou 14pt+ gras) : ratio minimum de **3:1**
- [ ] Les composants d'interface ont un contraste de **3:1**
- [ ] Les états (focus, hover) ont un contraste suffisant

**Outils de vérification :**
- WebAIM Contrast Checker
- Chrome DevTools (Lighthouse)
- WAVE Browser Extension

#### 1.4.4 Redimensionnement du Texte 🟡 AA

- [ ] Le texte peut être agrandi jusqu'à 200% sans perte de contenu
- [ ] Pas de défilement horizontal à 200% de zoom
- [ ] Les fonctionnalités restent utilisables

#### 1.4.5 Texte sous Forme d'Image 🟡 AA

- [ ] Le texte n'est pas présenté sous forme d'image (sauf logos)
- [ ] Si nécessaire, l'image a un texte alternatif complet
- [ ] Préférer le texte HTML stylisé avec CSS

#### 1.4.10 Reflow 🟡 AA

- [ ] Le contenu s'adapte à une largeur de 320px sans défilement horizontal
- [ ] Le contenu s'adapte à une hauteur de 256px sans défilement vertical
- [ ] Exception : tableaux de données, images, vidéos

#### 1.4.11 Contraste du Contenu Non Textuel 🟡 AA

- [ ] Les composants d'interface ont un contraste de **3:1**
- [ ] Les graphiques et diagrammes ont un contraste de **3:1**
- [ ] Les états de focus sont visibles avec un contraste de **3:1**

#### 1.4.12 Espacement du Texte 🟡 AA

- [ ] Le contenu reste lisible avec les espacements suivants :
  - Hauteur de ligne : 1.5x la taille de police
  - Espacement des paragraphes : 2x la taille de police
  - Espacement des lettres : 0.12x la taille de police
  - Espacement des mots : 0.16x la taille de police

#### 1.4.13 Contenu au Survol ou au Focus 🟡 AA

- [ ] Le contenu qui apparaît au survol/focus peut être fermé (Esc)
- [ ] Le contenu reste visible tant que le survol/focus est maintenu
- [ ] Le contenu ne masque pas d'autres informations importantes

---

## 2. Utilisable

Les composants de l'interface utilisateur et la navigation doivent être utilisables.

### 2.1 Accessibilité au Clavier

#### 2.1.1 Clavier 🔴 A

- [ ] Toutes les fonctionnalités sont accessibles au clavier
- [ ] Pas de piège au clavier (on peut sortir de tout élément)
- [ ] Les raccourcis clavier sont documentés
- [ ] Tab, Shift+Tab, Entrée, Espace, flèches fonctionnent correctement

**Test :** Débranchez la souris et naviguez sur le site.

#### 2.1.2 Pas de Piège au Clavier 🔴 A

- [ ] L'utilisateur peut quitter tout composant avec le clavier seul
- [ ] Les modales peuvent être fermées avec Esc
- [ ] Les menus déroulants peuvent être fermés avec Esc

#### 2.1.4 Raccourcis Clavier avec Caractère 🟡 AA

- [ ] Les raccourcis d'une seule touche peuvent être désactivés
- [ ] OU peuvent être remappés
- [ ] OU sont actifs uniquement quand le composant a le focus

### 2.2 Délai Suffisant

#### 2.2.1 Réglage du Délai 🔴 A

- [ ] Les limites de temps peuvent être désactivées, ajustées ou prolongées
- [ ] L'utilisateur est averti avant l'expiration
- [ ] Au moins 20 secondes pour prolonger le délai

#### 2.2.2 Mettre en Pause, Arrêter, Masquer 🔴 A

- [ ] Le contenu en mouvement peut être mis en pause/arrêté
- [ ] Les carrousels automatiques ont des contrôles
- [ ] Les animations peuvent être désactivées

### 2.3 Crises et Réactions Physiques

#### 2.3.1 Pas Plus de Trois Flashs 🔴 A

- [ ] Aucun contenu ne clignote plus de 3 fois par seconde
- [ ] Les animations respectent `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2.4 Navigable

#### 2.4.1 Contourner des Blocs 🔴 A

- [ ] Un lien "Aller au contenu principal" est présent
- [ ] Les landmarks ARIA permettent de naviguer entre sections
- [ ] Les titres permettent de naviguer dans le contenu

```html
<a href="#main-content" class="skip-link">Aller au contenu principal</a>
<main id="main-content">...</main>
```

#### 2.4.2 Titre de Page 🔴 A

- [ ] Chaque page a un titre `<title>` unique et descriptif
- [ ] Le titre décrit le sujet ou l'objectif de la page
- [ ] Format recommandé : "Titre de la page - Nom du site"

#### 2.4.3 Parcours du Focus 🔴 A

- [ ] L'ordre de tabulation est logique et prévisible
- [ ] Le focus ne saute pas de manière inattendue
- [ ] Les éléments cachés ne reçoivent pas le focus

#### 2.4.4 Fonction du Lien (En Contexte) 🔴 A

- [ ] Le texte du lien décrit sa destination ou fonction
- [ ] Éviter "Cliquez ici" ou "En savoir plus" sans contexte
- [ ] Les liens identiques mènent à la même destination

**Mauvais :** "Cliquez ici"
**Bon :** "Télécharger le rapport annuel 2023 (PDF, 2 MB)"

#### 2.4.5 Accès Multiples 🟡 AA

- [ ] Plusieurs moyens d'accéder aux pages (menu, recherche, plan du site)
- [ ] Un plan du site est disponible
- [ ] Une fonction de recherche est disponible

#### 2.4.6 En-têtes et Étiquettes 🟡 AA

- [ ] Les titres et labels décrivent le sujet ou l'objectif
- [ ] Les titres sont clairs et descriptifs
- [ ] Les labels de formulaire sont explicites

#### 2.4.7 Focus Visible 🟡 AA

- [ ] L'indicateur de focus est clairement visible
- [ ] Le focus n'est jamais supprimé avec `outline: none` sans alternative
- [ ] Le contraste du focus est suffisant (3:1)

```css
/* Bon exemple */
:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Mauvais exemple */
:focus {
  outline: none; /* Ne jamais faire sans alternative */
}
```

### 2.5 Modalités d'Entrée

#### 2.5.1 Gestes pour le Pointeur 🟡 AA

- [ ] Les fonctionnalités multi-points ont des alternatives simples
- [ ] Les gestes complexes (glisser, pincer) ont des alternatives

#### 2.5.2 Annulation du Pointeur 🟡 AA

- [ ] Les actions au clic se déclenchent au relâchement (mouseup)
- [ ] Les actions peuvent être annulées avant le relâchement
- [ ] Exception : si le déclenchement immédiat est essentiel

#### 2.5.3 Étiquette dans le Nom 🟡 AA

- [ ] Le nom accessible contient le texte visible du composant
- [ ] L'ordre des mots est le même

```html
<!-- Bon -->
<button aria-label="Soumettre le formulaire">Soumettre</button>

<!-- Mauvais -->
<button aria-label="Envoyer">Soumettre</button>
```

#### 2.5.4 Activation par le Mouvement 🟡 AA

- [ ] Les fonctionnalités activées par mouvement ont des alternatives
- [ ] L'activation par mouvement peut être désactivée
- [ ] Exception : si le mouvement est essentiel

---

## 3. Compréhensible

L'information et l'utilisation de l'interface utilisateur doivent être compréhensibles.

### 3.1 Lisible

#### 3.1.1 Langue de la Page 🔴 A

- [ ] La langue principale est définie avec `lang` sur `<html>`
- [ ] Les changements de langue sont indiqués avec `lang`

```html
<html lang="fr">
  <p>Texte en français</p>
  <p lang="en">Text in English</p>
</html>
```

#### 3.1.2 Langue d'un Passage 🟡 AA

- [ ] Les passages dans une autre langue sont marqués avec `lang`

### 3.2 Prévisible

#### 3.2.1 Au Focus 🔴 A

- [ ] Recevoir le focus ne déclenche pas de changement de contexte
- [ ] Pas de soumission automatique de formulaire au focus
- [ ] Pas d'ouverture de nouvelle fenêtre au focus

#### 3.2.2 À la Saisie 🔴 A

- [ ] Modifier un champ ne change pas automatiquement le contexte
- [ ] Les changements de contexte sont prévisibles et contrôlés
- [ ] L'utilisateur est informé avant tout changement automatique

#### 3.2.3 Navigation Cohérente 🟡 AA

- [ ] Les mécanismes de navigation sont cohérents sur toutes les pages
- [ ] Le menu principal est au même endroit
- [ ] Les éléments répétés apparaissent dans le même ordre

#### 3.2.4 Identification Cohérente 🟡 AA

- [ ] Les composants avec la même fonction ont le même nom/label
- [ ] Les icônes identiques ont la même signification
- [ ] La terminologie est cohérente

### 3.3 Assistance à la Saisie

#### 3.3.1 Identification des Erreurs 🔴 A

- [ ] Les erreurs sont identifiées et décrites en texte
- [ ] Les messages d'erreur sont clairs et spécifiques
- [ ] Les champs en erreur sont identifiés programmatiquement

```html
<label for="email">Courriel</label>
<input type="email" id="email" aria-invalid="true" aria-describedby="email-error">
<span id="email-error" class="error">
  Veuillez entrer une adresse courriel valide
</span>
```

#### 3.3.2 Étiquettes ou Instructions 🔴 A

- [ ] Tous les champs ont des labels ou instructions
- [ ] Les formats requis sont indiqués (ex: JJ/MM/AAAA)
- [ ] Les champs obligatoires sont clairement marqués

```html
<label for="date">
  Date de naissance <span aria-label="obligatoire">*</span>
  <span class="hint">Format : JJ/MM/AAAA</span>
</label>
<input type="text" id="date" required aria-required="true">
```

#### 3.3.3 Suggestion après une Erreur 🟡 AA

- [ ] Des suggestions de correction sont fournies
- [ ] Les suggestions sont spécifiques et utiles
- [ ] Exception : si cela compromet la sécurité

#### 3.3.4 Prévention des Erreurs (Juridique, Financier, Données) 🟡 AA

- [ ] Les soumissions importantes peuvent être annulées
- [ ] OU les données sont vérifiées avant soumission
- [ ] OU une confirmation est demandée

---

## 4. Robuste

Le contenu doit être suffisamment robuste pour être interprété de manière fiable par une grande variété d'agents utilisateurs, y compris les technologies d'assistance.

### 4.1 Compatible

#### 4.1.1 Analyse Syntaxique 🔴 A

- [ ] Le HTML est valide (pas d'erreurs critiques)
- [ ] Les balises sont correctement fermées
- [ ] Les IDs sont uniques
- [ ] Les attributs sont correctement formés

**Outils de validation :**
- W3C Markup Validation Service
- HTML5 Validator

#### 4.1.2 Nom, Rôle et Valeur 🔴 A

- [ ] Tous les composants ont un nom accessible
- [ ] Les rôles ARIA sont appropriés
- [ ] Les états et propriétés sont communiqués

```html
<!-- Composant personnalisé accessible -->
<div role="button" 
     tabindex="0" 
     aria-label="Fermer"
     aria-pressed="false">
  <span aria-hidden="true">×</span>
</div>
```

#### 4.1.3 Messages de Statut 🟡 AA

- [ ] Les messages de statut sont annoncés aux lecteurs d'écran
- [ ] Utiliser `role="status"` ou `role="alert"` selon le cas
- [ ] Les changements dynamiques sont communiqués

```html
<!-- Message de succès -->
<div role="status" aria-live="polite">
  Votre formulaire a été soumis avec succès
</div>

<!-- Message d'erreur urgent -->
<div role="alert" aria-live="assertive">
  Erreur : La connexion a échoué
</div>
```

---

## 5. Tests et Outils

### 5.1 Tests Automatisés

- [ ] **axe DevTools** : Extension Chrome/Firefox
- [ ] **WAVE** : Extension navigateur
- [ ] **Lighthouse** : Audit d'accessibilité Chrome
- [ ] **Pa11y** : Tests en ligne de commande
- [ ] **Jest-axe** : Tests unitaires d'accessibilité

### 5.2 Tests Manuels

- [ ] **Navigation au clavier** : Débrancher la souris
- [ ] **Lecteur d'écran** : NVDA (Windows), JAWS, VoiceOver (Mac/iOS)
- [ ] **Zoom** : Tester à 200% de zoom
- [ ] **Contraste** : Vérifier avec des outils de contraste
- [ ] **Désactivation CSS** : Vérifier la structure HTML
- [ ] **Désactivation JavaScript** : Vérifier les fonctionnalités de base

### 5.3 Tests avec Utilisateurs

- [ ] Tests avec des personnes en situation de handicap
- [ ] Tests avec différentes technologies d'assistance
- [ ] Recueillir les retours et itérer

---

## 6. Checklist Rapide par Type de Contenu

### Formulaires

- [ ] Tous les champs ont des `<label>` associés
- [ ] Les champs obligatoires sont indiqués
- [ ] Les formats requis sont spécifiés
- [ ] Les erreurs sont identifiées et décrites
- [ ] La validation est accessible
- [ ] Les groupes de champs utilisent `<fieldset>` et `<legend>`
- [ ] L'ordre de tabulation est logique

### Images

- [ ] Toutes les images ont un attribut `alt`
- [ ] Les images décoratives ont `alt=""`
- [ ] Les images complexes ont des descriptions détaillées
- [ ] Les images de texte sont évitées (sauf logos)

### Navigation

- [ ] Lien "Aller au contenu principal"
- [ ] Navigation cohérente sur toutes les pages
- [ ] Fil d'Ariane si applicable
- [ ] Menu accessible au clavier
- [ ] Indicateur de page active

### Tableaux

- [ ] Utilisation de `<table>` pour les données tabulaires
- [ ] En-têtes avec `<th>` et attribut `scope`
- [ ] Légende avec `<caption>` si nécessaire
- [ ] Pas de tableaux pour la mise en page

### Multimédia

- [ ] Sous-titres pour les vidéos
- [ ] Transcriptions pour l'audio
- [ ] Audio-description si nécessaire
- [ ] Contrôles accessibles au clavier
- [ ] Pas de lecture automatique

---

## 7. Ressources et Références

### Standards et Guidelines

- **WCAG 2.1** : https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices** : https://www.w3.org/WAI/ARIA/apg/
- **Section 508** : https://www.section508.gov/

### Outils

- **axe DevTools** : https://www.deque.com/axe/devtools/
- **WAVE** : https://wave.webaim.org/
- **Contrast Checker** : https://webaim.org/resources/contrastchecker/
- **Color Oracle** : Simulateur de daltonisme

### Formation

- **WebAIM** : https://webaim.org/
- **A11ycasts** : Vidéos sur l'accessibilité
- **Inclusive Components** : https://inclusive-components.design/

---

## Notes d'Utilisation

1. **Priorisez le niveau AA** pour la plupart des projets
2. **Testez tôt et souvent** pendant le développement
3. **Impliquez des utilisateurs** avec des handicaps dans les tests
4. **Documentez les décisions** d'accessibilité
5. **Formez l'équipe** aux bonnes pratiques
6. **Intégrez l'accessibilité** dès la conception
7. **Automatisez** les tests quand possible
8. **Validez manuellement** les aspects critiques