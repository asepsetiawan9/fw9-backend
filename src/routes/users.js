//definisi methode untuk routes nya
const users = require('express').Router();

const userController = require('../controllers/users');

users.get('/', userController.getAllUsers);
users.post('/', userController.postUsers);
users.delete('/', userController.deleteUsers);



module.exports = users ;

