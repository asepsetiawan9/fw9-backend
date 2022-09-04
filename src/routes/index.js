const router = require('express').Router(); //entri point dari page exprees

router.use('/admin/users', require('./admin/users')); // memanggil router users
router.use('/admin/profile', require('./admin/profile')); // memanggil router users
router.use('/auth', require('./auth')); // memanggil router login
router.use('/admin/transactions', require('./admin/transactions')); // memanggil router transactions
router.use('/admin/typetransaction', require('./admin/typeTrans'));

router.use('/profile', require('./users/profile'));
router.use('/transactions', require('./transUser'));// memanggil router typetransactions

module.exports = router; //akan di gunakan di root folder