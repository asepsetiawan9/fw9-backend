//definisi methode untuk routes nya
const profile = require('express').Router();

const profielController = require('../controllers/profile');

profile.get('/:id', profielController.detailProfile);
// profile.post('/', profielController.postProfile);
// profile.delete('/', profielController.deleteProfile);



module.exports = profile ;

