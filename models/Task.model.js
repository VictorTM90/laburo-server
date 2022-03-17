const { Schema, model } = require("mongoose");

const taskSchema = new Schema (
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }, 

        date: {
            type: Date,
            default: Date.now
            }, 

        title:{
            type:String,
            required:true
        },

        description:String,
        
        dueDate: Date, 

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
            enum:["To do", "Doing", "Done"]
        }
}


)


const TaskModel = model("Task", taskSchema);


module.exports = TaskModel;
