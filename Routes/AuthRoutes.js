const Router=require('express').Router()
const {AuthControllers}=require('./../controllers')


Router.post('/register',AuthControllers.Register)
Router.post('/login',AuthControllers.Login)

// cannot endpointnya belum adaa
module.exports=Router