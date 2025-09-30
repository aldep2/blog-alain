const express = require('express');
const router = express.Router();
const pool = require('./db'); // Connexion PostgreSQL
const ADMIN_PASSWORD = 'admin123'; // à changer si besoin

// Middleware mot de passe pour l’admin
function requirePassword(req, res, next) {
  if (req.query.pwd !== ADMIN_PASSWORD) {
    return res.send('<form method="get"><input type="password" name="pwd" placeholder="Mot de passe" required><button type="submit">Accéder</button></form>');
  }
  next();
}

// Page contact pour les utilisateurs
router.get('/', (req, res) => {
  res.render('contact');
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).send('Tous les champs sont requis');
  }
  await pool.query(
    'INSERT INTO contact (name, email, message, created_at) VALUES ($1, $2, $3, $4)',
    [name, email, message, new Date()]
  );
  res.send('Merci pour votre message !');
});

// Page admin pour voir tous les messages
router.get('/admin', requirePassword, async (req, res) => {
  const result = await pool.query('SELECT * FROM contact ORDER BY created_at DESC');
  res.render('contact-admin', { messages: result.rows });
});

module.exports = router;
