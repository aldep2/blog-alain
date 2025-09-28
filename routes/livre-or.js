const express = require('express');
const router = express.Router();
const pool = require('../db'); // connexion PostgreSQL

// Affichage du livre d'or
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM livre_or ORDER BY created_at DESC');
  res.render('livre-or', { messages: result.rows });
});

// Ajout d'un nouveau message
router.post('/', async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).send('Nom et message requis');
  await pool.query(
    'INSERT INTO livre_or (name, message) VALUES ($1, $2)',
    [name, message]
  );
  res.redirect('/livre-or');
});

module.exports = router;
