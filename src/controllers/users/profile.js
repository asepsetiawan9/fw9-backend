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
  const {searchBy='username', search ='', limit=parseInt(DATA_LIMIT), page=1, orderBy ='id', sortType='ASC' } = req.query;
  // console.log(search);
  const offset = (page-1) * limit;
  
  profileUserModel.transHistory(searchBy, search, limit, offset, orderBy, sortType, req.authUser.id, (err, results)=>{
    return response(res, 'This Transaction Details', results);
  });
};
