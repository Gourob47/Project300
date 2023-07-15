const Service = require("../models/serviceModel");
const ErrorHandler = require("../utils/errorHandler");

const catchAsynceError = require("../middleware/catchAsyncError");
const apiFeatures = require("../utils/apiFeatures");

const cloudinary= require("cloudinary");
const { dateVerification } = require("./programControllers");

//create by----ADMIN
exports.createService = catchAsynceError(async (req, res, next) => {

 

  
  let images=[];

  if(typeof req.body.images==="string")
  {
    images.push(req.body.images);
  }
  else
  {
    images= req.body.images;
  }
 
  const imagesLink=[];
 
  for(let i=0;i<images.length;i++)
  {
    const result= await cloudinary.v2.uploader.upload(images[i],{
      folder:"services",
    });
 
    imagesLink.push({
      public_id: result.public_id,
 
      url: result.secure_url,
    });
  }
 req.body.images= imagesLink; 
  
  
  
  req.body.user = req.user.id;
  const user= req.user.id;

  try {
    const service = await Service.create(req.body);
    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }


});

//get all service
exports.getsControllers = catchAsynceError(async (req, res,next) => {


  const resultPerPage = 20;
  const servicesCount = await Service.countDocuments();


  const apiFeature = new apiFeatures(Service.find(), req.query)
    .search()
    .filter()
    //.pagination(resultPerPage);

  // const services= await apiFeature.query;  

  
  let services= await apiFeature.query;
  let filteredServiceCount= services.length;


 // let services= await apiFeature.query;

 // let filteredServiceCount= services.length;

  //apiFeature.pagination(resultPerPage);

  //services = await apiFeature.query;
  //res.status(200).json({message:"Route is worrking fine"});
  res.status(200).json({
    success: true,
    services,
    servicesCount,
    resultPerPage,
    filteredServiceCount,
  });
});

//ADMIN services
exports.getAdminServices = catchAsynceError(async (req, res,next) => {



  const services= await Service.find();


  res.status(200).json({
    success: true,
    services,
 
  });
});

//get one service

exports.getOneService= catchAsynceError(async (req, res, next) => {
 
 // dateVerification
  const service = await Service.findById(req.params.id);

  if (!service) {
    /*return res.status(500).json({
            success:false,
            message:"Service not found"

           
        })*/

    return next(new ErrorHandler("Service Not found", 404));
  }

  res.status(200).json({
    success: true,
    service,
    
  });
});

//update by-----ADMIN
exports.updateService = catchAsynceError(async (req, res, next) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    /*return res.status(500).json({
            success:false,
            message:"Service not found"
        })*/
    return next(new ErrorHandler("Service Not found", 404));
  }


  let images=[];

  if(typeof req.body.images==="string")
  {
    images.push(req.body.images);
  }
  else
  {
    images= req.body.images;
  }

  if(images!==undefined)
  {


    for (let i = 0; i < service.images.length; i++) {
    
      const result= await cloudinary.v2.uploader.destroy(service.images[i].public_id);
      
    }
  
    const imagesLink=[];
   
    for(let i=0;i<images.length;i++)
    {
      const result= await cloudinary.v2.uploader.upload(images[i],{
        folder:"services",
      });
   
      imagesLink.push({
        public_id: result.public_id,
   
        url: result.secure_url,
      });
    }
   req.body.images= imagesLink; 


  }


  

  


  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    service,
  });
});

//delete by----ADMIN
exports.deleteService = catchAsynceError(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    /*return res.status(500).json({
            success:false,
            message:"Service not found"
        })*/
    return next(new ErrorHandler("Service Not found", 404));
  }


  for (let i = 0; i < service.images.length; i++) {
    
    const result= await cloudinary.v2.uploader.destroy(service.images[i].public_id);
    
  }

  await service.remove();

  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
});

//Create new Review and Update the review

exports.createServiceReview = catchAsynceError(async (req, res, next) => {
  const { rating, comment, serviceId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const service = await Service.findById(serviceId);

  const isReviewed = service.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    service.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    service.reviews.push(review);
    service.numofReviews = service.reviews.length;
  }

  let avg = 0;

  service.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  service.ratings = avg / service.reviews.length;

  await service.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get ALL review of a Services

exports.getServiceReviews = catchAsynceError(async (req, res, next) => {
  const service = await Service.findById(req.query.id);

  if (!service) {
    return next(new ErrorHandler("Service Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: service.reviews,
  });
});

//Delete Review *****************

exports.deleteReview = catchAsynceError(async (req, res, next) => {
  const service = await Service.findById(req.query.serviceId);

  if (!service) {
    return next(new ErrorHandler("Service not Found"), 404);
  }

  const reviews = service.reviews.filter(
    rev => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });


  let ratings=0;

  if(reviews.length==0)
  {
    ratings=0;
  }
  else
  {
    ratings = avg / reviews.length;
  }

  //const ratings= avg / reviews.length;

  

  const numofReviews = reviews.length;

  await Service.findByIdAndUpdate(
    req.query.serviceId,
    {
      reviews,
      ratings,
      numofReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );


  res.status(200).json({
      success:true,

  })
});
