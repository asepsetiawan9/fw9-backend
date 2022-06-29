const response = require('../helpers/standardResponse');
const profileModel = require('../models/profile');


exports.detailProfile = (req, res)=>{
  const {id} =req.params;
  profileModel.detailProfile(id, (results)=>{
    return response(res, 'This Profile Details', results);
  });
};
