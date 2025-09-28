const fs = require('fs');
const pool = require('./routes/db');

const articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));

async function migrate() {
  for (const a of articles) {
    await pool.query(
      'INSERT INTO articles (titre, contenu, created_at) VALUES ($1, $2, $3)',
      [a.titre, a.contenu, a.created_at || new Date()]
    );
  }
  console.log('Migration terminée !');
  process.exit(0); // termine le script
}

migrate();
