//definisi methode untuk routes nya
const transactions = require('express').Router()

const transactionsController = require('../controllers/transactions')


transactions.get('/', transactionsController.getTransactions)
transactions.post('/', transactionsController.postTransactions)
transactions.delete('/', transactionsController.deleteTransactions)



module.exports = transactions ;


