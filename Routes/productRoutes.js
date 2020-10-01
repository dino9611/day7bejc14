const Router=require('express').Router()

const database=[
    {
        id:1,
        namaProd:'Popok Hokage',
        deskripsi:'membuat anda keren',
        harga:20000
    },
    {
        id:2,
        namaProd:'Popok ujian chunin',
        deskripsi:'membuat anda menjadi sasukeh',
        harga:60000
    },
    {
        id:3,
        namaProd:'indomie',
        deskripsi:'membuat anda kenyang',
        harga:10000
    }
]
// 1. buat api yang responsenya semua product 
// localhost:5000/products berarti artinya semua
// 2. buat 1 api search product contoh api  
// localhost:5000/products?namaProd=popok&&hargamin=15000&&hargamax=50000
// localhost:5000/products?namaProd=popok&&hargamin=20000
// 3. buat api post localhost:5000/products
// 4. delete localhost:5000/products/id
// 5. put/patch localhost:5000/products/id

Router.get('/',(req,res)=>{
    // var namaProd=req.query.namaProd
    // {
    //     namaProd:'popok',
    //     hargamin:'15000',
    //     hargamax:'50000'
    // }
    // var hargamin=req.query.hargamin
    // var hargamax=req.query.hargamax
    var {namaProd,hargamin,hargamax}=req.query
    if(namaProd || hargamin || hargamax){
        var filterdata=database.filter((val)=>{
            var hargamin1=true
            var hargamax1=true
            var namaProd2=true
            if(hargamin){
                hargamin1=hargamin<=val.harga
            }
            if(hargamax){
                hargamax1=hargamax>=val.harga
            }
            if(namaProd){
                namaProd2=val.namaProd.toLowerCase().includes(namaProd.toLowerCase())
            }
            return hargamax1&&hargamin1&&namaProd2
        })
        res.send(filterdata)
    }else{
        res.send(database)
    }
})

Router.post('/',(req,res)=>{
    var {namaProd,deskripsi,harga}=req.body
    if(namaProd||deskripsi||harga){
        database.push({
            id:database.length+1,
            namaProd,
            deskripsi,
            harga
        })
        res.status(200).send(database)
    }else{
        return res.status(300).send('error harus lebih dari 3 prop')
    }
})
Router.put('/:id',(req,res)=>{
    var {id}=req.params
    var index=database.findIndex((val)=>val.id==id)
    database[index]={...database[index],...req.body}
    res.send(database)
})
Router.delete('/:id',(req,res)=>{
    var {id}=req.params
    var index=database.findIndex((val)=>val.id==id)
    database.splice(index,1)
    res.send(database)
})


module.exports=Router