const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt= require("jsonwebtoken");
const User= require("../models/userModel");



exports.isAuthentication= catchAsyncError( async (req,res,next)=>{
    const {token}= req.cookies;


   if(!token)
   {
       return next(new ErrorHandler("Please Login to access the Data ",401));

   }

   const decodeData= jwt.verify(token,process.env.JWT_SECRET);

   req.user= await User.findById(decodeData.id); 

   next();
});


exports.authorisedRoles =(...roles)=>{
    return (req,res,next)=>{

        if(!roles.includes(req.user.role)){
          return next(
            new ErrorHandler(`Role ${req.user.role} is not allowed to access this resources`,403)
          ) 
          
        }

        next();
    }
};