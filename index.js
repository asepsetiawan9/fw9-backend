const express =  require('express')

const app = express()

app.use(express.urlencoded({extend: false}))


app.get('/', (req, res)=>{
    return res.json({
        seccess: true,
        message: 'Backend is running well'
    })
})

app.use('/', require('./src/routes'))

// app.post('/login', (req, res,)=>{
//     console.log(req.body)
//     if(req.body.username === 'admin' && req.body.password){
//         return res.json({
//             succses: true,
//             message: 'login succes'
//         })
//     }else{
//             return res.json({
//                 succses: false,
//                 message: 'login faild'
//             })
//     }

// })

app.use('*',(req,res)=>{
return res.status(404).json({
    success: false,
    message: "Resource not found"
})
})

app.listen(3333, ()=>{
    console.log(`aplication is running in port 3333`)
})