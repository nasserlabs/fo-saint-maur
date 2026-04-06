# Force Ouvrière — Saint-Maur-des-Fossés

Site web statique pour la section syndicale **Force Ouvrière de Saint-Maur-des-Fossés**.  
Prêt pour un déploiement sur **GitHub Pages** sans aucune dépendance.

---

## 📁 Structure du projet

```
/
├── index.html          → Page d'accueil
├── presentation.html   → Qui sommes-nous, valeurs, missions
├── adhesion.html       → Adhésion via HelloAsso
├── actions.html        → Actions syndicales (données JS)
├── contact.html        → Formulaire de contact
├── css/
│   └── styles.css      → Feuille de styles globale
├── js/
│   └── script.js       → JavaScript (navbar, animations, actions)
└── assets/
    ├── images/         → Vos images (remplacez les placeholders)
    └── icons/          → Vos icônes supplémentaires
```

---

## 🚀 Déploiement sur GitHub Pages

1. Créez un dépôt GitHub (public ou privé avec GitHub Pages activé).
2. Poussez l'intégralité du dossier à la **racine** du dépôt.
3. Dans **Settings → Pages**, choisissez la branche `main` et le dossier `/root`.
4. Votre site sera accessible à `https://votre-nom.github.io/nom-du-repo/`.

---

## ✏️ Personnalisations essentielles

### 1. Lien HelloAsso (adhesion.html)
Cherchez ce commentaire dans `adhesion.html` :
```html
href="https://www.helloasso.com/associations/VOTRE-LIEN-ICI"
```
Remplacez l'URL par votre vrai lien HelloAsso.

### 2. Adresse email de contact
Remplacez toutes les occurrences de `contact@fo-saint-maur.fr` par votre email réel.

### 3. Numéro de téléphone
Remplacez `01 00 00 00 00` par votre numéro réel.

### 4. Ajouter / modifier des actions (script.js)
Éditez le tableau `ACTIONS` au début de `js/script.js` :
```js
const ACTIONS = [
  {
    id: 9,                          // Numéro unique
    title: "Titre de l'action",
    desc: "Description courte.",
    status: "en cours",             // "en cours" | "à venir" | "terminée"
    date: "Date d'affichage",
  },
  // ...
];
```
Le JS se charge automatiquement de trier et d'afficher les actions dans les bonnes catégories.

---

## 🎨 Design

- **Police d'affichage :** Playfair Display (Google Fonts)
- **Police de texte :** DM Sans (Google Fonts)
- **Couleurs FO :** Rouge `#E30613`, Blanc, Noir/Gris foncé
- **Style :** Minimaliste, Apple-inspired, animations au scroll
- **Responsive :** Mobile-first, breakpoints à 980px et 640px

---

## 📦 Technologies

- HTML5 sémantique + attributs ARIA
- CSS3 (variables, grid, flexbox, animations)
- JavaScript ES6+ Vanilla (aucun framework)

---

## 📝 Licence

Usage libre pour la section syndicale FO Saint-Maur-des-Fossés.
