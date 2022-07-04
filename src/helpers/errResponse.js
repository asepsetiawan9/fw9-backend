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
    return response(res, 'Error', eres, null, 400);
  }     
  if (err.code === '23505' && err.detail.includes('use null,rname')) {
    const eres = handlingErr('Email already exist', 'username');
    return response(res, 'Error', eres, null, 400);
  }
  const eres = handlingErr();
  if(eres == null){
    return response(res, 'Error', null, null, 400);  
  }
};

module.exports = errResponse;