const db = require('../helpers/db.js');
const {DATA_LIMIT} = process.env;


exports.getAllUsers = (keyword, limit=Number(DATA_LIMIT), offset=0, cb) => {
  db.query(`SELECT * FROM users WHERE email LIKE \'${keyword}%\' ORDER BY id ASC LIMIT $1 OFFSET $2`, [limit, offset], (err, res) => {
    if(err) {
      throw err;
    }
    cb(err, res.rows);
  });
};

exports.countAllUsers = (keyword, cb)=> {
  db.query(`SELECT * FROM users WHERE email LIKE \'%${keyword}%\' `, (err, res)=>{
    cb(err, res.rowCount);
  });
};

exports.createUser = (data, cb)=>{
  const quer = 'INSERT INTO users(username, email, password, pin) VALUES ($1, $2, $3, $4) RETURNING *';
  const value = [data.username, data.email, data.password, data.pin];
  db.query(quer, value, (err, res)=>{
    if(res) {
      cb(err, res.rows);
    }else{
      cb(err);
    }
    cb(res.rows);
  });
};

exports.updateUser = (id, data, cb)=>{
  const quer = 'UPDATE users SET username=$1, email=$2, password=$3, pin=$4 WHERE id=$5 RETURNING *';
  const value = [data.username, data.email, data.password, data.pin, id];
  db.query(quer, value, (err, res)=>{
    if(res) {
      cb(err, res.rows);
    }else{
      cb(err);
    }
    cb(res.rows);
  }) ;
};

exports.deleteUser = (id, cb) => {
  const quer = 'DELETE FROM users WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(quer, value, (err, res)=>{

    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.detailUser = (id, cb) => {
  const quer = 'SELECT username, email, password, pin FROM users WHERE id=$1';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};