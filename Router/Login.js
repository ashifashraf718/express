const router=require("express").Router()
const user=require("../model/userSchema")
const crypto=require("crypto-js")


router.post("/login",async(req,res)=>{

    console.log("---------------------------------");
    try {
        const findData=await user.findOne({Email:req.body.email})
        console.log("find data :",findData);
        !findData && res.status(401).json("invalid email")
        const HashedPassword=crypto.AES.decrypt(findData.Password,process.env.passwordSec)
        console.log("hashed password",HashedPassword);
        const originalPassword=HashedPassword.toString(crypto.enc.Utf8)
        console.log("original password",originalPassword);



        originalPassword!=res.body.password && res.status(401).json("invalid password")
        res.status(200),json("success")
    } catch (error) {
        
    }
})

module.exports=router