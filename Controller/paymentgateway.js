const {ObjectId}=require('bson');
const SSLCommerzPayment = require('sslcommerz-lts');
let {buyer,buyerProduct,productlist}=require('../Model/db');
let env=require('dotenv').config();
//ssl commerch
const store_id = process.env.store_id;
const store_passwd = process.env.store_passwd;
const is_live = false;
const tran_id=new ObjectId().toString();
let payment=async (req,res)=>{
  let {id,email}=req.params;
  console.log(id+" "+email);
  let v=await productlist.findOne({_id:id});
  const data = {
    total_amount: v.pprice,
    currency: 'BDT',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:5000/payment/product/success/${id}/${email}`,
    fail_url: `http://localhost:5000/payment/product/fail/${id}/${email}`,
    cancel_url: `http://localhost:5000/payment/product/fail/${id}/${email}`,
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Payment of seat booking',
    product_category: 'mess seat',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: email,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
};
const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
sslcz.init(data).then(apiResponse => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL
    res.json({url:GatewayPageURL,ok:true});
    
});

}
let sucess=async (req,res)=>{
    let {id,email}=req.params;
let v=await productlist.findOne({_id:id});
if(v){
    await buyerProduct.insertMany([{email,selleremail:v.email,pname:v.pname,pquantity:v.pquantity,pprice:v.pprice,pnumber:v.pnumber}]);
    res.redirect(`http://localhost:5173/buyer/search/${email}`);
}
}
let fail=async (req,res)=>{
    let {id,email}=req.params;
    res.redirect(`http://localhost:5173/buyer/search/${email}`);
    
}
module.exports={payment,sucess,fail};