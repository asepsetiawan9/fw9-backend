const response = require('./standardResponse');
const handlingErr =(msg, param, location='body')=>[
  {
    msg,
    param,
    location
  }
];

const errResponse = (err, res) => {
  if (err.code === '23505' && err.detail.includes('email')) {
    const eres = handlingErr('Email already exist', 'email');
    return response(res, 'Error', eres, 400);
  }     
  if (err.code === '23505' && err.detail.includes('username')) {
    const eres = handlingErr('Email already exist', 'username');
    return response(res, 'Error', eres, 400);
  }
  const eres = handlingErr();
  if(eres == null){
    return response(res, 'Error', null, 400);  
  }
};

module.exports = errResponse;