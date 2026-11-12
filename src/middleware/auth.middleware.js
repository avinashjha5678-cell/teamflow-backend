const jwt  = require("jsonwebtoken");
const userModel = require("../models/user-models.js")

const protect = async (req,res,next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                success:false,
                meassage:"unauthorized access"
            })
        }
        const token = authHeader.split(" ")[1];



    const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
    );


const user = await userModel.findById(decoded.userId);

if (!user) {
    return res.status(401).json({
        success: false,
        message: "User not found"
    });
}


req.user = user;
next();

    }

  catch (error) {
    if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError" ||
        error.name === "NotBeforeError"
    ) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }

    console.error("Authentication error:", error);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}

};
module.exports = protect;