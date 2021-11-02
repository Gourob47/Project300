
const ErrorHandler= require("../utils/errorHandler");
const catchAsynceError= require("../middleware/catchAsyncError");

const User= require("../models/userModel");

const sendToken= require("../utils/jwtToken");


//user Register
exports.registerUser= catchAsynceError(async(req,res,next)=>{
    const {name,email,password}= req.body;

    const user= await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"ProfilepicUrl",
        },
    });

    /*const token= user.getJWTToken();

    res.status(201).json({
        success:true,
        user,
        token,

    })*/

    sendToken(user, 200, res);
});

//user Login
exports.loginUser= catchAsynceError(async (req,res,next)=>{

    const {email,password}= req.body;

    if(!(email&&password))
    {
        return next(new ErrorHandler("Please Enter the Valid Email & Password",400));

    }

    const user= await  User.findOne({email}).select("+password");

    if(!user){
          return next(new ErrorHandler("Invalid Email or Password",401));
    }


    const isPasswordMatched= user.comparePassword(password);

    if(!isPasswordMatched){

        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    /*const token= user.getJWTToken(); 

    res.status(200).json({
        success:true,
        user,
        token,

    })*/
    sendToken(user, 200, res);


})