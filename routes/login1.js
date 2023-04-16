

var express = require("express"); 
var router = express.Router(); 
const app=express();  
const path= require("path");
// var con = require('../connection');  
var createError = require('http-errors');


const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

 app.use("/assets",express.static("assets")); 
 app.set('views', path.join(__dirname, 'views'));
 app.set("view engine" , "ejs");
 app.use(express.static(__dirname + '/views'));

const { render } = require('ejs');

require("../routes/db/conn");

// const port = process.env.PORT || 5000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../views");
app.use(express.static(static_path));

// //mail
// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'bvcxz20232@gmail.com',
//     pass: ''
//   }
// });

// var mailOptions = {
//   from: 'bvcxz20232@gmail.com',
//   to: 'nvsssanskar6877@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'HELLO SIR!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
//mail

var rating=require("./rating");
var loginadmin=require("./loginadmin");
var loginstudent=require("./loginstudent");
var logindoctor=require("./logindoctor");
var doctordetails=require("./doctordetails");
var collection=require("./appointment");
var visitors=require("./visitors");
var note=require("./note");
var history1=require("./history");
var blood=require("./blood");

var doctorrating=require("./doctorrating");


app.use(express.urlencoded({ extended: false }));

router.get("/", function(req,res,next){
   res.render("homemain");
});  

router.get("/homemain",function(req,res,next) {
   res.render("homemain");
});   

router.get("/doctorlogin", function(req,res,next) {
    res.render("doctorlogin");
 });
 router.get("/studentlogin",function(req,res,next) {
    res.render("studentlogin");
 });
 router.get("/adminlogin", function(req,res,next) {
    res.render("adminlogin");
 });   
 router.get("/appointment",function(req,res,next) {
   res.render("appointment");
});  
router.get("/covid", function(req,res,next){
   res.render("covid");
});  
router.get("/status/:id", async function(req,res){
     var data5= req.params.id;
   res.render("status",{data5});
});  
router.get("/statusd/:id", async function(req,res){
   var data5= req.params.id;
 res.render("statusd",{data5});
});  
router.get("/feedback/:id/:id1/:id2/:doctor", async function(req,res){
   var data5= req.params.id;
   var e=req.params.id1;
   var p=req.params.id2;
   var assigneddoctor=req.params.doctor;
 res.render("feedback",{data5,e,p,assigneddoctor});
});  
router.get("/feedbacks/:id/:id1/:id2/:doctor", async function(req,res){
   var data5= req.params.id;
   var e=req.params.id1;
   var p=req.params.id2;
   var assigneddoctor=req.params.doctor;
 res.render("feedbacks",{data5,e,p,assigneddoctor});
}); 
router.get("/feedbackd/:id/:id1/:id2/:doctor", async function(req,res){
   var data5= req.params.id;
   var e=req.params.id1;
   var p=req.params.id2;
   var assigneddoctor=req.params.doctor;
 res.render("feedbackd",{data5,e,p,assigneddoctor});
}); 
router.get("/blood/:id", async function(req,res){
   var data5= req.params.id;
 res.render("blood",{data5});
});  
router.get("/bloods/:id", async function(req,res){
   var data5= req.params.id;
 res.render("bloods",{data5});
}); 
router.get("/bloodd/:id", async function(req,res){
   var data5= req.params.id;
 res.render("bloodd",{data5});
}); 
router.get("/bloodform/:id", async function(req,res){
   var data5= req.params.id;
 res.render("bloodform",{data5});
}); 
router.get("/bloodforms/:id", async function(req,res){
   var data5= req.params.id;
 res.render("bloodforms",{data5});
}); 
router.get("/bloodformd/:id", async function(req,res){
   var data5= req.params.id;
 res.render("bloodformd",{data5});
}); 
router.get("/admindashboards/:id",async function(req,res) {
   
   var data1;
   var data2;
   var data3;
   var data4;
   var data5=req.params.id;
   
   try{
       //first query
       let user_data = await loginadmin.count({}).exec();
       data1 = user_data;

       //second query
       let content_data = await loginstudent.count({}).exec();
       data3 = content_data;
 
       let content1_data = await doctordetails.count({}).exec();
       data2 = content1_data;

       let user_data2 = await collection.count({}).exec();
       data4 = user_data2;
       /////
       let five= await rating.count({star:5}).exec();
       rate5 = five;
       let four= await rating.count({star:4}).exec();
       rate4 = four;
       let three = await rating.count({star:3}).exec();
       rate3 = three;
       let two  = await rating.count({star:2}).exec();
       rate2 = two;
       let one = await rating.count({star:1}).exec();
       rate1 = one;
     

          
      
                  var sort = { rating : -1 };
                  doctorrating.find((err, data) => {
                        if (!err) {
                           res.render("admindashboard", {
                              data1,data2,data3,data4,data5,sampleData:data,rate5,rate4,rate3,rate2,rate1
                            });
                        } else {
                            console.log('Failed to retrieve the Course List: ');
                        }
                    }).sort(sort);   
           
        
}
catch(err){
 return res.status(400).json({err})
}
});  
router.get("/doctordashboards/:id",async function(req,res) {
   

 
try{ 
   // console.log(req.body);  
   const check=await logindoctor.findOne({
    name:req.params.id
   }) 

   
   if(check){
      
   
      var data1;
      var data2;
      var data3;
      var data4;
      var data5=check.name;
      var name1=check._id;
      
      try{
          //first query
          let user_data = await loginadmin.count({}).exec();
          data1 = user_data;
   
          //second query
          let content_data = await loginstudent.count({}).exec();
          data3 = content_data;
    
          let content1_data = await doctordetails.count({}).exec();
          data2 = content1_data;
          let user_data2 = await collection.count({}).exec();
          data4 = user_data2;
        
         
           
          
          let five= await rating.count({star:5}).exec();
          rate5 = five;
          let four= await rating.count({star:4}).exec();
          rate4 = four;
          let three = await rating.count({star:3}).exec();
          rate3 = three;
          let two  = await rating.count({star:2}).exec();
          rate2 = two;
          let one = await rating.count({star:1}).exec();
          rate1 = one;
        
                     var sort = { rating : -1 };
                     doctorrating.find((err, data) => {
                           if (!err) {
                              res.render("doctordashboard", {
                                 data1,data2,data3,data4,data5,name1,sampleData:data,rate5,rate4,rate3,rate2,rate1
                               });  
                           } else {
                               console.log('Failed to retrieve the Course List: ');
                           }
                       }).sort(sort); 
           
}
catch(err){
    return res.status(400).json({err})
}
    }else{
      res.render("invalid1")
   }
}catch{
   res.send("error")
}
})  ;

router.get("/studentdashboards/:id",async function(req,res) {
   

 
   try{ 
      // console.log(req.body);  
      const check=await loginstudent.findOne({
       name:req.params.id
      }) 
   
      
      if(check){
         
      
         var data1;
         var data2;
         var data3;
         var data4;
         var data5=check.name;
         var name1=check._id;
         
         try{
             //first query
             let user_data = await loginadmin.count({}).exec();
             data1 = user_data;
      
             //second query
             let content_data = await loginstudent.count({}).exec();
             data3 = content_data;
       
             let content1_data = await doctordetails.count({}).exec();
             data2 = content1_data;
             let user_data2 = await collection.count({}).exec();
             data4 = user_data2;
           
            
             let five= await rating.count({star:5}).exec();
             rate5 = five;
             let four= await rating.count({star:4}).exec();
             rate4 = four;
             let three = await rating.count({star:3}).exec();
             rate3 = three;
             let two  = await rating.count({star:2}).exec();
             rate2 = two;
             let one = await rating.count({star:1}).exec();
             rate1 = one;
             
      
           
                        var sort = { rating : -1 };
                        doctorrating.find((err, data) => {
                              if (!err) {
                                 res.render("studentdashboard", {
                                    data1,data2,data3,data4,data5,name1,sampleData:data,rate5,rate4,rate3,rate2,rate1
                                  });  
                              } else {
                                  console.log('Failed to retrieve the Course List: ');
                              }
                          }).sort(sort); 
                 
              
   }
   catch(err){
       return res.status(400).json({err})
   }
       }else{
         res.render("invalid1")
      }
   }catch{
      res.send("error")
   }
   })  ; 

 //adminlogin page

 router.post("/adminlogin",async function(req,res){ 
   console.log(req.body);  
   try{ 
     
      const check=await loginadmin.findOne({
       email:req.body.email
      }) 

      
      if(check){
         
      if(check.password===req.body.password){
         var data1;
         var data2;
         var data3;
         var data4;
         var data5=check.name;
         
         try{
             //first query
             let user_data = await loginadmin.count({}).exec();
             data1 = user_data;
      
             //second query
             let content_data = await loginstudent.count({}).exec();
             data3 = content_data;
       
             let content1_data = await doctordetails.count({}).exec();
             data2 = content1_data;
             let user_data2 = await collection.count({}).exec();
             data4 = user_data2;
           
            
              
             let five= await rating.count({star:5}).exec();
             rate5 = five;
             let four= await rating.count({star:4}).exec();
             rate4 = four;
             let three = await rating.count({star:3}).exec();
             rate3 = three;
             let two  = await rating.count({star:2}).exec();
             rate2 = two;
             let one = await rating.count({star:1}).exec();
             rate1 = one;
      
           
                        var sort = { rating : -1 };
                        doctorrating.find((err, data) => {
                              if (!err) {
                                 res.render("admindashboard", {
                                    data1,data2,data3,data4,data5,sampleData:data,rate5,rate4,rate3,rate2,rate1
                                  });  
                              } else {
                                  console.log('Failed to retrieve the Course List: ');
                              }
                          }).sort(sort); 
              
   }
   catch(err){
       return res.status(400).json({err})
   }
      }else{
         res.render("invalid1")
      } }else{
         res.render("invalid1")
      }
   }catch{
      res.send("error")
   }
})  

//student login page

router.post("/studentlogin",async function(req,res){ 
  
   try{ 
      // console.log(req.body);  
      const check=await loginstudent.findOne({
       email:req.body.email
      }) 
      
      if(check){
       
      if(check.password===req.body.password){
         var data1;
         var data2;
         var data3;
         var data4;
         var data5=check.name;
         try{
             //first query
             let user_data = await loginadmin.count({}).exec();
             data1 = user_data;
      
             //second query
             let content_data = await loginstudent.count({}).exec();
             data3 = content_data;
       
             let content1_data = await doctordetails.count({}).exec();
             data2 = content1_data;
             let user_data2 = await collection.count({}).exec();
             data4 = user_data2;
      
             let five= await rating.count({star:5}).exec();
             rate5 = five;
             let four= await rating.count({star:4}).exec();
             rate4 = four;
             let three = await rating.count({star:3}).exec();
             rate3 = three;
             let two  = await rating.count({star:2}).exec();
             rate2 = two;
             let one = await rating.count({star:1}).exec();
             rate1 = one;
                        var sort = { rating : -1 };
                        doctorrating.find((err, data) => {
                              if (!err) {
                                 res.render("studentdashboard", {
                                    data1,data2,data3,data4,data5,sampleData:data,rate5,rate4,rate3,rate2,rate1
                                  }); 
                              } else {
                                  console.log('Failed to retrieve the Course List: ');
                              }
                          }).sort(sort); 
                       
                    
         }
         catch(err){
             return res.status(400).json({err})
         }
      }else{
         res.render("invalid2")
      } }else{
         res.render("invalid2")
      }
   }catch{
      res.send("error")
   }
})  

//student login page

router.post("/doctorlogin",async function(req,res){ 
  
   try{ 
      // console.log(req.body);  
      const check=await logindoctor.findOne({
       email:req.body.email
      }) 
      
      if(check){
       
      if(check.password===req.body.password){
         var data1;
         var data2;
         var data3;
         var data4;
         var data5=check.name;
         var name1=check._id;
         try{
             //first query
             let user_data = await loginadmin.count({}).exec();
             data1 = user_data;
      
             //second query
             let content_data = await loginstudent.count({}).exec();
             data3 = content_data;
       
             let content1_data = await doctordetails.count({}).exec();
             data2 = content1_data;
             let user_data2 = await collection.count({}).exec();
             data4 = user_data2;
              
            //  res.render("doctordashboard", {
            //               data1,data2,data3,data4,data5,name1
            //             }); 
            let five= await rating.count({star:5}).exec();
            rate5 = five;
            let four= await rating.count({star:4}).exec();
            rate4 = four;
            let three = await rating.count({star:3}).exec();
            rate3 = three;
            let two  = await rating.count({star:2}).exec();
            rate2 = two;
            let one = await rating.count({star:1}).exec();
            rate1 = one;
            var sort = { rating : -1 };
                     doctorrating.find((err, data) => {
                           if (!err) {
                               res.render("doctordashboard", {
                                  sampleData:data,data5,data4,data3,data1,data2,name1,rate5,rate4,rate3,rate2,rate1
                               });
                           } else {
                               console.log('Failed to retrieve the Course List: ');
                           }
                       }).sort(sort); 
                    
         }
         catch(err){
             return res.status(400).json({err})
         }
      }else{
         res.render("invalid3")
      } }else{
         res.render("invalid3")
      }
   }catch{
      res.send("error")
   }
}) 


// router.get("/doctors",function(req,res,next) {
//    res.render("appointment");
// });  

//doctordetails
router.get('/doctorsa/:id', (req, res)=> {
      var data5=req.params.id;
   doctordetails.find((err, data) => {
       if (!err) {
           res.render("list1a", {
              sampleData:data,data5
           });
       } else {
           console.log('Failed to retrieve the Course List: ');
       }
   });   
});
router.get('/doctors/:id', (req, res)=> {
   var data5=req.params.id;
   doctordetails.find((err, data) => {
       if (!err) {
           res.render("list1", {
              sampleData:data,data5
           });
       } else {
           console.log('Failed to retrieve the Course List: ');
       }
   });   
});
router.get('/doctorsd/:id', (req, res)=> {
   var data5=req.params.id;
   doctordetails.find((err, data) => {
       if (!err) {
           res.render("list1d", {
              sampleData:data,data5
           });
       } else {
           console.log('Failed to retrieve the Course List: ');
       }
   });   
});
   
   router.get('/timingsadmin/:id', (req, res)=> {
      var data5=req.params.id;
      doctordetails.find((err, data) => {
         if (!err) {
          note.find((err, data1) => {
             if (!err) {
                 res.render("list2admin", {
                    sampleData:data,sampleData1:data1,data5
                 });
             } else {
                 console.log('Failed to retrieve the Course List: ');
             }
         });  
            
         } else {
             console.log('Failed to retrieve the Course List: ');
         }
     });  
   });
   router.get('/timings/:id', (req, res)=> {
      var data5=req.params.id;
      doctordetails.find((err, data) => {
         if (!err) {
          note.find((err, data1) => {
             if (!err) {
                 res.render("list2", {
                    sampleData:data,sampleData1:data1,data5
                 });
             } else {
                 console.log('Failed to retrieve the Course List: ');
             }
         });  
            
         } else {
             console.log('Failed to retrieve the Course List: ');
         }
     });   
    });
    router.get('/timingsd/:id', (req, res)=> {
      var data5=req.params.id;
      doctordetails.find((err, data) => {
         if (!err) {
          note.find((err, data1) => {
             if (!err) {
                 res.render("list2d", {
                    sampleData:data,sampleData1:data1,data5
                 });
             } else {
                 console.log('Failed to retrieve the Course List: ');
             }
         });  
            
         } else {
             console.log('Failed to retrieve the Course List: ');
         }
     });   
    });
   router.get('/visitors/:id', (req, res)=> {
      var data5=req.params.id;
      visitors.find((err, data) => {
           if (!err) {
               res.render("list3", {
                  sampleData:data,data5
               });
           } else {
               console.log('Failed to retrieve the Course List: ');
           }
       });  
    });
    router.get('/visitorsd/:id', (req, res)=> {
      var data5=req.params.id;
      visitors.find((err, data) => {
           if (!err) {
               res.render("list3d", {
                  sampleData:data,data5
               });
           } else {
               console.log('Failed to retrieve the Course List: ');
           }
       });  
    });
    router.get('/visitors1/:id', (req, res)=> {
      var data5=req.params.id;
      visitors.find((err, data) => {
           if (!err) {
               res.render("list4", {
                  sampleData:data,data5
               });
           } else {
               console.log('Failed to retrieve the Course List: ');
           }
       });  
    });
    //appointmentsdisplay
    router.get('/aps/:id', (req, res)=> {
      var data5=req.params.id;
      var sort = { date : 1 };
     collection.find((err, data) => {
           if (!err) {
               res.render("list5", {
                  sampleData:data,data5
               });
           } else {
               console.log('Failed to retrieve the Course List: ');
           }
       }).sort(sort);  
    });
    router.get('/deletevisitor/:id/:id1', (req, res, next)=> {
     var data5=req.params.id1;
      visitors.findByIdAndDelete({_id: req.params.id},(err, data) => { 
           
           if (!err) { 
               res.render("visitordelete",{data5});
           } else {
               console.log('Failed to delete: ');
               next(err);
           }
       });  
    });
    router.get('/deletedoctor/:id/:id1', (req, res, next)=> {
      var data5=req.params.id1;
       doctordetails.findByIdAndDelete({_id: req.params.id},(err, data) => { 
            
            if (!err) { 
                res.render("doctordelete",{data5});
            } else { 
                console.log('Failed to delete: ');
                next(err);
            }
        });  
     });
    
    //delete patient
    router.get('/deletepatient/:id/:id1', async(req, res, next)=> {
     var data5=req.params.id1;
     const check=await collection.findOne({
      _id:req.params.id
     }) 
     
     await history1.insertMany([check]);
      collection.findByIdAndDelete({_id: req.params.id},(err, data) => { 
           
           if (!err) {
               res.render("deletesuccess",{data5});
           } else {
               console.log('Failed to delete: ');
               next(err);
           }
       });  
    });

    //accept patient
    router.post('/accepts/:id/:id1',async (req, res, next)=> {
      var data5=req.params.id1;
      collection.findByIdAndUpdate({_id: req.params.id},req.body,(err, data) => { 
           
         if (!err) {
             res.render("acceptsuccess",{data5});
         } else {
             console.log('Failed to update: ');
             next(err);
         }
     });  
            
    });
  

    router.get('/acceptpage/:id/:id1',async(req, res, next)=> {
                var name1=req.params.id;
                var data5=req.params.id1;
                
                doctordetails.find((err, data) => {
                  if (!err) {
                     res.render("accept",{name1,data5,
                     sampleData:data});
                  } else {
                      console.log('Failed to retrieve the Course List: ');
                  }
              });   

           
         
            
    });
   
    router.post("/adddoctor/:id",async(req,res)=>{
      var name1=req.params.id;
     
      const data={
         name:req.body.name,
         email:req.body.email,
         qualification:req.body.qualification,
         specialization:req.body.specialization,
         available:req.body.available,
        timings:req.body.timings1+" - "+req.body.timings2,
         type:req.body.type
   
      } 
      if( req.body.type=="visitor"){
      
      await visitors.insertMany([data])
      res.render("success1",{name1});
    
   
   }
      else{
         await doctordetails.insertMany([data])
         res.render("success1",{name1});
      }
   })


// router.get('/admincount', (req, res)=> {
    
   
//  loginadmin.count((err, data) => {
//       if (!err) { 
//          res.render("list2", {
//           data
//          }); 
        
//       } else {
//           console.log('Failed to retrieve the count: ');
//       }
//   });  
  
   

// });  
router.get('/admincount', async function(req, res) {
   var data1;
   var data2;
   var data3;
   try{
       //first query
       let user_data = await loginadmin.count({}).exec();
       data1 = user_data;

       //second query
       let content_data = await loginstudent.count({}).exec();
       data2 = content_data;
 
       let content1_data = await logindoctor.count({}).exec();
       data3 = content1_data;
       res.render("list2", {
                    data1,data2,data3
                  }); 
                 
              
   }
   catch(err){
       return res.status(400).json({err})
   } 
}); 
//appointment form

router.post("/appointmentss/:id",async(req,res)=>{
   var name1=req.params.id;
   const data={
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      date:req.body.date+' time '+req.body.time,
      age:req.body.age,
      symptoms:req.body.symptoms,
      days:req.body.days,
      sheduledtime:"not yet sheduled",
      assigneddoctor:"Not Yet Assigned"
     
   } 
   await collection.insertMany([data])
   res.render("success",{name1});
})
router.post("/appointmentsd/:id",async(req,res)=>{
   var name1=req.params.id;
   const data={
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      date:req.body.date+' time '+req.body.time,
      age:req.body.age,
      symptoms:req.body.symptoms,
      days:req.body.days,
      sheduledtime:"not yet sheduled",
      assigneddoctor:"Not Yet Assigned"
      
   }
   await collection.insertMany([data])
   res.render("successd",{name1});
})
router.post("/appointmentsa/:id",async(req,res)=>{
   var name1=req.params.id;
   const data={
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      date:req.body.date+' time '+req.body.time,
      age:req.body.age,
      symptoms:req.body.symptoms,
      days:req.body.days,
      sheduledtime:"not yet sheduled",
      assigneddoctor:"Not Yet Assigned"
      
   }
   await collection.insertMany([data])
   res.render("successa",{name1});
})
//displaydoctorappointmenst
router.get('/displayappointments/:id', async(req, res, next)=> {
   var sort = { date : 1 };
   var name1=await logindoctor.findOne({_id: req.params.id});
    var name2=name1.name;
    
   collection.find({assigneddoctor:name2},(err, data) => { 
         
        if (!err) { 
            res.render("list6",{sampleData:data});
        } else {
            console.log('Failed to delete: ');
            next(err);
        }
    }).sort(sort);  
 });
router.post("/note/:id",async(req,res)=>{
   const data={
      note:req.body.note
    }
    var p=req.params.id;
    await note.deleteMany({});
   await note.insertMany([data]);
   res.render("timingsupdated",{p});
   
})
//appointment details
router.post("/statuss/:id",async function(req,res){ 
    var name1=req.params.id;
   try{ 
       
      const check=await collection.findOne({
       email:req.body.email
      }) 
      
      if(check){
       
      if(check.phone===req.body.phone){
         var data1=check.name;
         var data2=check.email;
         var data3=check.phone;
         var data4=check.age;
         var data5=check.symptoms;
         var data6=check.sheduledtime;
         var data7=check.assigneddoctor;
         
       

         // try{
         //     //first query
         //     let user_data = await loginadmin.count({}).exec();
         //     data1 = user_data;
      
         //     //second query
         //     let content_data = await loginstudent.count({}).exec();
         //     data3 = content_data;
       
         //     let content1_data = await doctordetails.count({}).exec();
         //     data2 = content1_data;
         //     let user_data2 = await collection.count({}).exec();
         //     data4 = user_data2;
                
             res.render("display",{data1,data2,data3,data4,data5,data6,data7,name1}); 
                   
                    
         
        
      }else{
         res.render("invalid4",{name1})
      }
    }else{
      res.render("invalid4",{name1})
    }
     
   }
   catch{
      res.send("error")
   }
})  
router.post("/statussd/:id",async function(req,res){ 
   var name1=req.params.id;
  try{ 
      
     const check=await collection.findOne({
      email:req.body.email
     }) 
     
     if(check){
      
     if(check.phone===req.body.phone){
        var data1=check.name;
        var data2=check.email;
        var data3=check.phone;
        var data4=check.age;
        var data5=check.symptoms;
        var data6=check.sheduledtime;
        var data7=check.assigneddoctor;
        
      

        // try{
        //     //first query
        //     let user_data = await loginadmin.count({}).exec();
        //     data1 = user_data;
     
        //     //second query
        //     let content_data = await loginstudent.count({}).exec();
        //     data3 = content_data;
      
        //     let content1_data = await doctordetails.count({}).exec();
        //     data2 = content1_data;
        //     let user_data2 = await collection.count({}).exec();
        //     data4 = user_data2;
               
            res.render("displayd",{data1,data2,data3,data4,data5,data6,data7,name1}); 
                  
                   
        
       
     }else{
        res.render("invalid4d",{name1})
     }
   }else{
     res.render("invalid4d",{name1})
   }
    
  }
  catch{
     res.send("error")
  }
}) 
//doctoradd
//img
router.post("/appointmenttt",async(req,res)=>{
   var name1=req.params.id;
   const data={
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      date:req.body.date+' time '+req.body.time,
      age:req.body.age,
      symptoms:req.body.symptoms,
      days:req.body.days,
      sheduledtime:"not yet sheduled",
      assigneddoctor:"Not Yet Assigned",
      img:req.body.file
     
   } 
   await collection.insertMany([data])
   res.render("success",{name1});
})
//
router.get("/historys/:id", function(req,res,next) {
   var data5=req.params.id;
   res.render("status1s",{data5});
});
router.post("/historyss/:id",async function(req,res,next){ 
   var data5=req.params.id;
   var sort = { date : 1 };
      
  history1.find({email:req.body.email,phone:req.body.phone},(err, data) => { 
   var e=req.body.email;
   var p=req.body.phone;
      if (!err) { 
          res.render("list7s",{sampleData:data,data5,e,p});
      } else {
          console.log('Failed to delete: ');
          next(err);
      }
  }).sort(sort);  
})  

router.get("/list7s/:id/:id1/:id2",async function(req,res,next){ 
   var data5=req.params.id;
   var sort = { date : 1 };
   var e=req.params.id1;
   var p=req.params.id2;
  history1.find({email:req.params.id1,phone:req.params.id2},(err, data) => { 
  
      if (!err) { 
          res.render("list7s",{sampleData:data,data5,e,p});
      } else {
          console.log('Failed to delete: ');
          next(err);
      }
  }).sort(sort);  
})  
//
router.get("/historya/:id", function(req,res,next) {
   var data5=req.params.id;
   res.render("status1a",{data5});
});
router.post("/historysa/:id",async function(req,res,next){ 
   var data5=req.params.id;
   var sort = { date : 1 };
   var e=req.body.email;
   var p=req.body.phone;
  history1.find({email:req.body.email,phone:req.body.phone},(err, data) => { 
         
      if (!err) { 
          res.render("list7",{sampleData:data,data5,e,p});
      } else {
          console.log('Failed to delete: ');
          next(err);
      }
  }).sort(sort);  
})  
router.get("/list7/:id/:id1/:id2",async function(req,res,next){ 
   var data5=req.params.id;
   var sort = { date : 1 };
   var e=req.params.id1;
   var p=req.params.id2;
  history1.find({email:req.params.id1,phone:req.params.id2},(err, data) => { 
  
      if (!err) { 
          res.render("list7",{sampleData:data,data5,e,p});
      } else {
          console.log('Failed to delete: ');
          next(err);
      }
  }).sort(sort);  
})  
//
router.get("/historyd/:id", function(req,res,next) {
   var data5=req.params.id;
   res.render("status1d",{data5});
});
router.post("/historysd/:id",async function(req,res,next){ 
   var data5=req.params.id;
   var sort = { date : 1 };
      var e=req.body.email;
      var p=req.body.phone;
  history1.find({email:req.body.email,phone:req.body.phone},(err, data) => { 
         
      if (!err) { 
          res.render("list7d",{sampleData:data,data5,e,p});
      } else {
          console.log('Failed to delete: ');
          next(err);
      }
  }).sort(sort);  
})  
router.get("/list7d/:id/:id1/:id2",async function(req,res,next){ 
   var data5=req.params.id;
   var sort = { date : 1 };
   var e=req.params.id1;
   var p=req.params.id2;
  history1.find({email:req.params.id1,phone:req.params.id2},(err, data) => { 
   
      if (!err) { 
          res.render("list7d",{sampleData:data,data5,e,p});
      } else {
          console.log('Failed to delete: ');
          next(err);
      }
  }).sort(sort);  
})  
//feeedback
router.post("/feedback/:id/:id1/:id2/:doctor",async(req,res)=>{
   var data5=req.params.id;
   
   
   const data={
      star:req.body.rate,
      description:req.body.feedback,
      star1:req.body.rate1,
      doctorfeedback:req.body.doctorfeedback,
      doctorname:req.params.doctor

   } 
   const data1={
      name:req.params.doctor,
      rating:req.body.rate1
   }  
   const check=await doctorrating.findOne({
      name:req.params.doctor
     }) 
     if(check){
      var newvalues = { rating:  req.body.rate1 };

      if(req.body.rate1>check.rating){
    
      doctorrating.updateMany({name: req.params.doctor},newvalues,(err, data2) => { 
            
         console.log(newvalues);
         console.log('navya');
         
        
     });  
   }
          
         
  
     }else{
      await doctorrating.insertMany([data1])
     }
      
   await rating.insertMany([data])

   res.render("successr",{data5});

})
router.post("/feedbacks/:id/:id1/:id2/:doctor",async(req,res)=>{
   var data5=req.params.id;
  
   const data={
      star:req.body.rate,
      description:req.body.feedback,
      star1:req.body.rate1,
      doctorfeedback:req.body.doctorfeedback,
      doctorname:req.params.doctor
     

   } 
 
   await rating.insertMany([data])
   res.render("successr",{data5});

})
router.post("/feedbackd/:id/:id1/:id2/:doctor",async(req,res)=>{
   var data5=req.params.id;
  
   const data={
      star:req.body.rate,
      description:req.body.feedback,
      star1:req.body.rate1,
      doctorfeedback:req.body.doctorfeedback,
      doctorname:req.params.doctor
     

   } 
 
   await rating.insertMany([data])
   res.render("successr",{data5});

}) 
router.get('/review/:id', (req, res)=> {
   var data5=req.params.id;
   
  rating.find((err, data) => {
        if (!err) {
            res.render("displayfeedback", {
               sampleData:data,data5
            });
        } else {
            console.log('Failed to retrieve the Rating List: ');
        }
    });  
 });
 router.get('/reviews/:id', (req, res)=> {
   var data5=req.params.id;
   
  rating.find((err, data) => {
        if (!err) {
            res.render("displayfeedbacks", {
               sampleData:data,data5
            });
        } else {
            console.log('Failed to retrieve the Rating List: ');
        }
    });  
 });
 router.get('/reviewd/:id', (req, res)=> {
   var data5=req.params.id;
   
  rating.find((err, data) => {
        if (!err) {
            res.render("displayfeedbackd", {
               sampleData:data,data5
            });
        } else {
            console.log('Failed to retrieve the Rating List: ');
        }
    });  
 });
 router.post("/addblood/:id",async(req,res)=>{
   var data5=req.params.id;
  
   const data={
      name:req.body.name,
      email:req.body.email,
      
      group:req.body.group

   } 
  
   
   await blood.insertMany([data])
   res.render("successblood",{data5});
 


});
router.post("/addbloods/:id",async(req,res)=>{
   var data5=req.params.id;
  
   const data={
      name:req.body.name,
      email:req.body.email,
      
      group:req.body.group

   } 
  
   
   await blood.insertMany([data])
   res.render("successbloods",{data5});
 


});
router.post("/addbloodd/:id",async(req,res)=>{
   var data5=req.params.id;
  
   const data={
      name:req.body.name,
      email:req.body.email,
      
      group:req.body.group

   } 
  
   
   await blood.insertMany([data])
   res.render("successbloodd",{data5});
 


});

module.exports=router;


 