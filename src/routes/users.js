//definisi methode untuk routes nya
const users = require('express').Router();
const userController = require('../controllers/users');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const authMiddle = require('../middleware/auth');

const userValidator = [
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
  body('pin')
    .exists({checkFalsy: true}).withMessage('Enter a PIN')
    .isLength({min: 6}).withMessage('PIN must be 6 characters')
    .isNumeric().withMessage('PIN must be a number'),
  
];


// users.get('/', body('limit').toInt(), body('page').toInt(),userController.getAllUsers);
// users.post('/', ...userValidator, userController.createUser);
// users.patch('/:id', ...userValidator, userController.editUser);
// users.delete('/:id', userController.deleteUser);
// users.get('/:id', userController.detailUser);
// users.get('/allUser', authMiddle, userController.transHistory);
users.get('/all-users', authMiddle, body('limit').toInt(), body('page').toInt(),userController.getAlluserExpectLogin);





module.exports = users ;

