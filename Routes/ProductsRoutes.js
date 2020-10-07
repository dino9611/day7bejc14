const Router=require('express').Router()
const {ProductController}=require('./../controllers')
// const {auth}=require('./../helpers/Auth')

Router.post('/addProd',ProductController.Addphoto)


// cannot endpointnya belum adaa
module.exports=Router