
const ErrorHandler= require("../utils/errorHandler");
const catchAsynceError= require("../middleware/catchAsyncError");

const User= require("../models/userModel");

const sendToken= require("../utils/jwtToken");

const sendEmail= require("../utils/sendEmail");

const crypto= require("crypto");
const catchAsyncError = require("../middleware/catchAsyncError");

const cloudinary= require("cloudinary");

//user Register
exports.registerUser= catchAsynceError(async(req,res,next)=>{
    
   /* const myCloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: "avatars",
        width: 150,
        crop: "scale",
    })*/
    
    
    const {name,email,password}= req.body;

    const user= await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "this is public_id",
            url: "this is public Url",
        },
    });

    /*const token= user.getJWTToken();

    res.status(201).json({
        success:true,
        user,
        token,

    })*/

    sendToken(user, 201, res);
});

//user Login
exports.loginUser= catchAsynceError(async (req,res,next)=>{

    const {email,password}= req.body;

    //if user has given email and password both

    if(!email || !password)
    {
        return next(new ErrorHandler("Please Enter the Valid Email & Password",400));

    }

    const user= await  User.findOne({email: email}).select("+password");

    if(!user){
          return next(new ErrorHandler("Invalid Email or Password",401));
    }


    const isPasswordMatched= await user.comparePassword(password);

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

//Logout User

exports.logout= catchAsynceError( async (req,res,next)=>{
    res.cookie("token",null,{

        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged OUT",
    })
});

//forgot password

exports.forgotPassword = catchAsynceError(async (req,res,next)=>{

    const user= await User.findOne({email: req.body.email});


    if(!user){
        return next (new ErrorHandler ("User Not found",404));
    }


    //Get ResetPassword Token

    const resetToken= user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});
    
    const resetPasswordUrl= `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;


    const message= `Your password reset token is : \n\n${resetPasswordUrl} \n\n If you have not interested please Ignore it`;


    try
    {

        await sendEmail({
            email: user.email,
            subject: `Unlocked_Creations Password Recovery`,
            message,
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    }catch(error){
        user.resetPasswordToken= undefined;
        user.resetPasswordExpire= undefined;


        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler (error.message, 500));
    }

});


//Reset Password

exports.resetPassword = catchAsynceError ( async(req,res,next)=>{

    //creating token hash

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");


    const user= await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire:{ $gt: Date.now()},
    });

    if(!user){

       return next(new ErrorHandler("Reset password Token is invalid or has been expired",400));

    }

    if(req.body.password!==req.body.confirmPassword){

        return next(new ErrorHandler(`Password does not match`,400));
    }

    user.password= req.body.password;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpire= undefined;


    await user.save();

    sendToken(user,200,res);
})


//Get user Details

exports.getUserDetails= catchAsyncError(async(req,res,next)=>{
    const user= await User.findById(req.user.id);


    res.status(200).json({
        success:true,
        user,
    })
})


//Update user Password

exports.updatePassword= catchAsyncError(async(req,res,next)=>{
    const user= await User.findById(req.user.id).select("+password");

    const isPasswordMatched= await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Old Password is not matched",400));
    }
    if(req.body.newPassword!==req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password does not Matched",400));
    }

    user.password= req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
})


//Update User Profile

exports.updateProfile= catchAsynceError(async(req,res,next)=>{

    const newUserData= {
        name:req.body.name,
        email:req.body.email,
    }

  /*if(req.body.avatar!=="")
  {
      const user= await User.findById(req.user.id);

      const imageId= user.avatar.public_id;
      
    const myCloud=  await cloudinary.v2.uploader.upload(req.body.avatar,{

        folder: "avatars",
        width: 150,
        crop: "scale",
      })

      newUserData.avatar={
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
      }
  }*/


    const user= await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify: false,
    });

    res.status(200).json({
      success:true,
    })
})


//Get ALL users By Admin

exports.getAllUser= catchAsyncError(async(req,res,next)=>{
    const user= await User.find();

    res.status(200).json({
        success:true,
        user,
    })
})


//Get all users By Admin

exports.getSingleUser= catchAsyncError(async(req,res,next)=>{
    const user= await User.findById(req.params.id);

    if(!user)
    {
        return next(new ErrorHandler(`User doesn't exist with this Id: ${req.params.id}`));

    }

    res.status(200).json({
        success:true,
        user,
    })
})



//Update User Role By Admin

exports.updateUserRole= catchAsynceError(async(req,res,next)=>{

    const newUserData= {
        name:req.body.name,
        email:req.body.email,
        role: req.body.role,
    }

    const user= await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify: false,
    });

    res.status(200).json({
      success:true,
      message:"Role update successfully",
    })
})

//
exports.deleteUser= catchAsynceError(async(req,res,next)=>{

    const user= await User.findById(req.params.id);

    //we will remove Cloudinary


    if(!user)
    {
        return next((new ErrorHandler(`User Does not exist with this ID: ${req.params.id}`)));

    }


    await user.remove();

    res.status(200).json({
      success:true,
      message:"User deleted Successfully",
    })
})

