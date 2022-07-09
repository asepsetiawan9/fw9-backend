const response = require('../../helpers/standardResponse');
const typeTransModel = require('../../models/typeTrans');

exports.createTypeTrans = (req, res)=>{
  typeTransModel.createTypeTrans(req.body, (results)=>{
    return response(res, 'Post Type Transaction success', results);
  });
};

exports.getTypeTrans= (req, res)=>{
  typeTransModel.getTypeTrans((results)=>{
    return response(res, 'Get All Type Transactions success', results);
  });
};

exports.detailTypeTrans = (req, res)=>{
  const {id} =req.params;
  typeTransModel.detailTypeTrans(id, (results)=>{
    return response(res, 'This Type Transaction Details', results);
  });
};

exports.updateTypeTrans = (req, res)=>{
  const {id} =req.params;
  typeTransModel.updateTypeTrans(id, req.body, (results)=>{
    return response(res, 'update data success', results[0]);
  });
};

exports.deleteTypeTrans = (req, res)=>{
  const {id} =req.params;
  typeTransModel.deleteTypeTrans(id, (results)=>{
    return response(res, 'Delete Type Transaction success', results[0]);
  });
};