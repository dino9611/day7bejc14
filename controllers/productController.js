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
                const { image } = req.files;
                console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                console.log(imagePath)
                console.log(req.body.data)
                const data = JSON.parse(req.body.data); 
                data.image=imagePath
                console.log(data)
                db.query('insert into products set ?',data,(err)=>{
                    if (err) return res.status(500).send(err)
                    return res.status(200).send('success upload')
                })
            })
        
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    //1. delete foto get dulu datanya, terus hapus fotonya di server delete pakai id
    // 2. delete data di sqlnya
    // 3. delete fotonya syntaxnya fs.unlinksync(path foto) contoh ('./public/foto/TES1602046037110.jpeg')
    // edit foto
    // 1. upload foto baru ke server caranya sama seperti add foto
    // 2. setelah berhasil upload delete foto yang lama diserver 
    // 3. update data sql di sqlnya

}