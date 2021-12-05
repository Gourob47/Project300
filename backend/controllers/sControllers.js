const Service = require("../models/serviceModel");
const ErrorHandler = require("../utils/errorHandler");

const catchAsynceError = require("../middleware/catchAsyncError");
const apiFeatures = require("../utils/apiFeatures");

//create by----ADMIN
exports.createService = catchAsynceError(async (req, res, next) => {
  req.body.user = req.user.id;

  const service = await Service.create(req.body);

  res.status(200).json({
    success: true,
    service,
  });
});

//get all service
exports.getsControllers = catchAsynceError(async (req, res) => {
  const resultPerPage = 10;
  const servicesCount = await Service.countDocuments();

  const apiFeature = new apiFeatures(Service.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const services = await apiFeature.query;
  //res.status(200).json({message:"Route is worrking fine"});
  res.status(200).json({
    success: true,
    services,
    servicesCount,
  });
});

//get one service

exports.oneService = catchAsynceError(async (req, res, next) => {
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


  /*let ratings=0;

  if(reviews.length==0)
  {
    ratings=0;
  }
  else
  {
    ratings = avg / reviews.length;
  }*/

  const ratings= avg / reviews.length;

  

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
