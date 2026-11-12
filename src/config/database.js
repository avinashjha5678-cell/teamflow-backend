const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{

         console.log("Mongo URL exists:", !!process.env.MONGO_URL);
         
        await mongoose.connect(process.env.MONGO_URL);
        
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;