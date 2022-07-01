const response = require('../helpers/standardResponse');
const userModel = require('../models/users');
const { validationResult } = require('express-validator');
const errResponse = require('../helpers/errResponse');



exports.getAllUsers = (req, res)=>{
  userModel.getAllUsers((results)=>{
    return response(res, 'Get All Users success', results);
  });
};

exports.createUser = (req, res)=>{

  const valdation = validationResult(req);
  if(!valdation.isEmpty()){
    return response(res, 'Error occurd', valdation.array(), 400);
  }
  userModel.createUser(req.body, (err, results)=>{
    if (err) {
      return errResponse(err, res);
    }else{
      return response(res, 'Create user successfully', results[0]);
    }
  });
};

exports.editUser = (req, res)=>{
  const {id} = req.params;
  const valdation = validationResult(req);
  if(!valdation.isEmpty()){
    return response(res, 'Error occurd', valdation.array(), 400);
  }
  userModel.updateUser(id, req.body, (err, results)=>{
    console.log(err);
    if (err) {
      return errResponse(err, res);
    } else {
      return response(res, 'Edit user successfully', results[0]);
    }
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



