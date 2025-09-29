const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

// Configure SendGrid avec la clé API depuis l'environnement
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Affichage du formulaire de contact
router.get('/', (req, res) => {
  res.render('contact'); // contact.ejs doit exister
});

// Traitement du formulaire de contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Vérification que tous les champs sont remplis
  if (!name || !email || !message) {
    return res.status(400).render('contact', { error: 'Tous les champs sont requis !' });
  }

  const msg = {
    to: process.env.FROM_EMAIL,       // tu reçois le message ici
    from: process.env.FROM_EMAIL,     // ton expéditeur vérifié sur SendGrid
    subject: `Nouveau message de ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Nom :</strong> ${name}</p>
           <p><strong>Email :</strong> ${email}</p>
           <p><strong>Message :</strong><br>${message}</p>`
  };

  try {
    await sgMail.send(msg);
    res.render('contact', { success: 'Merci pour votre message !' });
  } catch (err) {
    console.error('Erreur SendGrid:', err);
    res.status(500).render('contact', { error: 'Erreur lors de l’envoi du message. Réessayez plus tard.' });
  }
});

module.exports = router;
