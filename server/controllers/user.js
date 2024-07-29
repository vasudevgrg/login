const db = require("../models/index");
const Redis = require("ioredis");
const redis = new Redis();
const { getIO } = require("../libs/chat");
const os = require('os');
const userServices= require("../services/user");
const sessionServices= require("../services/session");
const redisServices= require("../services/redis");
const { generateOTP } = require("../libs/generalFunctions");

const createUser= async (req, res)=>{
    const {name, email,password}= req.body;
    try{
    await userServices.createUser({name:name, email:email, password:password});
    res.send({message:"user created"});
    }catch(error){
      res.status(400).send({error:error});
    }
};

const Login= async (req, res)=>{
    const {email}= req.body;
   const user= await userServices.findUserByEmail({email:email})
   let session= null;
if(user){
    session= await sessionServices.findSessionByUserId({id:user.id});
}
    if(user && session){
        const io = getIO();
        const num= generateOTP();
        console.log(num);
        await redisServices.addOTP({key:user.id,value:num});
        // await redis.set(user.id,num);
        io.to(String(user.id)).emit("otp", { otp:num});
        res.cookie("user_id", user.id,{
            secure:false
          });
       return res.send({messsage:"otp sent",status:true});
    }else{
       
        res.send({status:false});
    }
};

const verifyOTP= async (req, res)=>{
    const hostname = os.hostname();
    const otp= req.params.otp;
    const user_id= req.cookies.user_id;
    const redis_otp= await redisServices.getOTP({key:user_id});
    console.log(redis_otp);

    if(otp==(Number)(redis_otp)){
        const session= await sessionServices.createSession({user_id:user_id,hostname:hostname});
        res.cookie("session_id", session.id, {
            secure: false,
          });
        res.status(200).send({message:"User Logged In"})
    }else{
        res.status(401).send({message:"OTP verification Unsuccessful, Login Again"});
       
    }
};

const LoginByPassword= async (req, res)=>{
    const {email, password}= req.body;
    const hostname = os.hostname();
    const user= await userServices.findUser({email:email, password:password});
    if(!user){
        return res.status(404).send({message:"Invalid Pasword"});
    }
    const session= await sessionServices.createSession({user_id:user.id,hostname:hostname});
   
      res.cookie("session_id", session.id, {
        secure: false,
      });
      res.cookie("user_id", user.id,{
        secure:false
      });
    res.send({message:"User LogedIn Successfully"});
};

const signOut= async (req, res)=>{
    const session_id= req.params.id;
    const session= await sessionServices.destroySession({session_id:session_id})
    res.send({message:"user id Logged Out"});
};



module.exports= {createUser, Login, verifyOTP, LoginByPassword, signOut};