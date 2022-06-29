const response = require('../helpers/standardResponse');
const profileModel = require('../models/profile');


exports.detailProfile = (req, res)=>{
  const {id} =req.params;
  profileModel.detailProfile(id, (results)=>{
    return response(res, 'This Profile Details', results);
  });
};

exports.createProfile = (req, res)=>{
  profileModel.createProfile(req.body, (results)=>{
    return response(res, 'Post Profile success', results);
  });
};

exports.updateProfile = (req, res)=>{
  const {id} =req.params;
  profileModel.updateProfile(id, req.body, (results)=>{
    return response(res, 'update data success', results[0]);
  });
};

exports.deleteProfile = (req, res)=>{
  const {id} =req.params;
  profileModel.deleteProfile(id, (results)=>{
    return response(res, 'Delete Profile success', results[0]);
  });
};

exports.getAllProfile = (req, res)=>{
  profileModel.getAllProfile((results)=>{
    return response(res, 'Get All Profile success', results);
  });
};
