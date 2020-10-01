const Router=require('express').Router()
const {KaryawanControllers}=require('./../controllers')
// const {getkaryawanbyid}=KaryawanControllers


Router.get('/karyawan/:id',KaryawanControllers.getkaryawanbyid)
Router.get('/karyawans',KaryawanControllers.getallKaryawan)
Router.post('/karyawan',KaryawanControllers.AddKaryawan)
Router.delete('/karyawan/:id',KaryawanControllers.deletekaryawan)
Router.put('/karyawan/:id',KaryawanControllers.editkaryawan)

module.exports=Router