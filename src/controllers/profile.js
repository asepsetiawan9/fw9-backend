const response = require('../helpers/standardResponse');
const profileModel = require('../models/profile');
const upload = require('../helpers/upload').single('picture');



exports.uploadProfile = (req, res) => {
  upload(req, res, (err)=>{
    if(err){
      return response(res, `Upload Failed : ${err.message}`, null, null, 400);
    }
    return response(res, 'Image has been uploaded', req.body);
  });
  
};


exports.createProfile = (req, res) => {
  upload(req, res, (err)=>{
    if(err){
      return response(res, `Upload Failed : ${err.message}`, null, null, 400);
    }
    profileModel.createProfile(req.file.filename, req.body, (err, results)=>{
      console.log(results);
      return response(res, 'Post Profile success', results[0]);
    });
  });
  
};

exports.updateProfile = (req, res) => {
  const {id} =req.params;
  let filename = null;

  if(req.file){
    filename = req.file.filename;
  }
  console.log(filename);
  profileModel.updateProfile(id, filename, req.body, (err, results)=>{
    //console.log(req.file.filename);
    if(err){
      return response(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    return response(res, 'update data success', results[0]);
  });
};

exports.detailProfile = (req, res)=>{
  const {id} =req.params;
  profileModel.detailProfile(id, (results)=>{
    return response(res, 'This Profile Details', results);
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
