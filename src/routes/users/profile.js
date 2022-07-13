const profileUser = require('express').Router();
const authMiddle = require('../../middleware/auth');
const { body } = require('express-validator');
const profileController = require('../../controllers/users/profile');
const transController = require('../../controllers/users/trans');
const uploadFile = require('../../middleware/singleUpload');
const validationCheck = require('../../middleware/checkValidation');
const bcrypt = require('bcrypt');

const validation = [
  body('fullname')
    .isString().withMessage('Fullname Must be String'),
  body('phone')
    .isMobilePhone('id-ID').withMessage('Phone number must be indonesian code'),
  body('balance').isInt({min:1}).withMessage('Check your amount input')

];
const validationPhone = [
  body('phone')
    .isMobilePhone('id-ID').withMessage('Phone number must be indonesian code'),
   
];

const validationPassword = [
  body('password')
    .exists({checkFalsy: true}).withMessage('Enter a Password')
    .isLength({min: 6}).withMessage('Password must be more than 6 characters')
    .customSanitizer(async val =>{
      const hash = await bcrypt.hash(val, 10);
      return hash;
    })
];
const validationPin = [
  body('pin')
    .exists({checkFalsy: true}).withMessage('Enter a PIN')
    .isLength({min: 6}).withMessage('PIN must be 6 characters')
    .isNumeric().withMessage('PIN must be a number'),
];

const validationTransfer = [
  body('amount').isInt({min:1}).withMessage('Check your amount input')
    .exists({checkFalsy: true}).withMessage('Amount Can\'t be Empty'),
  body('recipient_id')
    .exists({checkFalsy: true}).withMessage('Recipient Can\'t be Empty')
];

profileUser.get('/', authMiddle, body('limit').toInt(), body('page').toInt(), profileController.welcome);
profileUser.get('/getprofile', authMiddle, profileController.detailProfile);
profileUser.get('/transhistory', authMiddle, profileController.transhistory);
profileUser.post('/createphone', authMiddle, ...validationPhone, validationCheck, profileController.createPhone);
profileUser.patch('/updateprofile', authMiddle, uploadFile, ...validation, validationCheck, profileController.updateProfile);
profileUser.patch('/updatepassword', authMiddle, ...validationPassword, validationCheck, profileController.updatePassword);
profileUser.patch('/updatepin', authMiddle, ...validationPin, validationCheck, profileController.updatePin);
profileUser.patch('/updatephone', authMiddle, ...validationPhone, validationCheck, profileController.updatePhone);
profileUser.post('/transfer', authMiddle, ...validationTransfer, validationCheck, transController.transferMoney);

module.exports = profileUser ;


