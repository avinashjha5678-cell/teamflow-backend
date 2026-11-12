const teammodels = require("../models/team-models");

const createTeam = async (req,res)=>{
    try{
        const {teamName,teamDescription,teamMembers}=req.body;
        if(!teamName || !teamDescription || !teamMembers){
            return res.status(400).json({
                status:false,
                message:"All fields are required"
            })
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            status:false,
            message:"Internal server error"
        })
    }
}