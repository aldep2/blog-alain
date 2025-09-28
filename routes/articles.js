const express = require('express');
const router = express.Router();
const pool = require('../db'); // connexion PostgreSQL
const ADMIN_PASSWORD = 'admin123';

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
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
    res.render('index', { articles: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Formulaire d’ajout d’un nouvel article
router.get('/new', requirePassword, (req, res) => {
  res.render('edit', { article: { id: '', titre: '', contenu: '' }, nouveau: true });
});

// Traitement du formulaire d’ajout
router.post('/new', requirePassword, async (req, res) => {
  try {
    const { titre, contenu } = req.body;
    const result = await pool.query(
      'INSERT INTO articles (titre, contenu, created_at) VALUES ($1, $2, $3) RETURNING id',
      [titre, contenu, new Date()]
    );
    res.redirect('/articles/' + result.rows[0].id);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Détail d’un article
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [req.params.id]);
    if (!result.rows[0]) return res.status(404).send('Article non trouvé');
    res.render('article', { article: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Formulaire d’édition d’un article
router.get('/:id/edit', requirePassword, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [req.params.id]);
    if (!result.rows[0]) return res.status(404).send('Article non trouvé');
    res.render('edit', { article: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Traitement du formulaire d’édition
router.post('/:id/edit', requirePassword, async (req, res) => {
  try {
    const { titre, contenu } = req.body;
    await pool.query('UPDATE articles SET titre=$1, contenu=$2 WHERE id=$3', [titre, contenu, req.params.id]);
    res.redirect('/articles/' + req.params.id);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
