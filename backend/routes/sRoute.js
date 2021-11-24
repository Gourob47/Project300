const express= require("express");
const { getsControllers, createService, updateService, deleteService, oneService } = require("../controllers/sControllers");
const { isAuthentication, authorisedRoles } = require("../middleware/auth");

const router= express.Router();


router.route("/service").get(isAuthentication, authorisedRoles ("Admin"),getsControllers);

router.route("/service/new").post(isAuthentication,  authorisedRoles ("Admin"),createService);

router.route("/service/:id").put(isAuthentication, authorisedRoles ("Admin"),updateService).delete(isAuthentication, authorisedRoles ("Admin"),deleteService).get(oneService);

module.exports= router