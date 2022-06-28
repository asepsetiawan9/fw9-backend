const db = require('../helpers/db.js');

exports.getALLUsers = (cb)=>{
  db.query('SELECT * FROM users', (err, res)=>{
    cb(res.rows);
  });
};