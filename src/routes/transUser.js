const transUser = require('express').Router();
const authMiddle = require('../middleware/auth');
const transController = require('../controllers/transactions');
const { body } = require('express-validator');
const validationCheck = require('../middleware/checkValidation');


const validationTopUp = [
  body('balance')
    .toInt()
    .isInt({ min: 0, max: 10000000 })
    .isNumeric().withMessage('Balance must be string')
];
const validationTransfer = [
  body('amount').isInt({min:1}).withMessage('Check your amount input')
    .exists({checkFalsy: true}).withMessage('Amount Can\'t be Empty'),
  body('recipient_id')
    .exists({checkFalsy: true}).withMessage('Recipient Can\'t be Empty')
];
transUser.post('/transfer', authMiddle, ...validationTransfer, validationCheck, transController.transfer);
transUser.patch('/top-up', authMiddle, ...validationTopUp, validationCheck, transController.topUp);
transUser.get('/trans-history', authMiddle, transController.transHistory);
transUser.get('/trans/:id', transController.detailTrans);
// trans.delete('/:id', transController.deleteTrans);
// trans.get('/', transController.getAllTrans);
// trans.get('/:id', transController.detailTrans);
// trans.post('/', transController.createTrans);


module.exports = transUser ;


