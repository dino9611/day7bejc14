const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const bearerToken=require('express-bearer-token')
const http=require('http')
const socketIO=require('socket.io')
// const morgan = require("morgan");
// const Logger= require('./logger/logservice')
require('dotenv').config()

const PORT = process.env.PORT || 5000

// Passes morgan logs to winston then outputs to combined.log file
// app.use(morgan("combined", { stream: Logger.stream }));
app.use(cors())
app.use(bearerToken())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));//buat user kirim data ke server
app.use(express.static('public'))
// /coding/fotoaja.png
const server = http.createServer(app)
const io = socketIO(server)


var arrMsg = [] //ini database message
var userCount = 0

app.io = io
app.arrMsg = arrMsg

app.get('/',(req,res)=>{
    var dataku={
        name:'dino'
    }
    res.send('<h1>selamat datang di api kitas</h1>')
})
const {
    ProductRoutes,
    KaryawanRoutes,
    AuthRoutes,
    ProductsRoutes,
    MongoRoutes,
    Mongooseroutes,
    SocketRoutes
}=require('./Routes')

app.use('/products',ProductRoutes)
app.use('/toko',KaryawanRoutes)
app.use('/auth',AuthRoutes)
app.use('/prod',ProductsRoutes)
app.use('/mongo',MongoRoutes)
app.use('/mongoose',Mongooseroutes)
app.use('/socket',SocketRoutes)


io.on('connection', socket => {
    // userCount++
    userCount++
    socket.on('usercon',()=>{
        console.log('User connectedf')
        console.log(userCount)
        io.emit('user connected', userCount) //emit trigger pasangannya on
    })

    socket.on("tes",(data)=>{
        console.log(data)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
      userCount--;
      io.emit('user connected', userCount)
    })
})

server.listen(PORT,()=>{
    console.log('Api Aktif di Port '+PORT)
    // Logger.info(`Express runninng, Listening in port ${5000}`);
})


























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