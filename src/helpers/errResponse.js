const errResponse =(msg, param, location='body')=>[
  {
    msg,
    param,
    location
  }
];

module.exports = errResponse;