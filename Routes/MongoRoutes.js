const Router=require('express').Router()
const {MongoController}=require('./../controllers')
const {auth}=require('./../helpers/Auth')

Router.get('/getdata',MongoController.getdata)
Router.post('/postdata',MongoController.addata)
Router.put('/editdata/:id',MongoController.updatedata)


module.exports=Router