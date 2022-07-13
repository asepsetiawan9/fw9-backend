const db = require('../helpers/db.js');

exports.register = (data, cb)=>{
  const quer = 'INSERT INTO users(username, email, password, pin) VALUES ($1, $2, $3, $4) RETURNING *';
  const value = [data.username, data.email, data.password, data.pin];
  db.query(quer, value, (err, res)=>{
    if (res) {
      cb(err, res.rows);
    }else{
      cb(err);
    }
  });
};

exports.getUserByEmail = (email, cb) => {
  const quer = 'SELECT * FROM users WHERE email=$1';
  const value = [email];
  db.query(quer, value, (err, res)=>{
    cb(err, res);
  });
};

exports.updatePin = (id, data, cb)=>{
  let value = [id];

  const filter = {};
  const obj = {
    pin: data.pin
  };

  for(let x in obj){
    if(obj[x]!==null){
      if(obj[x]!==undefined){
        filter[x] = obj[x];
        value.push(obj[x]);
      }
      
    }
  }
  
  const key = Object.keys(filter);
  const finalRes = key.map((o, ind) => `${o}=$${ind+2}`);

  const quer = `UPDATE users SET ${finalRes} WHERE id=$1 RETURNING *`;
  db.query(quer, value, (err, res)=>{
    cb(err, res);
  }) ;
};

exports.createProfile = (id_user, cb)=>{
  console.log(id_user);
  const quer = 'INSERT INTO profile(id_user) VALUES ($1) RETURNING *';
  const value = [id_user];
  db.query(quer, value, (err, res)=>{
    if (res) {
      cb(err, res.rows);
    }else{
      cb(err);
    }
  });
};
