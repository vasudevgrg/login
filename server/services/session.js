const db = require("../models/index");
class SessionServices{
    getSessions=async ({user_id})=>{
        const sessions= await db.Session.findAll({
            where:{
                user_id:user_id
            }
        });

        return sessions;
    };

    findSessionByUserId= async ({id})=>{
      const  session= await db.Session.findOne({
            where:{
                user_id:id
            }
           });
           return session;
    };

    createSession= async ({user_id,hostname})=>{
        console.log(hostname);
        const session= await db.Session.create({user_id:user_id,location:hostname});
        return session;
    };

    destroySession =async ({session_id})=>{
        await db.Session.destroy({where:{
            id:session_id
        }});
    }
};

module.exports= new SessionServices();