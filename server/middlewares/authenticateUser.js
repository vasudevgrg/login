const { ERROR_MESSAGES, EMAIL_VALIDATION } = require("../libs/constants");
const db= require("../models/index");

const   authenticateEmail= async (req, res, next)=>{
    const {email}= req.body;
   
    console.log(EMAIL_VALIDATION.test(email));
    if(EMAIL_VALIDATION.test(email)==false){
       return res.status(401).send({message:"InValid Email"})
    }

    const user=await db.User.findOne({
        where:{
            email:email
        }
    });

    if(!user){
       return res.status(404).send({message:ERROR_MESSAGES.USERNAME});
      }
      next();
};

module.exports= {authenticateEmail};