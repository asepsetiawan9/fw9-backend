const db = require('../helpers/db.js');

exports.detailProfile = (id, cb) => {
  const quer = 'SELECT fullname, picture, phone, id_user, balance, income, expanse FROM profile WHERE id=$1';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.createProfile = (picture, data, cb)=>{
  const quer = 'INSERT INTO profile(fullname, picture, phone, id_user, balance, income, expand) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const value = [data.fullname, picture, data.phone, data.id_user, data.balance, data.income, data.expand];
 
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(err, res.rows);
  });
};

exports.updateProfile = (id, picture, data, cb)=>{

  console.log(picture);
  const quer = 'UPDATE profile SET fullname=$1, picture=$2, phone=$3, id_user=$4, balance=$5, income=$6, expand=$7 WHERE id=$8 RETURNING *';
  const value = [data.fullname, picture, data.phone, data.id_user, data.balance, data.income, data.expand, id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(err, res.rows);
  }) ;
};

exports.deleteProfile = (id, cb) => {
  const quer = 'DELETE FROM profile WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(err, res.rows);
  });
};

exports.getAllProfile = (cb) => {
  db.query('SELECT * FROM profile ORDER BY id ASC', (err, res) => {
    if(err) {
      throw err;
    }
    cb(err, res.rows);
  });
};

