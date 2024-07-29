const db= require("../models/index");

const authenticateSessions= async (req, res, next)=>{
    const user_id= req.cookies.user_id;
    const session_id= req.cookies.session_id;

    if(user_id && session_id){
        const session= await db.Session.findOne({
            where:{
                user_id:user_id,
                id:session_id
            }
        });

        if(session){
            next();
        }else{
            return res.status(404).send({message:"invalid login"});
        }
    }else{
        return res.status(404).send({message:"invalid login"});
    }
};

module.exports= {authenticateSessions}