# Instructions pour agents IA – Blog dynamique Node.js/Express

Ce projet est un blog dynamique utilisant Node.js, Express et EJS. Suivez ces conventions pour être immédiatement productif :

## Architecture
- Backend : Node.js + Express (routes REST pour articles)
- Frontend : EJS (rendu côté serveur)
- Structure typique :
  - `/routes` : routes Express (ex : articles.js)
  - `/views` : templates EJS (ex : index.ejs, article.ejs)
  - `/public` : fichiers statiques (CSS, JS, images)
  - `/models` : schémas de données (ex : Article.js)
  - `app.js` : point d’entrée principal

## Workflows essentiels
- Démarrage : `npm install` puis `npm start` (ou `node app.js`)
- Développement : modifier les routes, modèles et vues selon les besoins
- Ajout d’un article : POST `/articles/new` (formulaire ou API)
- Modification/Suppression : routes `/articles/:id/edit` et `/articles/:id/delete`
- Tests : si présents, lancer `npm test`

## Conventions spécifiques
- Utiliser EJS pour tout le rendu HTML
- Les articles sont stockés en base (MongoDB recommandé, sinon fichier JSON pour démo)
- Respecter la structure des routes REST : `/articles`, `/articles/:id`, etc.
- Les styles sont dans `/public/styles.css` (ou similaire)
- Les messages d’erreur sont affichés dans les vues EJS

## Dépendances principales
- express
- ejs
- mongoose (si MongoDB)

## Exemples de fichiers clés
- `app.js` : configuration Express, routes, middleware
- `routes/articles.js` : logique CRUD pour les articles
- `models/Article.js` : schéma de l’article
- `views/index.ejs` : liste des articles
- `views/article.ejs` : détail d’un article

## Démarrage rapide
```bash
npm install
npm start
```
Accéder à `http://localhost:3000` pour voir le blog.

## Documentation
- Voir le README.md pour les instructions détaillées
- Mettre à jour ce fichier si des conventions changent

---
Adaptez ces instructions si la structure ou les outils évoluent. Privilégiez la clarté et la cohérence avec les exemples fournis.