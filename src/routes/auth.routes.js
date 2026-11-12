const express = require("express");
const routes = express.Router();


const protect = require("../middleware/auth.middleware.js");
const authorize = require("../middleware/role.middleware.js");


const {
     registerUser,
     loginUser
}= require("../controller/auth.controller.js");

routes.post("/register",registerUser);
routes.post("/login",loginUser);



routes.get("/me", protect, (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    });
});


routes.get("/admin",protect, authorize("admin"),(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome Admin"
    })
})

module.exports = routes;