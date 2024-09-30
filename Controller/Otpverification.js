let {buyer,seller}=require('../Model/db');
let otpverification=async (req,res)=>{
    let {name,email,code}=req.body;
    if(name=='buyer'){
        let v=await buyer.findOne({email,code});
        if(v){
            await buyer.findOneAndUpdate({email,code},{$set:{verify:true}});
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
        let v=await seller.findOne({email,code});
        if(v){
            await seller.findOneAndUpdate({email,code},{$set:{verify:true}});
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
module.exports={otpverification};