const jwt = require("jsonwebtoken");
const User = require("../models/Users");


const protect = async (req, res, next) => {
   let token;
   
   if(
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")){
    try {
        token = req.headers.authorization.split(" ")[1];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoded.user.id).select("-password");
        
        next();
    } catch (error) {
        console.log("Token verification failed:", error);
        res.status(401).json({message: "Not authorized, token failed."});
    }
   }

   else{
    res.status(401).json({message: "Not authorized, no token provided."});
   }
};

const admin = (req, res, next) => {
    if(req.user && req.user.role == "admin"){
        next();
    }
    else{
        res.status(403).json({message: "Not authorized as an Admin."});
    }
}

module.exports = { protect, admin };