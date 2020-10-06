const {db}=require('../connection')


module.exports={
    getkaryawanbyid:(req,res)=>{
        // var id=db.escape(req.params.di)
        db.query(`select * from karyawan where no= ?`,[req.params.id],(err,results)=>{
            if (err) return res.status(500).send(err)
            res.send(results[0])
        })
    },
    getallKaryawan:(req,res)=>{
        var {page}=req.query
        var sql
        if(page){
            page=parseInt(page)
            sql=`select * from karyawan limit ${(page-1)*5},5` //5 itu jumlah tiap page
        }else{
            sql=`select * from karyawan`
        }
        db.query(sql,(err,results)=>{
            if (err){
                return res.status(500).send(err)
            }
            // console.log(results)
            return res.status(200).send(results)
        })
    },
    AddKaryawan:(req,res)=>{
        var data=req.body 
        console.log(req.body)
        // data harus object
        // nama property object harus sesuai dengan column sqlnya
        var sql=`insert into karyawan set ?` //cara pertama
        db.query(sql,data,(err)=>{
            if (err){
                return res.status(500).send(err)
            }
            console.log('berhasil insert')
            db.query('select * from karyawan',(err,results)=>{
                if(err) return res.status(500).send(err)
                return res.status(200).send(results)
            })
        })
    },
    deletekaryawan:(req,res)=>{
        var sql=`delete from karyawan where no = ${db.escape(req.params.id)}`
        db.query(sql,(err,results)=>{
            if (err){
                return res.status(500).send(err)
            }
            console.log('berhasil delete')
            db.query('select * from karyawan',(err,results1)=>{
                if (err){
                    return res.status(500).send(err)
                }
                return res.status(200).send(results1)
            })
        })
    },
    editkaryawan:(req,res)=>{
        var data=req.body 
        console.log(req.body)
        // data harus object
        // nama property object harus sesuai dengan colum yang mau di update atau ganti
        var sql=`update karyawan set ? where no = ${db.escape(req.params.id)}`
        db.query(sql,data,(err,results)=>{
            if (err){
                return res.status(500).send(err)
            }
            console.log('berhasil update')
            db.query('select * from karyawan',(err,results1)=>{
                if (err){
                    return res.status(500).send(err)
                }
                return res.status(200).send(results1)
            })
        })
    
    }
}