const db = require("../models/index");
const SessionServices = require("../services/session");

const allSessions= async (req, res)=>{
    const sessions= await SessionServices.getSessions({user_id:req.cookies.user_id});

    res.send({sessions: sessions});
}

const deleteSession= async (req, res)=>{
    const session_id= req.params.id;
    await db.Session.destroy({
        where:{
            id:session_id
        }
    });

    const sessions= await SessionServices.getSessions({user_id:req.cookies.user_id});

    res.send({message:"Device Removed", sessions: sessions});
};

const validSession= async (req, res)=>{
    const session_id= req.params.id;
    const session= await db.Session.findOne({
        where:{
            id:session_id
        }
    });
    if(session){

    res.send({valid:true});
    }else{
        res.send({valid:false})
    }
}

module.exports={allSessions,deleteSession, validSession};