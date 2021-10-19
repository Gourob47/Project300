const express= require("express");
const { getsControllers, createService, updateService, deleteService, oneService } = require("../controllers/sControllers");

const router= express.Router();


router.route("/service").get(getsControllers);

router.route("/service/new").post(createService);

router.route("/service/:id").put(updateService).delete(deleteService).get(oneService);

module.exports= router