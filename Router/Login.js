const router=require("express").Router()
const user=require("../model/userSchema")
const crypto=require("crypto-js")
const jwt=require("jsonwebtoken")


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
        console.log("login password",req.body.password);

         originalPassword != req.body.password && res.status(401).json("invalid password")


        const accesKey=jwt.sign({
            id:findData._id
        },process.env.jwtSecKey,{ expiresIn: '1h' })

        console.log("acces key :",accesKey);



        const {_id,...others}=findData._doc

        // console.log("id:",_id);

        res.status(200).json({_id,accesKey})
    } catch (error) {
        
    }
})

module.exports=router