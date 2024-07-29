const db= require("../models/index");
const transporter= require("../middlewares/transporter");

class userServices{
    sendMail=({username, otp, topic})=>{
        transporter.sendMail(
            {
              from: "vasudevgarg7@gmail.com",
              to:username,
              subject: `This is a ${topic} for the Hotstar Website.`,
              html: `Your otp for Login:${otp} `,
            },
            (error, info) => {
              if (error) {
                console.log(error);
                res.status(500).send({ message: "Failed to send verification email" });
              } else {
                console.log("Email sent: " + info.response);
                
              }
            }
          );
    };

    createUser= async ({name, email, password})=>{
        const user= await db.User.create({name, email,password});
        return user;
    }

    findUserByEmail= async ({email})=>{
        const user= await db.User.findOne({
            where:{
                email:email
            }
           });
           return user;
    }

    findUser= async ({email, password})=>{
        const user= await db.User.findOne({
            where:{
                email:email,
                password:password
            }
        });
        return user;
    }
};
module.exports=new userServices();