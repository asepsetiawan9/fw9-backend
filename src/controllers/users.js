const response = require('../helpers/standardResponse');
const userModel = require('../models/users');
//const users = require('../routes/users');

exports.getAllUsers = (req, res)=>{
  userModel.getAllUsers((results)=>{
    return response(res, 'Get All Users success', results);
  });
};

exports.postUsers = (req, res)=>{
  return response(res, 'Post Users success');
};

exports.deleteUsers = (req, res)=>{
  return response(res, 'Delete Users success');
};



