const response = require('../helpers/standardResponse');
const userModel = require('../models/users');


exports.getAllUsers = (req, res)=>{
  userModel.getAllUsers((results)=>{
    return response(res, 'Get All Users success', results);
  });
};

exports.createUser = (req, res)=>{
  userModel.createUser(req.body, (results)=>{
    return response(res, 'Post Users success', results);
  });
};

exports.editUser = (req, res)=>{
  const {id} =req.params;
  userModel.updateUser(id, req.body, (results)=>{
    return response(res, 'update data success', results[0]);
  });
};

exports.deleteUser = (req, res)=>{
  const {id} =req.params;
  userModel.deleteUser(id, (results)=>{
    return response(res, 'Delete Users success', results[0]);
  });
};

exports.detailUser = (req, res)=>{
  const {id} =req.params;
  userModel.detailUser(id, (results)=>{
    return response(res, 'This Users Details', results);
  });
};



