const authorize=(...allowRoles)=>{
    return(req,res,next)=>{
        if(!allowRoles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:"your role is not authorized to access this routes"
            });
        }
        next();
    };

};    

module.exports = authorize;