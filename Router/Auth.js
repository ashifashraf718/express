const router=require('express').Router()
const User=require('../model/userSchema')
const crypto=require("crypto-js")


router.post('/signup',async(req,res)=>{
    console.log("Req.body",req.body);
    console.log(process.env.passwordSec);
    try{
        const newData=new User({
            Username:req.body.name,
            Email:req.body.email,
            Mob:req.body.mob,
            Address:req.body.address,
            Pin:req.body.pin,
            Password:crypto.AES.encrypt(req.body.password,process.env.passwordSec).toString()
        })
        const saveData=await newData.save()
        console.log("savadata",saveData);
        res.status(200).json(saveData)
    
    }catch(err){
        res.status(500).json("failed")
    }
})


router.get("/getOneData",async (req,res)=>{
    try {
        const dataBaseData=await User.findOne({Email:req.body.email})
        console.log("databasedata",dataBaseData);
        res.status(200).json(dataBaseData)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/fetchData",async (req,res)=>{
    try {
        const dataBaseData=await User.find()
        console.log("databasedata",dataBaseData);
        res.status(200).json(dataBaseData)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/getData/:id",async (req,res)=>{
    console.log("data by id",req.params.id);
    try {
        const dataBaseData=await User.findById(req.params.id)
        console.log("databasedata",dataBaseData);
        res.status(200).json(dataBaseData)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/queryData",async (req,res)=>{
    console.log("query data",req.query);
    try {
        const dataBaseData=await User.findOne({Email:req.query.email})
        console.log("queryDataBAse",dataBaseData);
        res.status(200).json(dataBaseData)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put("/updateData",async (req,res)=>{
    try {
        const updatedData=await User.findByIdAndUpdate(req.query.id,{
            $set:{Username:req.body.name,...req.body}
        },{new:true})
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.delete("/deleteData/:id",async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted successfully")
    }catch(err){
        res.status(500).json(err.message)
    }
})




module.exports=router




