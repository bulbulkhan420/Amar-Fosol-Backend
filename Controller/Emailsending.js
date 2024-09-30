let nodemailer=require('nodemailer');
let sendmail= async (code,email)=>{
    let tran=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"deathturn420@gmail.com",
            pass:"ifluxbmzhyazmndb"
        }
    });
    try{
        await tran.sendMail({
            from:{
            name:"Amar Fosol",
            address:"deathturn420@gmail.com"
            },
           
            to:email,
            subject:"Verify your Email",
            text:`Your verification password id ${code}`
           });
    }
    catch(err){
        console.log("error");
    }  
}
module.exports={sendmail};