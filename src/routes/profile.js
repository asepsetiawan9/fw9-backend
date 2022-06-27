//definisi methode untuk routes nya
const profile = require('express').Router()

const profielController = require('../controllers/profile')

profile.get('/', profielController.getAllProfile)
profile.post('/', profielController.postProfile)
profile.delete('/', profielController.deleteProfile)



module.exports = profile ;

