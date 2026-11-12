const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({

    teamName:{
        type:String,
        require:true,
        trim:true
    },
     description: {
        type: String,
        trim: true
    },

     manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


    members: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
]

})

const Team = mongoose.model("Team", teamSchema);
module.exports =Team;