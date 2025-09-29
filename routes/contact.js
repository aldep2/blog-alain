const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('Nom, email et message requis');
  }

  const msg = {
    to: process.env.CONTACT_EMAIL, // destinataire
    from: process.env.EMAIL_USER,  // expéditeur
    subject: `Nouveau message de ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Nom :</strong> ${name}</p>
           <p><strong>Email :</strong> ${email}</p>
           <p><strong>Message :</strong><br>${message}</p>`
  };

  try {
    await sgMail.send(msg);
    res.render('contact', { success: 'Message envoyé avec succès !' });
  } catch (err) {
    console.error('Erreur SendGrid:', err);
    res.render('contact', { error: 'Erreur lors de l\'envoi du message.' });
  }
});

module.exports = router;
