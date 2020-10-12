const KaryawanControllers=require('./karyawanControllers')
const AuthControllers=require('./Authcontrollers')
const ProductController = require('./productController')
const MongoController=require('./mongocontroller')
const MongooseController=require("./mongooseController")
const SocketController=require('./SocketControllers')

module.exports={
    KaryawanControllers,
    AuthControllers,
    ProductController,
    MongoController,
    MongooseController,
    SocketController
}