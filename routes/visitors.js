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
    qualification:{
        type: String,
        required:true
    },
    specialization:{
        type: String,
        required:true
    },
   timings:{
        type: String,
        required:true
    },
    available:{
        type: String,
        required:true
    }

}) 
 
const loginadmin2=new mongoose.model("visitor",loginadmin)
 module.exports=loginadmin2