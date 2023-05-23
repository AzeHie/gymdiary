const express = require("express");
const { check } = require("express-validator");

const workoutLogsControllers = require("../controllers/workoutlogs.controllers");
const router = express.Router();

router.get("/", workoutLogsControllers.getWorkoutLogs);

router.post("/startnew", workoutLogsControllers.startWorkoutLog);

router.put("/edit", workoutLogsControllers.editWorkoutLog);

router.delete("/:lid", workoutLogsControllers.deleteWorkoutLog);

module.exports = router;