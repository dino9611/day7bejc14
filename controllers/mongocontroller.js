const MongoClient = require('mongodb').MongoClient;
const {ObjectID} =require('mongodb')
const uri = "mongodb+srv://dino9611:pwdk123@cluster0.ydv5x.mongodb.net/movies?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology:true});


module.exports={
    getdata:(req,res)=>{
        // try {
        //     await client.connect()
        //     const collection = client.db("sample_airbnb").collection("listingsAndReviews");
        //     let data= await collection.find().limit(3).project({name:1}).toArray()
        //     res.send(data)
        // } catch (error) {
        //     // console.log(error)
        // }finally{
        //     await client.close()
        // }
        
        // console.log(req.query)
        MongoClient.connect(uri,{ useUnifiedTopology:true},(err,client)=>{
            const collection = client.db("movies").collection("users");
            // select * from users where usename="dino"
            // select * from users where username like %dino%
            let username
            if(req.query.username){
                username={username:{'$regex':req.query.username,'$options':'i'}}
            }else{
                username={}
            }
            collection.find(username).limit(10).toArray((err,result)=>{
                if(err) {
                    console.log(err)
                    return res.status(500).send(err)
                }
                // client.close();
                console.log('bisa')    
                res.send(result)
            })
        })
    },
    addata:(req,res)=>{
        const data=req.body
        console.log(data)
        MongoClient.connect(uri,{ useUnifiedTopology:true},(err,client)=>{
            const collection = client.db("movies").collection("users");
            collection.insertMany(data,(err,result)=>{ //data array of object
                if(err){
                    return res.status(500).send(err)
                }
                // console.log('abcd')
                res.send(result)
            })
        })
    },
    updatedata:(req,res)=>{
        const data=req.body
        const {id}=req.params
        console.log(data)
        MongoClient.connect(uri,{ useUnifiedTopology:true},(err,client)=>{
            const collection = client.db("movies").collection("users");
            // update users set (username).... where _id=objectid(req.params.id)
            collection.updateOne({_id:new ObjectID(id)},{$set:{username:data.username}},(err,result)=>{ //data array of object
                if(err){
                    return res.status(500).send(err)
                }
                // console.log('abcd')
                res.send(result)
            })
        })
    }
}