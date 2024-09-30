let mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Amar-Fosol');
let buyers=new mongoose.Schema({
    fullname:String,
    phone:Number,
    email:String,
    password:String,
    verify:Boolean,
    code:String
});
let buyer=mongoose.model("buyer",buyers);
let sellers=new mongoose.Schema({
    fullname:String,
    phone:Number,
    email:String,
    password:String,
    verify:Boolean,
    code:String
});
let seller=mongoose.model("seller",sellers);
let bb=new mongoose.Schema({
    email:String,
    selleremail:String,
    pname:String,
    pquantity:Number,
    pprice:Number,
    pnumber:String
});
let buyerProduct=mongoose.model('BuyerOrder',bb);
let productschema=new mongoose.Schema({
    email:String,
    
    pname:String,
    pquantity:Number,
    pprice:Number,
    pnumber:String,
    pimage:String
});
let productlist=mongoose.model('productcard',productschema);
module.exports={buyer,seller,buyerProduct,productlist};

