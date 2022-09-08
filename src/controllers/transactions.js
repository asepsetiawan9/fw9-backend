const transModel = require('../models/transactions');
const response = require('../helpers/standardResponse');
const errResponse = require('../helpers/errResponse');
const {DATA_LIMIT} = process.env;

exports.topUp = (req, res)=>{
  const id= req.authUser.id;
  transModel.topUp(id, req.body, (err, results)=>{
    const resBalance = results.rows[0];
    const TopUp = resBalance.amount;
    const note = resBalance.note;
    if (err) {
      return errResponse(err, res);
    }else{
      return response(res, 'TopUp successfully', {TopUp, note});
    }
  });
};

exports.transHistory = (req, res)=>{
  const {search ='', searchBy='amount', limit=parseInt(DATA_LIMIT), page=1, orderBy ='id', sortType='ASC'} = req.query;
  const id_user = req.authUser.id;
  const offset = (page-1) * limit;
  transModel.transHistory(search, searchBy, limit, offset, orderBy, sortType, id_user, (err, results)=>{
    if(results.length < 1){
      return res.redirect('/404');
    }else{
      const infoPage = {};
      transModel.countAllTrans(searchBy, search, id_user,(err, totalData) =>{
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

exports.transfer = (req, res)=>{
  const id= req.authUser.id;
  transModel.transfer(id, req.body, (err, results)=>{
    if (err) {
      return errResponse(err, res);
    }else{
      return response(res, 'Transfer successfully', results);
    }
  });
};

exports.detailTrans = (req, res)=>{
  const {id} =req.params;
  transModel.detailTrans(id, (results)=>{
    return response(res, 'This Transaction Details', results);
  });
};
