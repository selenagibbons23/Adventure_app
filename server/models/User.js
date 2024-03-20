const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    }
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema)