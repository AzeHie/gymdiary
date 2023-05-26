const express = require("express");
const { check } = require("express-validator");

const programsControllers = require("../controllers/programs-controllers");
const router = express.Router();

router.get("/", programsControllers.getCurrentProgram);

router.get("/previousprograms", programsControllers.getPreviousPrograms);

router.get("/:pid", programsControllers.getProgramById);

router.post("/addprogram", programsControllers.addProgram);

router.put("/", programsControllers.editProgram);

router.delete("/:pid", programsControllers.deleteProgram);

module.exports = router;
