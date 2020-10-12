const mysqldb=require('./mysqldb')


module.exports={
    db:mysqldb,
    uri:require('./mongodb')
}