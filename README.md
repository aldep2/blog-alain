# Blog dynamique Node.js/Express

Ce projet est un blog dynamique avec gestion d’articles, livre d’or et page de contact.

## Fonctionnalités
- Ajout, modification d’articles (interface admin protégée par mot de passe)
- Livre d’or avec sauvegarde des messages
- Page de contact
- Mise en page moderne (EJS, CSS)
- Navigation entre toutes les pages

## Structure du projet
- `app.js` : point d’entrée du serveur Express
- `routes/` : routes Express (articles)
- `views/` : templates EJS
- `public/` : fichiers statiques (CSS, images)
- `articles.json` : stockage des articles
- `livre-or.json` : stockage des messages du livre d’or
- `.github/copilot-instructions.md` : instructions pour agents IA

## Installation
```bash
npm install
```

## Lancement en local
```bash
node app.js
```
Accédez à [http://localhost:3060](http://localhost:3060)

## Déploiement sur Alwaysdata
1. Créez un compte sur https://www.alwaysdata.com/
2. Uploadez tous les fichiers dans le dossier `/www/` via l’interface ou SFTP
3. Créez une application Node.js et indiquez le chemin vers `app.js`
4. Installez les dépendances (`npm install`)
5. Démarrez l’application

## Accès admin
- Pour modifier ou ajouter un article, un mot de passe est demandé (modifiable dans `routes/articles.js`)

## Personnalisation
- Modifiez les fichiers EJS dans `views/` pour adapter le design
- Changez le texte de présentation dans `views/index.ejs`

## Auteur
Alain

---
Pour toute question ou amélioration, contactez-moi via la page de contact du blog.
