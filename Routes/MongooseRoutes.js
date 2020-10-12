const Router=require('express').Router()
const {MongooseController}=require('./../controllers')
// const {getkaryawanbyid}=KaryawanControllers


Router.get('/getdata',MongooseController.getdata)


module.exports=Router