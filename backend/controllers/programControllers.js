const Program= require("../models/programModel");

const Service = require("../models/serviceModel");

const ErrorHandler= require("../utils/errorHandler");
const catchAsynceError= require("../middleware/catchAsyncError");


//Create Program

exports.newProgram = catchAsynceError(async(req,res,next)=>{

    const{
        programPlace,
        package,
        paymentInfo,
        cost,
        taxPrice,
        totalCost,

    }= req.body;


    const program= await Program.create({
        programPlace,
        package,
        paymentInfo,
        cost,
        taxPrice,
        totalCost,
        paidAt: Date.now(),
        user: req.user._id,
    });


    res.status(201).json({
        success:true,
        program,
    })
})



//Get single Program
exports.getSingleProgram= catchAsynceError(async(req,res,next)=>{
    const program= await Program.findById(req.params.id).populate("user","name email");

    if(!program)
    {
        return next(new ErrorHandler("Program not found in this ID",404));

    }

    res.status(200).json({
        success:true,
        program,
    })
})

//Get logged in User program

exports.myProgram= catchAsynceError(async(req,res,next)=>{
    const program= await Program.find({user: req.user._id});


    res.status(200).json({
        success:true,
        program,
    })
})

//Get all program from users---ADMIN

exports.getAllProgram= catchAsynceError(async(req,res,next)=>{
  
    const programs= await Program.find();


    let totalAmount= 0;

    programs.forEach((program)=>{
        totalAmount+=program.totalCost;
    })


    res.status(200).json({
        success:true,
        totalAmount,
        programs,
    })
})

//update program status---ADMIN *****

exports.updateProgramStatus= catchAsynceError(async(req, res,next)=>{

    const program= await Program.findById(req.params.id);

    if(!program)
    {
        return next(new ErrorHandler("Program not found in this ID",404));

    }


    if(program.confirmProgram=="Confirmed")
    {
        return next(new ErrorHandler("Program is Successfully Purchased",400));
    }

    program.confirmProgram= req.body.status;

    if(req.body.status=== "Confirmed")
    {
        program.deliveredAt= Date.now();
    }

    await program.save({validateBeforeSave: false});

    res.status(200).json({
        success:true,
    })

})

//delete program---ADMIN
exports.deleteProgram= catchAsynceError(async(req,res,next)=>{
    const program= await Program.findById(req.params.id);

    if(!program)
    {
        return next(new ErrorHandler("Program not found in this ID",404));
    }

     await program.remove();


    res.status(200).json({
        success:true,
        message:"Program Deleted Successfully",
        program,
    })
})




