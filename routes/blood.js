const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/healthcenter')
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})
const loginadmin=new mongoose.Schema({
    name:{
        type: String,
        required:true
    }, 
    
    email:{
        type: String,
        required:true
    },
   group:{
        type: String,
        required:true
    }
   
   
}) 
 
const loginadmin2=new mongoose.model("blood",loginadmin)
 module.exports=loginadmin2