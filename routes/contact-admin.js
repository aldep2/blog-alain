const express = require('express');
const router = express.Router();
const pool = require('./db'); // connexion PostgreSQL

// Middleware simple pour protéger l'accès
function requirePassword(req, res, next) {
  if (req.method === 'GET' && !req.query.pwd) {
    return res.send('<form method="get"><input type="password" name="pwd" placeholder="Mot de passe" required><button type="submit">Accéder</button></form>');
  }
  if (req.query.pwd !== 'admin123') { // change le mot de passe si nécessaire
    return res.send('<form method="get"><input type="password" name="pwd" placeholder="Mot de passe" required><span style="color:red;">Mot de passe incorrect</span><button type="submit">Accéder</button></form>');
  }
  next();
}

// Affiche les messages contact
router.get('/', requirePassword, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact ORDER BY created_at DESC');
    res.render('contact-admin', { messages: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
