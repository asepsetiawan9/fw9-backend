const response = require('../helpers/standardResponse');
const authModel = require('../models/auth');
const errResponse = require('../helpers/errResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {APP_SECRET} = process.env;

exports.register = (req, res)=>{
  req.body.pin = null;
  authModel.register(req.body, (err) => {
    if(err){
      return errResponse(err, res);
    }
    return response(res, 'Register succesfully');
  });
};

exports.createPin = (req , res) =>{
  const {email} = req.body;
  authModel.getUserByEmail(email, (err, results)=>{
    //console.log(results.rows.length);
    if(results.rows.length > 0){
      const user = results.rows[0];
      if(user.pin === null){
        authModel.updatePin(user.id, {pin: req.body.pin}, (err, resultUpdate)=>{
          const userUpdated = resultUpdate.rows[0];
          if(userUpdated.email === user.email){
            return response(res, 'create Pin success');
          }
        });
      }else{
        return response(res, 'PIN is already set', null, null, 400);
      }
    }else{
      return response(res, 'Email Not Found', null, null, 400);
    }
   
  });
};

exports.login = (req, res)=>{
  const {email, password} = req.body;
  authModel.getUserByEmail(email, (err, results) => {
    if(results.rows.length < 1){
      return response(res, 'User Not Found', null, null, 400);
    }
    const user = results.rows[0];
    bcrypt.compare(password, user.password)
      .then((cpRes)=>{
        if(cpRes){
          const token = jwt.sign({id: user.id}, APP_SECRET || 'D3f4uLt');
          return response(res, 'Login Success', [token]);
        }
        return response(res, 'Check your email and pasword', null, null, 400);

      })
      .catch(e => {
        return response(res, 'Check your email and pasword', null, null, 400);
      });
  });
};

