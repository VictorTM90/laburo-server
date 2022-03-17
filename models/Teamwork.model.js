const { Schema, model } = require("mongoose");

const teamWordkSchema = new Schema (
    {
       name:{
           type:String, 
           required:true, 
        }, 
       
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        
        members: [{

            type: Schema.Types.ObjectId,
            ref: "User"}
        ]
       
}

)


const TeamWorkModel = model("TeamWork", teamWordkSchema);


module.exports = TeamWorkModel;
