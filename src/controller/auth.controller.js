const User = require("../models/user-models.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req,res)=>{
    try{
        const {name,email,password,role}=req.body
        if(!name || !email  || !password){
         return res.status(400).json({
            success:false,
            message:"Please provide all required fields"
            });
        }



        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
           return res.status(400).json({
                success:false,
                message:"Enter valid email"
            })
        };



        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
         if(!passwordRegex.test(password)){
           return res.status(400).json({
                success:false,
                message:"Enter valid password"
            })
        };



        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({       //return isss liye use kiye hai ki Isse duplicate 
                                                // user milne par function wahi ruk jayega aur registration aage nahi chalega.
                success:false,
                message:"user already exits"
            })
        };



        const passwordHasing = await bcrypt.hash(password,12);


        const newUser = await User.create({
            name,
            email,
            password:passwordHasing,
        })


           return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
            });
        }
        
        
        catch(error){
            console.error("Registration error:", error);

            return res.status(500).json({
                success:false,
                message:"Internal Server Error"

            });
        }
};




const loginUser = async (req,res,next)=>{
    try{
        
        
        const  {email,password}=req.body;
        if (!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email ad Password have required"
            });
        }

        
        
        const user = await User.findOne({
            email
        }).select("+password");
        if(!user){
           return res.status(400).json({
                success:false,
                message:"Your Email is not register in our database"
            });
        }


        const ispasswordcorrect=await bcrypt.compare(
            password,
            user.password
        );
        if(!ispasswordcorrect){
          return  res.status(400).json({
                success:false,
                message:"Your password is incorrect"
            });
        };



        const token = jwt.sign(
            { userId: user._id.toString(),  role: user.role },
    process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN || "1d"}
);



return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});
    }   
    
    
    
    catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}
}
module.exports ={registerUser,loginUser};

