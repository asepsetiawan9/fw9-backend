const response = require('../helpers/standardResponse');

exports.postLogin = (req, res)=>{
  if(req.body.username === 'admin' && req.body.password){
    return response(res, 'Login success');
  }else{
    return response(res, 'Login Faild');
  }
};

// exports.postRegister = (req, res)=>{
//     return response(res, 'Register success')
// }

