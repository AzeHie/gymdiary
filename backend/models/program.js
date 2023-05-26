const mongoose = require("mongoose");

const repsDoneSchema = mongoose.Schema({
  weights: { type: Number, required: true },
  reps: { type: Number, required: true }
});

const workoutLogSchema = mongoose.Schema({
  date: { type: String, required: true },
  repeatsDone: [repsDoneSchema]
});

const exerciseSchema = mongoose.Schema({
  exerciseName: { type: String, required: true },
  sets: { type: String, requred: true },
  reps: { type: String, required: true },
  log: [workoutLogSchema]
});

const workoutSchema = mongoose.Schema({
  workoutName: { type: String, required: true },
  exercises: [exerciseSchema],
});

const programSchema = mongoose.Schema({
  programName: { type: String, required: true },
  workouts: [workoutSchema],
  owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model("Program", programSchema);

