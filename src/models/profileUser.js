const db = require('../helpers/db');


exports.userById = (id, cb) => {
  const quer = 'SELECT * FROM users WHERE id=$1';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    cb(err, res);
  });
};

exports.detailProfile = (id_user, cb) => {
  console.log(id_user);
  const quer = 'SELECT profile.*, users.email, users.username, users.pin FROM profile INNER JOIN users ON users.id = profile.id_user  WHERE id_user=$1';
  const value = [id_user];
  db.query(quer, value, (err, res)=>{
    console.log(quer);
    cb(err, res.rows);
  });
};

exports.getProfileById = (id_user, cb) => {
  //console.log(id_user);
  const quer = 'SELECT profile.*, users.email, users.username, users.pin FROM profile INNER JOIN users ON users.id = profile.id_user  WHERE id_user=$1';
  const value = [id_user];
  db.query(quer, value, (err, res)=>{
    cb(err, res.rows);
  });
};

exports.updatePhone = (id, data, cb)=>{
  let value = [id];
  // console.log(value);

  const filter = {};
  const obj = {
    phone: data.phone
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
  // console.log(finalRes);

  const quer = `UPDATE profile SET ${finalRes} WHERE id_user=$1 RETURNING *`;
  db.query(quer, value, (err, res)=>{
    //console.log(res);
    cb(err, res);
  }) ;
};


exports.updateProfile = (id_user, picture, data, cb)=>{
  let value = [id_user];
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
      if(obj[x]!==undefined){
        filter[x] = obj[x];
        value.push(obj[x]);
      }
    }
  }

  const key = Object.keys(filter);
  const finalRes = key.map((o, ind) => `${o}=$${ind+2}`);
  //console.log(finalRes);
  const quer = `UPDATE profile SET ${finalRes} WHERE id_user=$1 RETURNING *`;
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(err, res.rows);
  }) ;
};

exports.updatePassword = (id, data, cb)=>{
  let value = [id];

  const filter = {};
  const obj = {
    password: data.password
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
  //console.log(finalRes);
  const quer = `UPDATE users SET ${finalRes} WHERE id=$1 RETURNING *`;
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(err, res.rows);
  }) ;
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
  //console.log(finalRes);
  const quer = `UPDATE users SET ${finalRes} WHERE id=$1 RETURNING *`;
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(err, res.rows);
  }) ;
};

exports.updatePhone = (id_user, data, cb)=>{
  let value = [id_user];

  const filter = {};
  const obj = {
    phone: data.phone
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
  const quer = `UPDATE profile SET ${finalRes} WHERE id_user=$1 RETURNING *`;
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(err, res.rows);
  }) ;
};
