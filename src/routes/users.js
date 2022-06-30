//definisi methode untuk routes nya
const users = require('express').Router();
const userController = require('../controllers/users');
const { body } = require('express-validator');

const userValidator = [
  body('email').isEmail().withMessage('Wrong Email Format'),
  body('username').isLength({min: 4}).withMessage('Username must be more than 4 characters')
];

users.get('/', userController.getAllUsers);
users.post('/', ...userValidator ,userController.createUser);
users.patch('/:id', userController.editUser);
users.delete('/:id', userController.deleteUser);
users.get('/:id', userController.detailUser);



module.exports = users ;

