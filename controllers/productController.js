const {uploader}=require('./../helpers/uploader')
const fs=require('fs')
const {db}=require("./../connection")
module.exports={
    Addphoto:(req,res)=>{
        try {
            const path='/foto'//ini terserah
            const upload=uploader(path,'TES').fields([{ name: 'image'}])
            upload(req,res,(err)=>{
                if(err){
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }
                console.log('berhasil upload')
                console.log(req.files)
                const {image} = req.files;
                console.log(image)
                // console.log(robin)
                const imagePath = image ? path + '/' + image[0].filename : null;
                console.log(imagePath)
                console.log(req.body.data)
                const data = JSON.parse(req.body.data); 
                data.image=imagePath
                console.log(data)
                // res.send('berhasil')
                db.query('insert into products set ?',data,(err)=>{
                    if (err){
                        if(imagePath){
                            fs.unlinkSync('./public'+imagePath)
                        }
                        return res.status(500).send(err)
                    }
                    let sql=`select * from products`
                    db.query(sql,(err,dataproduct)=>{
                        if (err) return res.status(500).send(err)
                        return res.status(200).send(dataproduct)
                    })
                })
            })
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    getAllProd:(req,res)=>{
        let sql=`select * from products`
        db.query(sql,(err,dataproduct)=>{
            if (err) return res.status(500).send(err)
            return res.status(200).send(dataproduct)
        })
    },
    deleteProd:(req,res)=>{
        const {id}=req.params
        let sql=`select * from products where id =${db.escape(id)}`
        db.query(sql,(err,dataproduct)=>{
            if(err) return res.status(500).send(err)
            if(dataproduct.length){
                sql=`delete from products where id =${db.escape(id)}`
                db.query(sql,(err)=>{
                    if(err) return res.status(500).send(err)

                    if(dataproduct[0].image){
                        fs.unlinkSync('./public'+dataproduct[0].image)
                    }

                    sql=`select * from products`
                    db.query(sql,(err,allproduct)=>{
                        if (err) return res.status(500).send(err)
                        return res.status(200).send(allproduct)
                    })
                })
            }else{
                return res.status(500).send('product tidak ada')
            }
        })
    },
    editProd:(req,res)=>{
        const {id}=req.params
        let sql=`select * from products where id =${db.escape(id)}`
        console.log('dsdas')
        db.query(sql,(err,results)=>{
            if(err) return res.status(500).send(err)
            if(results.length){
                try {
                    const path='/foto'//ini terserah
                    const upload=uploader(path,'TES').fields([{ name: 'image'}])
                    upload(req,res,(err)=>{
                        if(err){
                            return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                        }
                        console.log('berhasil upload edit')
                        // console.log(req.files)
                        const {image} = req.files;
                        const imagePath = image ? path + '/' + image[0].filename : null;
                        console.log(imagePath)
                        // console.log(req.body.data)
                        const data = JSON.parse(req.body.data);
                        if(imagePath){
                            data.image=imagePath
                        }
                        sql=`Update products set ? where id = ${db.escape(id)}`
                        db.query(sql,data,(err)=>{ //hanya perlu error jadi result tidak ditulis
                            if (err){
                                if(imagePath){
                                    fs.unlinkSync('./public'+imagePath)
                                }
                                return res.status(500).send(err)
                            }
                            if(imagePath) {//hapus foto lama
                                if(results[0].image){
                                    fs.unlinkSync('./public' + results[0].image);
                                }
                            }
                            sql=`select * from products`
                            db.query(sql,(err,allproduct)=>{
                                if (err) return res.status(500).send(err)
                                return res.status(200).send(allproduct)
                            })
                        })
                    })
                } catch (error) {
                    return res.status(500).send(error)
                }
            }else{
                return res.status(500).send('product tidak ada')
            }

        })
    }
    //1. delete foto get dulu datanya, terus hapus fotonya di server delete pakai id
    // 2. delete data di sqlnya
    // 3. delete fotonya syntaxnya fs.unlinksync(path foto) contoh ('./public/foto/TES1602046037110.jpeg')
    // edit foto
    // 1. upload foto baru ke server caranya sama seperti add foto
    // 2. setelah berhasil upload delete foto yang lama diserver 
    // 3. update data sql di sqlnya

}