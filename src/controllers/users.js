const response = require('../helpers/standardResponse');
const userModel = require('../models/users');
const { validationResult } = require('express-validator');
const errResponse = require('../helpers/errResponse');


const {DATA_LIMIT} = process.env;
exports.getAllUsers = (req, res)=>{
  const {s ='', limit=parseInt(DATA_LIMIT), page=1} = req.query;

  const offset = (page-1) * limit;
  
  userModel.getAllUsers(s, limit, offset, (err, results)=>{
    //console.log(err);
    if(results.length < 1){
      return res.redirect('/404');
    }else{
      
      const infoPage = {};
      userModel.countAllUsers(s, (err, totalData) =>{
        infoPage.totalData = totalData;
        infoPage.totalPage = Math.ceil(totalData/limit);
        infoPage.currPage = parseInt(page);
        infoPage.nextPage = infoPage.currPage < infoPage.totalPage ? infoPage.currPage + 1 : null;
        infoPage.prevPage = infoPage.currPage > 1 ? infoPage.currPage -1 : null;

        return response(res, 'Get All Users success', results, infoPage);
      });
    }
    
  });
};

exports.createUser = (req, res)=>{

  const valdation = validationResult(req);
  if(!valdation.isEmpty()){
    return response(res, 'Error occurd', valdation.array(), null, 400);
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
    if(results.length > 0){
      return response(res, 'Delete Users success', results[0]);
    }else{
      return res.redirect('/404');
    }
  });
};

exports.detailUser = (req, res)=>{
  const {id} =req.params;
  userModel.detailUser(id, (results)=>{
    //console.log(results.length);
    if(results.length > 0 ){
      return response(res, 'This Users Details', results[0]); 
    }else{
      return res.redirect('/404');
    }
  });
};



