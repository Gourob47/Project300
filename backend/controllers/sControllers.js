
const Service= require("../models/serviceModel");
const ErrorHandler = require("../utils/errorHandler");

const catchAsynceError= require("../middleware/catchAsyncError");
const apiFeatures = require("../utils/apiFeatures");


//create by----ADMIN
exports.createService= catchAsynceError(async (req, res, next)=>{
    
    req.body.user= req.user.id;
    
    const service = await Service.create(req.body);



    res.status(200).json({
        success: true,
        service
    })
});



//get all service
exports.getsControllers  = catchAsynceError (async(req,res)=>{

    const resultPerPage = 3;
    const serviceCount = await Service.countDocuments();

    const apiFeature= new apiFeatures(Service.find(),req.query).search().filter().pagination(resultPerPage);

    const service=await apiFeature.query;
    //res.status(200).json({message:"Route is worrking fine"});
    res.status(200).json({
        success:true,
        service,
        serviceCount,
    })
});

//get one service

exports.oneService=catchAsynceError (async(req,res,next)=>{
    
    const service= await Service.findById(req.params.id);


    if(!service){

        /*return res.status(500).json({
            success:false,
            message:"Service not found"

           
        })*/

       return next(new ErrorHandler("Service Not found",404));

    };

    res.status(200).json({
        success:true,
        service
    });

});


//update by-----ADMIN
exports.updateService=catchAsynceError (async(req,res,next)=>{
    let service= await Service.findById(req.params.id);


    if(!service){

      /*return res.status(500).json({
            success:false,
            message:"Service not found"
        })*/
        return next(new ErrorHandler("Service Not found",404));

    };

    service= await Service.findByIdAndUpdate(req.params.id, req.body,
        {new:true, runValidators:true, useFindAndModify:false});
  
        res.status(200).json({
            success:true,
            service
        })


});

//delete by----ADMIN
exports.deleteService= catchAsynceError(async(req,res,next)=>{
    const service= await Service.findById(req.params.id);


    if(!service){

      /*return res.status(500).json({
            success:false,
            message:"Service not found"
        })*/
        return next(new ErrorHandler("Service Not found",404));
    };

     await service.remove();
        
  
        res.status(200).json({
            success:true,
            message:"Service deleted successfully"
        })


});