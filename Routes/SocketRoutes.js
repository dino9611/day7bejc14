const Router=require('express').Router()
const {SocketController}=require('./../controllers')
const SocketControllers = require('../controllers/SocketControllers')

// const {getkaryawanbyid}=KaryawanControllers


Router.get('/getdata',SocketControllers.getMessages)
Router.post('/senddata',SocketControllers.sendMessage)
Router.delete('/clearmessages',SocketControllers.clearMessages)


module.exports=Router