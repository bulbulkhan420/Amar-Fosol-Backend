let {buyer,seller}=require('../Model/db.js')
let bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
let env=require('dotenv').config();
let {sendmail}=require('./Emailsending.js');
//login api
let login=async (req,res)=>{
    let person=req.params.person;
   
    let data=req.body;
  
    if(person=="buyer"){
      let re=await buyer.findOne({email:data.email,verify:true});
      if(re){
          bcrypt.compare(data.password,re.password,(er,val)=>{
              if(val){
               let token=jwt.sign({email:data.email},process.env.JWTKEY,{expiresIn:'100d'});
               res.json({
                  ok:true,
                  person:'buyer',
                  token:token,
                  email:re.email,
                  id:re.id
               })
              }
              else{
                  res.json({
                      ok:false
                  })
              }
          })
      }
      else{
          res.json({
              ok:false
          })
      }
     
    }
    
    else{
       
      let re=await seller.findOne({email:data.email,verify:true});
      if(re){
          bcrypt.compare(data.password,re.password,(er,val)=>{
              if(val){
               let token=jwt.sign({email:data.email},process.env.JWTKEY,{expiresIn:'100d'});
               res.json({
                  ok:true,
                  person:'seller',
                  token:token,
                  email:re.email,
                  id:re.id
               })
              }
              else{
                  res.json({
                      ok:false
                  })
              }
          })
      }
      else{
          res.json({
              ok:false
          })
      }
    }
  }


  //register api

  let register=async (req,res)=>{
    
     let {fullname,email,password,phone}=req.body;
     password=await bcrypt.hash(password,10);
     let person=req.params.person;
     if(person=="buyer"){
        let ce=await buyer.findOne({email,verify:true});
        if(ce){
           res.json({
               ok:false
           })
           return 0;
        }
        let code=Math.floor(Math.random()*((999999-100000+1)+100000));
       let v=await buyer.insertMany([{
           fullname,
           email,
           phone,
           password,
           verify:false,
           code
       }]);
       if(v){
           sendmail(code,email);
           res.json({
               ok:true
           })
       }
       else{
           res.json({
               ok:false
           })
       }
     }
     else{
        let ce=await seller.findOne({email});
        if(ce){
           res.json({
               ok:false
           })
           return 0;
        }
        let code=Math.floor(Math.random()*((999999-10000)+100000));
       let v=await seller.insertMany([{
           fullname,
           email,
           phone,
           password,
           verify:false,
           code
       }]);
       if(v){
           sendmail(code,email);
           res.json({
               ok:true
           })
       }
       else{
           res.json({
               ok:false
           })
       }
     }
    
  }
module.exports={login,register};