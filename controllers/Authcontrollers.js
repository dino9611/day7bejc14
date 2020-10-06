const {db}=require('../connection')
const {encrypt}=require('./../helpers')
const nodemailer=require('nodemailer')
const fs=require('fs')
const handlebars=require('handlebars')
const {createJWToken}=require('./../helpers/jwt')
let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'dinotestes12@gmail.com',
        pass:'xsmjlseiedinjove'
    },
    tls:{
        rejectUnauthorized:false
    }
})

module.exports={
    Register:(req,res)=>{
        const {username,email,password}=req.body
        let hashpassword=encrypt(password)
        let sql=`select * from users where username = ?`
        db.query(sql,[username],(err,datausers)=>{
            if (err) return res.status(500).send({message:err.message})
            if(datausers.length){
                return res.status(500).send({message:"username sudah diambil"})
            }else{
                var data={
                    username:username,
                    email,
                    password:hashpassword,
                    Lastlogin:new Date()
                }
                sql=`insert into users set ?`
                db.query(sql,data,(err,results)=>{
                    if (err) return res.status(500).send({message:err.message})
                    //usahakan dalam select jangan ambil column yang credential seperti password
                    //habis register otomatis login
                    db.query('select * from users where id = ?',[results.insertId],(err,userslogin)=>{
                        if (err) return res.status(500).send({message:err.message})
                        const htmlrender=fs.readFileSync('index.html','utf8')//html berubah jadi string
                        const template=handlebars.compile(htmlrender) //return function
                        //buat token
                        const token=createJWToken({id:userslogin[0].id,username:userslogin[0].username})
                        // tanpa token link dibawah ini
                        // const link=`http://localhost:3000/verified?id=${userslogin[0].id}`
                        // dengan token
                        const link=`http://localhost:3000/verified?token=${token}`
                        const htmlemail=template({name:userslogin[0].username,link:link})
                        transporter.sendMail({
                            from:"raja bajak laut <dinotestes12@gmail.com>",
                            to:email,
                            subject:'Hai BGST konfirm',
                            html:htmlemail
                        },(err)=>{
                            if (err) return res.status(500).send({message:err.message})
                            userslogin[0].token=token
                            return res.send(userslogin[0])
                        })
                    })
                })
            }
        })
    },
    // xsmjlseiedinjove
    Login:(req,res)=>{
        const {username,password}=req.body // ini dari users
        let hashpassword=encrypt(password)
        let sql=`select * from users where username = ? and password = ?`
        db.query(sql,[username,hashpassword],(err,datausers)=>{
            if (err) return res.status(500).send({message:err.message})
            if (!datausers.length){
                return res.status(500).send({message:'user tidak terdaftar'})
            }
            sql=`update users set ? where id = ${db.escape(datausers[0].id)}`
            var dataedit={
                Lastlogin:new Date()
            }
            db.query(sql,dataedit,(err)=>{
                if (err) return res.status(500).send({message:err.message})
                const token=createJWToken({id:datausers[0].id,username:datausers[0].username})
                datausers[0].token=token
                return res.send(datausers[0])
            })
        })
    },
    verified:(req,res)=>{
        //mau query atau params bebas kok
        console.log(req.user,'ini dari controller')
        const {id}=req.user
        let dataedit={
            isverified:true
        }
        let sql=`update users set ? where id = ${db.escape(id)}`
        db.query(sql,dataedit,(err)=>{
            if (err) return res.status(500).send({message:err.message})
            sql=`select * from users where id = ${db.escape(id)}`
            db.query(sql,(err,results)=>{
                if (err) return res.status(500).send({message:err.message})
                res.send(results[0])
            })
        })
    },
    sendverified:(req,res)=>{
        const {username,email,userid}=req.body
        const htmlrender=fs.readFileSync('index.html','utf8')//html berubah jadi string
        const template=handlebars.compile(htmlrender) //return function
        //buat token
        const token=createJWToken({id:userid,username:username})
        // tanpa token link dibawah ini
        // const link=`http://localhost:3000/verified?id=${userslogin[0].id}`
        // dengan token
        const link=`http://localhost:3000/verified?token=${token}`
        const htmlemail=template({name:username,link:link})
        transporter.sendMail({
            from:"raja bajak laut <dinotestes12@gmail.com>",
            to:email,
            subject:'Hai BGST konfirm ulang',
            html:htmlemail
        },(err)=>{
            if (err) return res.status(500).send({message:err.message})
            return res.send(true)
        })

    }
}