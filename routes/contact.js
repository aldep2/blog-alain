const express = require('express');
const router = express.Router();
const pool = require('./db'); // connexion PostgreSQL

// Affichage du formulaire de contact
router.get('/', (req, res) => {
  res.render('contact');
});

// Traitement du formulaire de contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Vérification des champs
  if (!name || !email || !message) {
    return res.status(400).send('Tous les champs sont requis !');
  }

  try {
    // Insertion dans la table contact
    await pool.query(
      'INSERT INTO contact (name, email, message, created_at) VALUES ($1, $2, $3, NOW())',
      [name, email, message]
    );

    // Message de succès
    res.send('Merci pour votre message ! Il a bien été enregistré.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur, impossible d’enregistrer le message.');
  }
});

module.exports = router;
