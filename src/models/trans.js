const db = require('../helpers/db');

 
exports.transferMoney = (id, data, cb) => {
  const value = [];
  const filtered = {};
  const obj = {
    sender_id: id,
    recipient_id: data.recipient_id,
    note: data.note,
    time: data.time,
    typetrans_id: data.typetrans_id,
    amount: parseInt(data.amount),
  };

  for (let x in obj) {
    if (obj[x] !== null) {
      if (obj[x] !== undefined) {
        filtered[x] = obj[x];
        value.push(obj[x]);
      }
    }
  }

  const key = Object.keys(filtered);
  const finalRes = key.map((value, index) => `$${index + 1}`);
  const quer = `INSERT INTO transaction(${key}) VALUES(${finalRes}) RETURNING *`;

  db.query(quer, value, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

exports.sumBalance = (amount, id_user, cb) => {
  const quer = 'UPDATE profile SET balance = balance + $1 WHERE id_user=$2 RETURNING *';
  const values = [amount, id_user];
  db.query(quer, values, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res);
    }
  });
};

exports.subtractionBalance = (amount, id, cb) => {
  console.log(id);
  const quer = 'UPDATE profile SET balance = balance - $1 WHERE id_user=$2 RETURNING *';
  const values = [amount, id];
  db.query(quer, values, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res);
    }
  });
};

