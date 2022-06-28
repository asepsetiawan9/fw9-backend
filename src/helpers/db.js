const {Pool} = require('pg');

// eslint-disable-next-line no-undef
const {DATABASE_URL: connectionString} = process.env;

const db = new Pool({
  connectionString
});

module.exports = db;