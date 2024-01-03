const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    task:{
        type:String,
        unique:true,
        required:true
    },
    
},{timestamp:true})

const Task=mongoose.model("Task",taskSchema)
module.exports=Task