const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()

app.use(cors())
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
const {ProductRoutes,KaryawanRoutes}=require('./Routes')

app.use('/products',ProductRoutes)
app.use('/toko',KaryawanRoutes)

// // http://localhost:5000/getdata?nama=robin&usia=23 contoh query
// // ?nama=robin&usia=23 contoh query
// app.get('/getdata',(req,res)=>{
//     const {nama,usia}=req.query
//     // var nama=req.query.nama
//     // var usia=req.query.usia
//     if(nama && usia){
//         var dataku={
//             name:nama,
//             usia:usia
//         }
//         if(usia>20){
//            return res.status(200).send(dataku)
//         }else{
//             return res.status(200).send({'dsa':nama})
//         }
//     }else{
//         res.status(300).send('error bro harus pake query')
//     }
// })
// http://localhost:5000/users/4 
//  -- 4 adalah paramsnya
app.get('/users/:id',(req,res)=>{
    const id=parseInt(req.params.id)   // id berasa dari :id jika :idusers maka syntaxnya adalah req.params.idusers
    res.status(200).send({
        id:id
    })
})
// day7 ini dipindah ke products routes
// const database=[
//     {
//         id:1,
//         namaProd:'Popok Hokage',
//         deskripsi:'membuat anda keren',
//         harga:20000
//     },
//     {
//         id:2,
//         namaProd:'Popok ujian chunin',
//         deskripsi:'membuat anda menjadi sasukeh',
//         harga:60000
//     },
//     {
//         id:3,
//         namaProd:'indomie',
//         deskripsi:'membuat anda kenyang',
//         harga:10000
//     }
// ]
// // 1. buat api yang responsenya semua product 
// // localhost:5000/products berarti artinya semua
// // 2. buat 1 api search product contoh api  
// // localhost:5000/products?namaProd=popok&&hargamin=15000&&hargamax=50000
// // localhost:5000/products?namaProd=popok&&hargamin=20000
// // 3. buat api post localhost:5000/products
// // 4. delete localhost:5000/products/id
// // 5. put/patch localhost:5000/products/id

// app.get('/products',(req,res)=>{
//     // var namaProd=req.query.namaProd
//     // var hargamin=req.query.hargamin
//     // var hargamax=req.query.hargamax
//     var {namaProd,hargamin,hargamax}=req.query
//     if(namaProd || hargamin || hargamax){
//         var filterdata=database.filter((val)=>{
//             var hargamin1=true
//             var hargamax1=true
//             var namaProd2=true
//             if(hargamin){
//                 hargamin1=hargamin<=val.harga
//             }
//             if(hargamax){
//                 hargamax1=hargamax>=val.harga
//             }
//             if(namaProd){
//                 namaProd2=val.namaProd.toLowerCase().includes(namaProd.toLowerCase())
//             }
//             return hargamax1&&hargamin1&&namaProd2
//         })
//         res.send(filterdata)
//     }else{
//         res.send(database)
//     }
// })
// app.post('/products',(req,res)=>{
//     var {namaProd,deskripsi,harga}=req.body
//     if(namaProd||deskripsi||harga){
//         database.push({
//             id:database.length+1,
//             namaProd,
//             deskripsi,
//             harga
//         })
//         res.status(200).send(database)
//     }else{
//         return res.status(300).send('error harus lebih dari 3 prop')
//     }
// })
// app.put('/products/:id',(req,res)=>{
//     // var {id}=req.params
//     // var index=database.findIndex((val)=>val.id==id)
//     // database[index]={...database[index],...req.body}
//     res.send(database)
// })
// app.delete('/products/:id',(req,res)=>{
//     var {id}=req.params
//     var index=database.findIndex((val)=>val.id==id)
//     database.splice(index,1)
//     res.send(database)
// })
// yang punya req.body hanya post put patch


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