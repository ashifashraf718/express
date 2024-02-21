const express=require('express')
const app=express()
const mongoose=require('mongoose')
const  UserRouter=require('./Router/Auth')
 
  
// app.get('/',(req,res)=>{
//     res.send('ashif')
// })
mongoose.connect("mongodb+srv://ashifashraf718:ashif098@cluster0.qck0rsd.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log('database are conected');
}).catch((err)=>{
  console.log(err.message); 
})
app.use(express.json())
app.use('/data',UserRouter)

// app.post('/',function(req,res){
//     res.send("success")

// })

app.listen(5000,()=>{
    console.log('port 5000 is connected');
})