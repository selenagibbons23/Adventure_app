const mongoose=require("mongoose")

const PinSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },

    title:{
        type:String,
        required:true,
        min:3
    },
    rating:{
        type: Number,
        required:true,
        min:1,
        max:5
    },

    lat:{
        type:Number,
        require:true
    },
    lon:{
        type:Number,
        require:true
    },
    descr:{
        type:String,
        required:true
    }

},{timestamps:true})


module.exports=mongoose.model("Pin",PinSchema)