//definisi methode untuk routes nya
const trans = require('express').Router();

const transController = require('../controllers/transactions');



trans.patch('/:id', transController.updateTrans);
trans.delete('/:id', transController.deleteTrans);
trans.get('/', transController.getAllTrans);
trans.get('/:id', transController.detailTrans);
trans.post('/', transController.createTrans);


module.exports = trans ;


