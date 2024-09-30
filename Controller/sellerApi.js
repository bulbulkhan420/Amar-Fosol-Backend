let {seller,productlist,buyerProduct}=require('../Model/db');
const multer = require('multer');
let cloudinary=require('cloudinary').v2;
const upload = multer({ dest: 'pictures/' });
cloudinary.config({ 
    cloud_name: 'dfhug7rwx', 
   api_key: '262784511165531', 
     api_secret: 'T_JoL4AMHQeaMQYy2_GFW8S0uco' 
 });
let profile=async (req,res)=>{
    let {email}=req.body;
    console.log(email)
    let v=await seller.findOne({email,verify:true});
    let p=await buyerProduct.find({selleremail:email});
   
        res.json({
            ok:true,
            info:v,
            list:p
        })
    
}
let addproduct=async (req,res)=>{
    let email=req.params.email;
    let file=req.file;
    let {pname,pprice,pquantity}=req.body;
    console.log(req.body);
    let url;
    let sel=await seller.findOne({email,verify:true});
    await cloudinary.uploader.upload(file.path,{resource_type:'image'},
      function(err,result){
          url=result.secure_url;
      });
      await productlist.insertMany([{email,pnumber:sel.phone,pimage:url,pprice,pname,pquantity}]);
      res.json({
        ok:true
      })
}
let allsellerproduct=async (req,res)=>{
    let {email}=req.body;
    let v=await productlist.find({email});
    res.json({
        ok:true,
        info:v
    })
}

module.exports={profile,addproduct,allsellerproduct};