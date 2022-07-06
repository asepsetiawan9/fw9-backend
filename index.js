require('dotenv').config();

const express =  require('express');

const app = express();
app.use('/image',express.static('assets'));
app.use(express.urlencoded({extended: false}));
global.__basepath = __dirname;

app.get('/', (req, res)=>{
  return res.json({
    success: true,
    message: 'Backend is running well'
  });
});

app.use('/', require('./src/routes'));

app.use('*',(req,res)=>{
  return res.status(404).json({
    success: false,
    message: 'Resource not found'
  });
});


app.listen(process.env.PORT, ()=>{
  console.log(`aplication is running in port ${process.env.PORT}`);
});