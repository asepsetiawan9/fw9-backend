const response = require('../helpers/standardResponse');
const transModel = require('../models/transactions');

exports.getAllTrans= (req, res)=>{
  transModel.getAllTrans((results)=>{
    return response(res, 'Get All Trans success', results);
  });
};

exports.detailTrans = (req, res)=>{
  const {id} =req.params;
  transModel.detailTrans(id, (results)=>{
    return response(res, 'This Transaction Details', results);
  });
};

exports.createTrans = (req, res)=>{
  transModel.createTrans(req.body, (results)=>{
    return response(res, 'Post Transaction success', results);
  });
};

exports.updateTrans = (req, res)=>{
  const {id} =req.params;
  transModel.updateTrans(id, req.body, (results)=>{
    return response(res, 'update data success', results[0]);
  });
};

exports.deleteTrans = (req, res)=>{
  const {id} =req.params;
  transModel.deleteTrans(id, (results)=>{
    return response(res, 'Delete Transaction success', results[0]);
  });
};