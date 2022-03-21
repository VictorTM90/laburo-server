const { Schema, model } = require("mongoose");

const taskSchema = new Schema (
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }, 

        start: {
            type: Date,
            default: Date
            }, 

        title:{
            type:String,
        },

        description:String,
        
        end: Date, 

        assigned: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        taskType:{
            type:String,
            enum:["Personal", "TeamWork"]
          }, 
        
        teamwork: {
            type: Schema.Types.ObjectId,
            ref: "TeamWork"
          },
       
        
        isUrgent: {
            type: Boolean,
            default:false, 
        },  
        isDone: {
            type:String, 
            default:"To do",
            // enum:["To do", "Doing", "Done"]
        }
}


)


const TaskModel = model("Task", taskSchema);


module.exports = TaskModel;
