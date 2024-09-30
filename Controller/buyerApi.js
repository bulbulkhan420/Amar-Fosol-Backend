let {buyer,buyerProduct,productlist}=require('../Model/db');
let buyerInfo=async (req,res)=>{
    let {email}=req.body;
    let v=await buyer.findOne({email,verify:true});
    if(v){
        res.json({
            ok:true,
            info:v
        })
    }
}
let buyerorderlist=async (req,res)=>{
  let v=await buyerProduct.find({email:req.body.email});
  res.json({
    ok:true,
    list:v
  })
}
let deletproduct=async (req,res)=>{
    let v=await buyerProduct.findOneAndDelete({_id:req.body._id});
    if(v){
        res.json({
            ok:true,
            id:req.body._id
        })
    }
}
let product=async (req,res)=>{
  let v=await productlist.find({});
  if(v){
    res.json({
        ok:true,
        list:v
    })
  }
}
let searchproduct=async (req,res)=>{
   let {pname,minquantity,minprice,maxprice}=req.body;
   let v=await productlist.find({pname,pquantity:{$lte:minquantity},pprice:{$gte:minprice,$lte:maxprice}});
   if(v){
    res.json({
        ok:true,
        list:v
    })
   }
   else{
    res.json({
        ok:false
    })
   }
}
module.exports={buyerInfo,buyerorderlist,deletproduct,product,searchproduct};