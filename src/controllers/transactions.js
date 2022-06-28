const response = require('../helpers/standardResponse');
//const transactions = require('../routes/transactions');

exports.getTransactions = (req, res)=>{
  return response(res, 'Get Transactions success');
};

exports.postTransactions = (req, res)=>{
  return response(res, 'Post transactions success');
};

exports.deleteTransactions = (req, res)=>{
  return response(res, 'Delete transactions success');
};
