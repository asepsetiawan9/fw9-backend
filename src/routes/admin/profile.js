//definisi methode untuk routes nya
const profile = require('express').Router();
const profielController = require('../../controllers/admin/profile');
const uploadFile = require('../../middleware/singleUpload');
const { body } = require('express-validator');
const validationCheck = require('../../middleware/checkValidation');

const validation = [
  body('fullname')
    .isString().withMessage('Fullname Must be String'),
  body('phone')
    .isMobilePhone('id-ID').withMessage('Phone number must be indonesian code'),
  body('balance')
    .toInt()
    .isNumeric().withMessage('Balance must be string')
];
profile.post('/', uploadFile, ...validation, validationCheck, profielController.createProfile);
profile.patch('/:id', uploadFile, ...validation, validationCheck, profielController.updateProfile);
profile.get('/:id', profielController.detailProfile);
profile.delete('/:id', profielController.deleteProfile);
profile.get('/', profielController.getAllProfile);



module.exports = profile ;

