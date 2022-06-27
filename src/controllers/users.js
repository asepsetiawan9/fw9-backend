const response = require('../helpers/standardResponse')

exports.getAllUsers = (req, res)=>{
    return response(res, 'Get All Users success')
}

exports.postUsers = (req, res)=>{
    return response(res, 'Post Users success')
}

exports.deleteUsers = (req, res)=>{
    return response(res, 'Delete Users success')
}



