
const Service= require("../models/serviceModel");

//create by----ADMIN
exports.createService= async (req, res, next)=>{
    const createService = await Service.create(req.body);


    res.status(201).json({
        success: true,
        createService
    })
}



//get all service
exports.getsControllers  = async(req,res,next)=>{

    const getService=await Service.find(req.body);
    //res.status(200).json({message:"Route is worrking fine"});
    res.status(200).json({
        success:true,
        getService
    })
}

//get one service

exports.oneService= async(req,res)=>{
    
    const oneService= await Service.findById(req.params.id);


    if(!oneService){

      return res.status(200).json({
            success:false,
            message:"Service not found"
        })
    };


    res.status(200).json({
        success:true,
        oneService
    })

}


//update by-----ADMIN
exports.updateService= async(req,res,next)=>{
    let upService= await Service.findById(req.params.id);


    if(!upService){

      return res.status(200).json({
            success:false,
            message:"Service not found"
        })
    };

    upService= await Service.findByIdAndUpdate(req.params.id, req.body,
        {new:true, runValidators:true, useFindAndModify:false});
  
        res.status(200).json({
            success:true,
            upService
        })


}

//delete by----ADMIN
exports.deleteService= async(req,res,next)=>{
    let delService= await Service.findById(req.params.id);


    if(!delService){

      return res.status(200).json({
            success:false,
            message:"Service not found"
        })
    };

     await delService.remove();
        
  
        res.status(200).json({
            success:true,
            message:"Service deleted successfully"
        })


}