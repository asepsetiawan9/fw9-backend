const response = require('../../helpers/standardResponse');
const profileModel = require('../../models/profile');

exports.createProfile = (req, res) => {
  let filename = null;

  if(req.file){
    filename = req.file.filename;
  }
  profileModel.createProfile(filename, req.body, (err, results)=>{      
    return response(res, 'Post Profile success', results[0]);
  });
  
};

exports.updateProfile = (req, res) => {
  const {id} =req.params;
  let filename = null;

  if(req.file){
    filename = req.file.filename;
  }

  profileModel.updateProfile(id, filename, req.body, (err, results)=>{

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
  profileModel.getAllProfile((err, results)=>{
    //console.log(results);
    if(results.length < 1){
      return res.redirect('/404');
    }else{
      return response(res, 'Get All Profile success', results);
    }
  });
};

