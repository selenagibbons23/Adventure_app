const express=require("express")
const mongoose=require("mongoose")
const env=require("dotenv")
const pinRoute=require("./routes/pins")
const userRoute=require("./routes/users")
const application= express()
application.use(express.json())

env.config()

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(()=>{
        console.log("[SUCCESS] Mongo DB connected")
    })
    .catch((err)=> console.log("[FAILED] Connection to Mongo DB"))
application.use("/api/pins",pinRoute)
application.use("/api/users",userRoute)
application.listen(7800, () => {
    console.log("[SUCCESS] Backend server started")
})
