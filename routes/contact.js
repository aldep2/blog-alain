const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Transporteur SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // adapte selon ton fournisseur d'email
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // ton email
    pass: process.env.EMAIL_PASS  // App Password ou mot de passe si pas de 2FA
  }
});

// Affichage du formulaire (GET)
router.get('/', (req, res) => {
  res.render('contact'); // rend contact.ejs
});

// Envoi du message (POST)
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.render('contact', { errorMessage: 'Tous les champs sont requis.' });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,  // ton email de réception
      subject: `Message depuis le blog de ${name}`,
      text: message
    });

    res.render('contact', { successMessage: 'Merci pour votre message !' });
  } catch (err) {
    console.error(err);
    res.render('contact', { errorMessage: 'Erreur lors de l’envoi du mail.' });
  }
});

module.exports = router;
