const mongoose=require("mongoose")
const Userschemedata=new mongoose.Schema({
    Username:{type:String,required:true},
    Email:{type:String,unique:true,required:true},
    Mob:{type:String,required:true},
    Address:{type:String,required:true},
    Pin:{type:Number,required:true},
    Password:{type:String,required:true}
})
module.exports=mongoose.model('ashif2024',Userschemedata)