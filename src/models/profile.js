const db = require('../helpers/db.js');

exports.detailProfile = (id, cb) => {
  const quer = 'SELECT fullname, picture, phone, id_user, balance, income, expand FROM profile WHERE id=$1';
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
  let value = [id];

  const filter = {};
  const obj = {
    picture,
    fullname: data.fullname,
    balance: data.balance,
    phone: data.phone,
    income: data.income,
    expand: data.expand,
  };
  for(let x in obj){
    if(obj[x]!==null){
      filter[x] = obj[x];
      value.push(obj[x]);
    }
  }

  const key = Object.keys(filter);
  const finalRes = key.map((o, ind) => `${o}=$${ind+2}`);
  //console.log(finalRes);
  const quer = `UPDATE profile SET ${finalRes} WHERE id=$1 RETURNING *`;
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

