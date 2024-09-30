let jwt=require('jsonwebtoken');
let env=require('dotenv').config();
let verify=async (req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        let data=await jwt.verify(token,process.env.JWTKEY);
        if(data){
            req.body=data;
          
            next();
        }
        else{
            res.json({
                ok:false
            }) 
        }
    }
    else{
        res.json({
            ok:false
        })
    }
}
module.exports={verify};