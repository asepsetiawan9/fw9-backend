const db = require('../helpers/db');

exports.userById = (id, cb) => {
  const quer = 'SELECT * FROM users WHERE id=$1';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    cb(err, res);
  });
};

exports.detailProfile = (id_user, cb) => {
  //console.log(id_user);
  const quer = 'SELECT * FROM profile WHERE id_user=$1';
  const value = [id_user];
  db.query(quer, value, (err, res)=>{
    //console.log(res);
    cb(err, res.rows);
  });
};

exports.transHistory = (searchBy, keyword, limit=Number(DATA_LIMIT), offset=0, orderBy, sortType, sender_id, cb) => {
  console.log(sender_id);
  const quer = 'SELECT * FROM transaction WHERE sender_id=$1';
  const value = [sender_id];
  db.query(quer, value, (err, res)=>{
    cb(err, res.rows);
  });
};