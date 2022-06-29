const db = require('../helpers/db.js');

exports.detailProfile = (id, cb) => {
  const quer = 'SELECT fullname, picture, phone, id_user, balance, income, expanse FROM profile WHERE id=$1';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    //console.log(value);
    //console.log(res);
    // if(err){
    //console.log(err);
    // }
    cb(res.rows);
  });
};