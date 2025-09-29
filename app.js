
const express = require('express');
const app = express();
const PORT = 3060;
const fs = require('fs');
const path = require('path');
const livreOrPath = path.join(__dirname, 'livre-or.json');
const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);




function readLivreOrMessages() {
  try {
    return JSON.parse(fs.readFileSync(livreOrPath, 'utf8'));
  } catch (e) {
    return [];
  }
}

function writeLivreOrMessages(messages) {
  fs.writeFileSync(livreOrPath, JSON.stringify(messages, null, 2), 'utf8');
}


// Configuration du moteur de vues EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware de base
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/img', express.static(__dirname + '/img'));

// Route page de contact
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  // Ici, on pourrait envoyer un email ou enregistrer le message
  res.send('Merci pour votre message !');
});

// Route livre d’or
app.get('/livre-or', (req, res) => {
  const messages = readLivreOrMessages();
  res.render('livre-or', { messages });
});

app.post('/livre-or', (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.redirect('/livre-or');
  }
  const auteur = req.body.auteur;
  const message = req.body.message;
  if (auteur && message) {
    const messages = readLivreOrMessages();
    messages.push({ auteur, message });
    writeLivreOrMessages(messages);
  }
  res.redirect('/livre-or');
});

// Route d'accueil redirige vers la liste des articles
app.get('/', (req, res) => {
  res.redirect('/articles');
});

// Intégration des routes d'articles
const articlesRouter = require('./routes/articles');
app.use('/articles', articlesRouter);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
