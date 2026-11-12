const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes.js");


app.use(express.json());
app.use("/api/auth", authRoutes);



app.get("/health",(req, res)=>{
    res.status(200).json({
        success:true,
        message:"server is running fine"
     })
});

module.exports =app;