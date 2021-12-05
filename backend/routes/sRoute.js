const express= require("express");
const { getsControllers, createService, updateService, deleteService, oneService, createServiceReview, getServiceReviews, deleteReview } = require("../controllers/sControllers");
const { isAuthentication, authorisedRoles } = require("../middleware/auth");

const router= express.Router();


router.route("/service").get(getsControllers);

router.route("/admin/service/new").post(isAuthentication,  authorisedRoles ("Admin"),createService);

router.route("/admin/service/:id").put(isAuthentication, authorisedRoles ("Admin"),updateService).delete(isAuthentication, authorisedRoles ("Admin"),deleteService);

router.route("/service/:id").get(oneService);


router.route("/review").put(isAuthentication, createServiceReview);

router.route("/reviews").get(getServiceReviews).delete(isAuthentication, deleteReview);

module.exports= router