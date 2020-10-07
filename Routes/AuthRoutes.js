const Router=require('express').Router()
const {AuthControllers}=require('./../controllers')
const {auth}=require('./../helpers/Auth')

Router.post('/register',AuthControllers.Register)
Router.post('/login',AuthControllers.Login)
Router.post('/sendverify',AuthControllers.sendverified)
Router.get('/verified',auth,AuthControllers.verified)
Router.get('/keeplogin/:id',AuthControllers.keeplogin)

// cannot endpointnya belum adaa
module.exports=Router