const db = require('../helpers/db.js');

exports.getTypeTrans = (cb) => {
  db.query('SELECT * FROM transaction_type ORDER BY id ASC', (err, res) => {
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.detailTypeTrans = (id, cb) => {
  const quer = 'SELECT name, description  FROM transaction_type WHERE id=$1';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.createTypeTrans = (data, cb)=>{
  const quer = 'INSERT INTO transaction_type(name, description) VALUES ($1, $2) RETURNING *';
  const value = [data.name, data.description];
  db.query(quer, value, (err, res)=>{
    console.log(value);
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.updateTypeTrans = (id, data, cb)=>{
  const quer = 'UPDATE transaction_type SET name=$1, description=$2 WHERE id=$3 RETURNING *';
  const value = [data.name, data.description, id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(res.rows);
  }) ;
};

exports.deleteTypeTrans = (id, cb) => {
  const quer = 'DELETE FROM transaction_type WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};