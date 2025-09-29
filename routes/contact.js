const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

// Configure SendGrid avec ta clé API
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', (req, res) => {
  res.render('contact');
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('Tous les champs sont requis.');
  }

  const msg = {
    to: process.env.CONTACT_EMAIL, // ton adresse de réception
    from: process.env.CONTACT_EMAIL, // doit être validée dans SendGrid
    subject: `Nouveau message de ${name}`,
    text: `
      De: ${name} (${email})
      Message:
      ${message}
    `,
  };

  try {
    await sgMail.send(msg);
    res.send('Votre message a été envoyé avec succès ✅');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l’envoi du message ❌');
  }
});

module.exports = router;
