const login = require('express').Router()

const loginController = require('../controllers/login')

login.post('/', loginController.postLogin)

module.exports = login ;

