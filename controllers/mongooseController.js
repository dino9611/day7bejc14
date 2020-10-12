const mongoose=require('mongoose')

const {uri} = require('./../connection');
const Users=require('./../models/users')

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('connect mongod')
    }
})



// app.get('/getdatamongo',(req,res)=>{
//     // const {username,usia}=req.body 
//     // Users.find({usia:{$lte:24},username:{$regex:"di",$options:"i"}}).then((result)=>{ //select * from Users where usia <=24 and username like "%di%
//     Users.find().then((result)=>{ 
//         res.send(result)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// app.post('/addmongo',(req,res)=>{
//     const {username,usia}=req.body
//     Users({
//         username:username,
//         usia:usia
//     }).save().then((result)=>{
//         res.send(result)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// app.put('/edmongo/:id',(req,res)=>{
//     const {id}=req.params
//     const {username}=req.body
//     Users.updateOne({_id:id},{username:username,usia:20})
//     .then((result)=>{
//         return res.send(result)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })


// app.delete('/deletemongo/:id',(req,res)=>{
//     const {id}=req.params
//     Users.findByIdAndRemove(id)
//     .then((result)=>{
//         res.send(result)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })


class MongooseController{

    static getdata(req,res){
        Users.find().then((result)=>{ 
            res.send(result)
        }).catch((err)=>{
            console.log(err)
        })
    }
    
}


module.exports=MongooseController