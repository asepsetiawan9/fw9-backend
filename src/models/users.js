const db = require('../helpers/db.js');

exports.getAllUsers = (cb) => {
  db.query('SELECT * FROM users', (err, res) => {
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};