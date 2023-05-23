const express = require("express");
const { check } = require("express-validator");

const programsControllers = require("../controllers/workoutprograms-controllers");
const router = express.Router();

router.get("/", programsControllers.getCurrentProgram);

router.get("/previousprograms", programsControllers.getPreviousPrograms);

router.get("/:pid", programsControllers.getProgramById);

router.put("/", programsControllers.editProgram);

router.delete("/:pid", programsControllers.deleteProgram);

module.exports = router;
