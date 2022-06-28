const router = require('express').Router(); //entri point dari page exprees

router.use('/users', require('./users')); // memanggil router users
router.use('/profile', require('./profile')); // memanggil router users
router.use('/login', require('./login')); // memanggil router login
router.use('/transactions', require('./transactions')); // memanggil router transactions


module.exports = router; //akan di gunakan di root folder