const auth = require('express').Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const validationCheck = require('../middleware/checkValidation');

const registValidator = [
  body('email')
    .exists({checkFalsy: true}).withMessage('Enter an Email')
    .isEmail().withMessage('Wrong Email Format'),
  body('username')
    .exists({checkFalsy: true}).withMessage('Enter an Username')
    .isLength({min: 6}).withMessage('Username must be more than 6 characters'),
  body('password')
    .exists({checkFalsy: true}).withMessage('Enter a Password')
    .isLength({min: 6}).withMessage('Password must be more than 6 characters')
    .customSanitizer(async val =>{
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }), 
];

const createPinValidator = [
  body('email')
    .exists({checkFalsy: true}).withMessage('Enter an Email')
    .isEmail().withMessage('Wrong Email Format'),
  body('pin')
    .exists({checkFalsy: true}).withMessage('Enter a PIN')
    .isLength({min: 6}).withMessage('PIN must be 6 characters')
    .isNumeric().withMessage('PIN must be a number'),
];

const loginValidator =  [
  body('email')
    .exists({checkFalsy: true}).withMessage('Enter an Email')
    .isEmail().withMessage('Wrong Email Format'),

  body('password')
    .exists({checkFalsy: true}).withMessage('Enter a Password')
];

//auth.post('/login', authController.login);
auth.post('/register', ...registValidator, validationCheck, authController.register);
auth.post('/createPin', ...createPinValidator, validationCheck, authController.createPin);
auth.post('/login', ...loginValidator, validationCheck, authController.login);

module.exports = auth ;

