const express= require("express");
const { newProgram, getSingleProgram, myProgram, getAllProgram, updateProgramStatus, deleteProgram } = require("../controllers/programControllers");

//const {newProgram}= require("../controllers/orderControllers");

const router= express.Router();

const {isAuthenticationUser, authorisedRoles, isAuthentication}= require("../middleware/auth");

router.route("/program/new").post(isAuthentication, newProgram );

router.route("/program/:id").get(isAuthentication, /*authorisedRoles("Admin"),*/ getSingleProgram);

router.route("/programs/me").get(isAuthentication, myProgram);

router.route("/admin/programs").get(isAuthentication, authorisedRoles("Admin"),getAllProgram);

router.route("/admin/program/:id").put(isAuthentication, authorisedRoles("Admin"),updateProgramStatus).delete(isAuthentication, authorisedRoles("Admin"), deleteProgram);

module.exports= router;