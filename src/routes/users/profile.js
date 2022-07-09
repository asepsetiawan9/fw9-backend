const profileUser = require('express').Router();
const authMiddle = require('../../middleware/auth');
const { body } = require('express-validator');
const profileController = require('../../controllers/users/profile');

profileUser.get('/', authMiddle, body('limit').toInt(), body('page').toInt(), profileController.welcome);
profileUser.get('/getprofile', authMiddle, profileController.detailProfile);
profileUser.get('/transhistory', authMiddle, profileController.transhistory);

module.exports = profileUser ;


