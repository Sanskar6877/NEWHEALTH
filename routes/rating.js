const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/healthcenter')
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})
const loginadmin=new mongoose.Schema({
    star:{
        type: String,
        required:true
    }, 
    description:{
        type: String,
        required:true
    },
    star1:{
        type: Number,
        required:true
    }, 
    doctorfeedback:{
        type: String,
        required:true
    },
    doctorname:{
        type: String,
        required:true
    },

   
   
}) 
 
const loginadmin2=new mongoose.model("rating",loginadmin)
 module.exports=loginadmin2