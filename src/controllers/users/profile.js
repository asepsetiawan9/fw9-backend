const response = require('../../helpers/standardResponse');
const profileUserModel = require('../../models/profileUser');

exports.welcome = (req, res)=>{
  
  profileUserModel.userById(req.authUser.id, (err, results)=>{
    const user = results.rows[0];
    return response(res, 'Welcome ' + user.email); 
  });
};

exports.detailProfile = (req, res)=>{
    
  profileUserModel.detailProfile(req.authUser.id, (err, results)=>{  
    //console.log(results.length);
    if(results.length > 1 ){
      return res.redirect('/404');
    }else{
      return response(res, 'This Your Profile', results[0]);
      
    }

  });
};

exports.createPhone = (req , res) =>{
  const id_user = req.authUser.id;
  profileUserModel.getProfileById(id_user, (err, results)=>{
    if(results.length > 0){
      const user = results[0];
      if(user.phone === null){
        profileUserModel.updatePhone(user.id_user, {phone: req.body.phone}, (err, resultUpdate)=>{
          const userUpdated = resultUpdate[0];
          if(userUpdated.phone){
            return response(res, 'Create Phone Succes', userUpdated.phone);
          }
        });
      }else{
        return response(res, 'Phone is already set', results[0].phone, null, 400);
      }
    }else{
      return response(res, 'id_user Not Found', null, null, 400);
    }
   
  });
};

exports.updateProfile = (req, res) => {
  const id_user = req.authUser.id;
  let filename = null;

  if(req.file){
    filename = req.file.path;
  }

  profileUserModel.updateProfile(id_user, filename, req.body, (err, results)=>{

    if(err){
      return response(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    return response(res, 'Update Data Profile success', results[0]);
  });
};

exports.updatePassword = (req, res) => {
  const id = req.authUser.id;
  
  profileUserModel.updatePassword(id, req.body, (err)=>{

    if(err){
      return response(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    return response(res, 'Change Password is Successfully');
  });
};

exports.updatePin = (req, res) => {
  const id = req.authUser.id;
  
  profileUserModel.updatePin(id, req.body, (err)=>{

    if(err){
      return response(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    return response(res, 'Change PIN is Successfully');
  });
};

exports.updatePhone = (req, res) => {
  const id = req.authUser.id;
  
  profileUserModel.updatePhone(id, req.body, (err, results)=>{

    if(err){
      return response(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    return response(res, 'Change Number Phone is Successfully', results[0]);
  });
};