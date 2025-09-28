
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ADMIN_PASSWORD = 'admin123';
const articlesPath = path.join(__dirname, '../articles.json');

function readArticles() {
  try {
    return JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
  } catch (e) {
    return [];
  }
}

function writeArticles(articles) {
  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
}

function requirePassword(req, res, next) {
  if (req.method === 'GET' && !req.query.pwd) {
    return res.send('<form method="get"><input type="password" name="pwd" placeholder="Mot de passe" required><button type="submit">Accéder</button></form>');
  }
  if (req.method === 'GET' && req.query.pwd !== ADMIN_PASSWORD) {
    return res.send('<form method="get"><input type="password" name="pwd" placeholder="Mot de passe" required><span style="color:red;"> Mot de passe incorrect</span><button type="submit">Accéder</button></form>');
  }
  if (req.method === 'POST' && req.body.pwd !== ADMIN_PASSWORD) {
    return res.status(403).send('Accès refusé : mot de passe incorrect');
  }
  next();
}

// Liste des articles
router.get('/', (req, res) => {
  const articles = readArticles();
  res.render('index', { articles });
});


// Formulaire d’ajout d’un nouvel article
router.get('/new', requirePassword, (req, res) => {
  res.render('edit', { article: { id: '', titre: '', contenu: '' }, nouveau: true });
});

// Traitement du formulaire d’ajout
router.post('/new', requirePassword, (req, res) => {
  const articles = readArticles();
  const newId = articles.length ? Math.max(...articles.map(a => a.id)) + 1 : 1;
  const article = {
    id: newId,
    titre: req.body.titre,
    contenu: req.body.contenu
  };
  articles.push(article);
  writeArticles(articles);
  res.redirect('/articles/' + article.id);
});

// Détail d’un article
router.get('/:id', (req, res) => {
  const articles = readArticles();
  const article = articles.find(a => a.id == req.params.id);
  if (!article) {
    return res.status(404).send('Article non trouvé');
  }
  res.render('article', { article });
});

// Formulaire d’édition d’un article
router.get('/:id/edit', requirePassword, (req, res) => {
  const articles = readArticles();
  const article = articles.find(a => a.id == req.params.id);
  if (!article) {
    return res.status(404).send('Article non trouvé');
  }
  res.render('edit', { article });
});

// Traitement du formulaire d’édition
router.post('/:id/edit', requirePassword, (req, res) => {
  const articles = readArticles();
  const article = articles.find(a => a.id == req.params.id);
  if (!article) {
    return res.status(404).send('Article non trouvé');
  }
  article.titre = req.body.titre;
  article.contenu = req.body.contenu;
  writeArticles(articles);
  res.redirect('/articles/' + article.id);
});

module.exports = router;
