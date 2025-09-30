const express = require('express');
const app = express();
const PORT = process.env.PORT || 3060;
const path = require('path');

// Routes
const articlesRouter = require('./routes/articles');
const contactRouter = require('./routes/contact');
const livreOrRouter = require('./routes/livre-or');
const contactAdminRouter = require('./routes/contact-admin');
app.use('/admin/contact', contactAdminRouter);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// Vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/articles', articlesRouter);
app.use('/contact', contactRouter);
app.use('/livre-or', livreOrRouter);

// Accueil redirige vers les articles
app.get('/', (req, res) => {
  res.redirect('/articles');
});

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
