//definisi methode untuk routes nya
const profile = require('express').Router();
const profielController = require('../controllers/profile');

profile.post('/', profielController.createProfile);
profile.patch('/:id', profielController.updateProfile);
profile.get('/:id', profielController.detailProfile);
profile.delete('/:id', profielController.deleteProfile);
profile.get('/', profielController.getAllProfile);



module.exports = profile ;

