const db = require('../helpers/db.js');
const {DATA_LIMIT} = process.env;

exports.getAllTrans = (cb) => {
  db.query('SELECT * FROM transaction ORDER BY id ASC', (err, res) => {
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.detailTrans = (id, cb) => {
  const quer = 'SELECT * FROM transaction WHERE id=$1';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
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

exports.topUp=(id_user, data, cb)=>{
  db.query('BEGIN', err =>{
    if(err){
      cb(err);
    }else{
      const queryUser = 'SELECT balance FROM profile WHERE id_user=$1';
      const valUser = [id_user];
      db.query(queryUser,valUser,(err,res)=>{
        if(err){
          cb(err);
        }else{
          const resBalance = parseInt(res.rows[0].balance);
          const balance = data.balance;
          // console.log(balance + resBalance);
          const increasBalance = resBalance + balance;
          let value = [id_user];
          const filter = {};
          const obj = {
            id_user,
            balance: increasBalance
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
            const sender_id = res.rows[0].id_user;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            const date = mm + '-' + dd + '-' + yyyy;
            // console.log(balance);

            if(err){
              cb(err);
            }else{
              let value = [];
              const filter = {};
              const obj = {
                amount: balance,
                sender_id: sender_id,
                recipient_id: sender_id,
                time_date: date,
                note: 'TopUp'
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
              const finalResTrans = key.map((o, ind) => `$${ind+1}`);
              const quer = `INSERT INTO transaction (${key}) VALUES (${finalResTrans}) RETURNING *`;
              // console.log(value);
              db.query(quer, value, (err, res)=>{
                if(err) {
                  throw err;
                }
                else{
                  cb(err,res);
                  db.query('COMMIT',err=>{
                    if(err){
                      console.log(err);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.transHistory = (search, searchBy, limit=Number(DATA_LIMIT), offset=0, orderBy, sortType, sender_id, cb) => {
  // console.log(sender_id);
  const quer = `SELECT * FROM transaction where sender_id = $1 and ${searchBy}::text like '%${search}%' ORDER BY ${orderBy} ${sortType} LIMIT $2 OFFSET $3`;
  const value = [sender_id, limit, offset];
  db.query(quer, value, (err, res)=>{
    cb(err, res.rows);
  });
};

exports.countAllTrans = (searchBy, search, sender_id, cb)=> {
  db.query(`SELECT * FROM transaction where sender_id = ${sender_id} and ${searchBy}::text like '%${search}%' `, (err, res)=>{
    
    if(err){
      console.log(err);
    }
    cb(err, res.rowCount);
    
  });
};

exports.transfer=(id_user, data, cb)=>{
  db.query('BEGIN', err =>{
    if(err){
      cb(err);
    }else{
      let value = [];
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      const date = mm + '-' + dd + '-' + yyyy;
      const filter = {};
      const obj = {
        amount: data.amount,
        sender_id: id_user,
        recipient_id: data.recipient_id,
        time_date: date,
        note: data.note
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
      const finalResTrans = key.map((o, ind) => `$${ind+1}`);
      const quer = `INSERT INTO transaction (${key}) VALUES (${finalResTrans}) RETURNING *`;
      db.query(quer, value, (err, resTrans)=>{
        if(err) {
          throw err;
        }else{
          const recipient_id = resTrans.rows[0].recipient_id;
          const amount = parseInt(resTrans.rows[0].amount);
          const quer = 'UPDATE profile SET balance = balance + $1 WHERE id_user=$2 RETURNING *';
          const values = [amount, recipient_id];
          db.query(quer, values, (err) => {
            if (err) {
              cb(err);
            }else{
              const quer = 'UPDATE profile SET balance = balance - $1 WHERE id_user=$2 RETURNING *';
              const values2 = [amount, id_user];
              db.query(quer, values2, (err) => {
                if (err) {
                  cb(err);
                }else{
                  cb(err,resTrans.rows);
                  db.query('COMMIT',err=>{
                    if(err){
                      console.log(err);
                    }
                  });
                }
              });
            }
            
          });
        }
      });
    }
  });
};