const ProductRoutes=require('./productRoutes')
const ProductsRoutes=require('./ProductsRoutes')
const KaryawanRoutes=require('./karyawanRoutes')
const AuthRoutes=require('./AuthRoutes')
const MongoRoutes=require('./MongoRoutes')
const Mongooseroutes=require('./MongooseRoutes')

module.exports={
    ProductRoutes,
    KaryawanRoutes,
    AuthRoutes,
    ProductsRoutes,
    MongoRoutes,
    Mongooseroutes,
    SocketRoutes:require('./SocketRoutes')
}