const response = require('../../helpers/standardResponse');
const profileUserModel = require('../../models/profileUser');
//const userModel = require('../../models/users');
const {DATA_LIMIT} = process.env;

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
      return response(res, 'This Your Profile', results);
    }

  });
};

exports.transhistory = (req, res)=>{
  console.log(req.headers);
  const {search ='', searchBy='amount', limit=parseInt(DATA_LIMIT), page=1, orderBy ='id', sortType='ASC'} = req.query;
  const id_user = req.authUser.id;
  const offset = (page-1) * limit;
  profileUserModel.transHistory(search, searchBy, limit, offset, orderBy, sortType, id_user, (err, results)=>{
    if(results.length < 1){
      return res.redirect('/404');
    }else{
      
      const infoPage = {};
      profileUserModel.countAllTrans(searchBy, search, id_user,(err, totalData) =>{
        infoPage.totalData = totalData;
        infoPage.totalPage = Math.ceil(totalData/limit);
        infoPage.currPage = parseInt(page);
        infoPage.nextPage = infoPage.currPage < infoPage.totalPage ? infoPage.currPage + 1 : null;
        infoPage.prevPage = infoPage.currPage > 1 ? infoPage.currPage -1 : null;

        return response(res, 'This Your Transaction History', results, infoPage);
      });
    }
    
  });
};

exports.createPhone = (req , res) =>{
  const id_user = req.authUser.id;
  profileUserModel.getProfileById(id_user, (err, results)=>{
    //console.log(results);
    if(results.rows.length > 0){
      const user = results.rows[0];
      //
      if(user.phone === null){
        profileUserModel.updatePhone(user.id_user, {phone: req.body.phone}, (err, resultUpdate)=>{
          const userUpdated = resultUpdate.rows[0];
          if(userUpdated.phone){
            return response(res, 'Create Phone Succes');
          }
        });
      }else{
        return response(res, 'Phone is already set', null, null, 400);
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
    filename = req.file.filename;
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
  
  profileUserModel.updatePassword(id, req.body, (err, results)=>{

    if(err){
      return response(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    return response(res, 'Change Password is Successfully', results[0]);
  });
};

exports.updatePin = (req, res) => {
  const id = req.authUser.id;
  
  profileUserModel.updatePin(id, req.body, (err, results)=>{

    if(err){
      return response(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    return response(res, 'Change PIN is Successfully', results[0]);
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