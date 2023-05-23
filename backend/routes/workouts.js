const express = require("express");
const { check } = require("express-validator");

const workoutsControllers = require("../controllers/workouts-controllers");
const router = express.Router();

router.get("/", workoutsControllers.getWorkouts);

router.get("/:wid", workoutsControllers.getWorkoutById);

router.put("/:wid", workoutsControllers.editWorkout);

router.delete("/:wid", workoutsControllers.deleteWorkout);

module.exports = router;