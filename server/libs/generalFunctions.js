
const generateOTP=()=>{
   return Math.trunc(Math.random()*10000);
};

module.exports= {generateOTP};