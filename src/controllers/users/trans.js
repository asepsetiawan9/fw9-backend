const transModel = require('../../models/trans');
const response = require('../../helpers/standardResponse');
const errResponse = require('../../helpers/errResponse');
exports.transferMoney = (req, res) => {
  const { id } = req.authUser;
  transModel.transferMoney(id, req.body, (err, result) => {
    if (err) {
      return errResponse(err, res);
    } else {
      transModel.sumBalance(result[0].amount, result[0].recipient_id, (err) => {
        if (err) {
          return errResponse(err, res);
        }
      });
      transModel.subtractionBalance(result[0].amount, id, (err)=>{
        if(err){
          return errResponse(err, res);
        }
      });
      return response(res, 'Transfer Succes', result);
    }
  });
};
