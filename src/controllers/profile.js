const response = require('../helpers/standardResponse');
//const profile = require('../routes/profile');

exports.getAllProfile = (req, res)=>{
  return response(res, 'Get All Profile success');
};

exports.postProfile = (req, res)=>{
  return response(res, 'Post Profile success');
};

exports.deleteProfile = (req, res)=>{
  return response(res, 'Delete Profile success');
};
