const Router=require('express').Router()
const {ProductController}=require('./../controllers')
// const {auth}=require('./../helpers/Auth')

Router.post('/addProd',ProductController.Addphoto)
Router.get('/allprod',ProductController.getAllProd)
Router.delete('/delprod/:id',ProductController.deleteProd)
Router.put('/editprod/:id',ProductController.editProd)


// cannot endpointnya belum adaa
module.exports=Router