const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://blog_alain_db_user:EYDjowZypWluKVDtU1M5Kd4I7x09OChI@dpg-d3ckulidbo4c73e982mg-a.oregon-postgres.render.com/blog_alain_db',
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
