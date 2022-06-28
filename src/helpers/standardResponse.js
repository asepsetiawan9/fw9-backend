const response = (res, msg, results, status=200) => {
  let success = true;
  if(status >= 400){
    success = false;
  }
  const data ={
    success,
    message: msg,
  };
  
  if(res){
    data.result = results(data);
  }
  return res.status(status).json({
    success,
    message: msg
  });
};

module.exports = response;

