let {buyer,seller}=require('../Model/db');
let {sendmail}=require('./Emailsending');
let bcrypt=require('bcryptjs');
let forgetpassword=async (req,res)=>{
     let {name,email}=req.params;
     let code=Math.floor(Math.random()*((999999-10000)+100000));

     if(name=='buyer'){
        let v=await buyer.findOne({email,verify:true});
        if(v){
            await buyer.findOneAndUpdate({email,verify:true},{$set:{code}});
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
        let v=await seller.findOne({email,verify:true});
        if(v){
            await seller.findOneAndUpdate({email,verify:true},{$set:{code}});
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
let updatepassword=async (req,res)=>{
    let {name,email,password}=req.body;
    password=await bcrypt.hash(password,10);
    if(name=='buyer'){
        await buyer.findOneAndUpdate({email,verify:true},{$set:{password}});
        res.json({
            ok:true
        });
    }
    else{
        await seller.findOneAndUpdate({email,verify:true},{$set:{password}});
        res.json({
            ok:true
        }); 
    }
}
module.exports={forgetpassword,updatepassword};