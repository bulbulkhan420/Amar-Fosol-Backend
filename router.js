const express=require('express');
let route=express.Router();
let Controller=require('./Controller/loginregisterApi');
let otpverify=require('./Controller/Otpverification');
let forgetpassword=require('./Controller/forgetpassword');
let JWTtoken=require('./Controller/JWTtoken');
let buyerApi=require('./Controller/buyerApi');
let paymentgateway=require('./Controller/paymentgateway')
let sellerApi=require('./Controller/sellerApi');
const multer = require('multer');
let cloudinary=require('cloudinary').v2;
const upload = multer({ dest: 'pictures/' });
cloudinary.config({ 
    cloud_name: 'dfhug7rwx', 
   api_key: '262784511165531', 
     api_secret: 'T_JoL4AMHQeaMQYy2_GFW8S0uco' 
 });
route.get('/',(req,res)=>{
    res.send("Hello all");
})
route.post('/login/:person',Controller.login);
route.post(`/register/:person`,Controller.register);
route.post('/verify/otp',otpverify.otpverification);
route.get(`/forget/password/:name/:email`,forgetpassword.forgetpassword);
route.post('/newpassword',forgetpassword.updatepassword);
route.get('/buyer/info',JWTtoken.verify,buyerApi.buyerInfo);
route.get('/buyer/product/list',JWTtoken.verify,buyerApi.buyerorderlist);
route.post('/confirm/delevery',buyerApi.deletproduct);
route.get('/all/product',buyerApi.product);
route.post('/product/search',buyerApi.searchproduct);
route.get('/payment/product/:id/:email',JWTtoken.verify,paymentgateway.payment);
route.post(`/payment/product/success/:id/:email`,paymentgateway.sucess);
route.post(`/payment/product/fail/:id/:email`,paymentgateway.fail);
route.get('/seller/profile',JWTtoken.verify,sellerApi.profile);
route.post('/add/product/list/:email',upload.single('pimage'),sellerApi.addproduct);
route.get('/all/seller/product/list',JWTtoken.verify,sellerApi.allsellerproduct);

module.exports={route};