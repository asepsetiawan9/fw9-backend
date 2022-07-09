const db = require('../helpers/db.js');

exports.getAllTrans = (cb) => {
  db.query('SELECT * FROM transaction ORDER BY id ASC', (err, res) => {
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.detailTrans = (id, cb) => {
  const quer = 'SELECT amount, time_date, note, recipient_id, sender_id, id_profile, typetrans_id FROM transaction WHERE id=$1';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.createTrans = (data, cb)=>{
  const quer = 'INSERT INTO transaction(amount, time_date, note, recipient_id, sender_id, profile_id, typetrans_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const value = [data.amount, data.time_date, data.note, data.recipient_id, data.sender_id, data.profile_id, data.typetrans_id];
  db.query(quer, value, (err, res)=>{
    //console.log(value);
    if(err) {
      //throw err;
      console.log(err);
    }
    cb(err, res.rows);
  });
};

exports.updateTrans = (id, data, cb)=>{
  const quer = 'UPDATE transaction SET amount=$1, time_date=$2, note=$3, id_user=$4, id_profile=$5, typetrans_id=$6 WHERE id=$7 RETURNING *';
  const value = [data.amount, data.time_date, data.note, data.id_user, data.id_profile, data.typetrans_id, id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(res.rows);
  }) ;
};

exports.deleteTrans = (id, cb) => {
  const quer = 'DELETE FROM transaction WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};