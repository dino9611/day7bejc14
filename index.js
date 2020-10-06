const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const bearerToken=require('express-bearer-token')
require('dotenv').config()

app.use(cors())
app.use(bearerToken())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));//buat user kirim data ke server
app.use(express.static('public'))
// /coding/fotoaja.png

app.get('/',(req,res)=>{
    var dataku={
        name:'dino'
    }
    res.send('<h1>selamat datang di api kitas</h1>')
})
const {ProductRoutes,KaryawanRoutes,AuthRoutes}=require('./Routes')

app.use('/products',ProductRoutes)
app.use('/toko',KaryawanRoutes)
app.use('/auth',AuthRoutes)

const Crypto=require('crypto')

app.get('/encrypt',(req,res)=>{
    console.log(req.query.password)
    var password=req.query.password
    var katakunci='silverfang'
    var hashpassword=Crypto.createHmac('sha256',katakunci).update(password).digest('hex')
    res.send({
        passwordsebelum:password,
        passwordenncrypt:hashpassword,
        panjangpass:hashpassword.length
    })
})


app.listen(5000,()=>console.log('Api Aktif di Port 5000'))


























// const http =require('http')





// var server=http.createServer((req,res)=>{
//     // console.log(req.query)
//     res.writeHead(200,{
//         'content-type':'application/json'
//     })
//     var dataku={
//         name:'din'
//     }
//     res.end(JSON.stringify(dataku))
// })

// server.listen(5000,()=>console.log('active port 5000'))