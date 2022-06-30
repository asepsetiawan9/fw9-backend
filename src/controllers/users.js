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
    if(err){
      if(err.code === '23505' && err.detail.includes('email')){
        const errres = errResponse('Email alredy exsist', 'email');
        return response(res, 'Error', errres, 400);
      }else if(err.code === '23505' && err.detail.includes('username')){
        const errres = errResponse('Username is already exsist', 'username');
        return response(res, 'Error', errres, 400);
      }
      return response(res, 'Error', null, 400);
    }else{
      return response(res, 'Post Users success', results);
    }
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



