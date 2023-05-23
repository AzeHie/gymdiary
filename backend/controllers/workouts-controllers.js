exports.getWorkouts = async (req, res, next) => {
  return res.status(200).json({ message: "get workouts working"});
};

exports.getWorkoutById = async (req, res, next) => {
  return res.status(200).json({ message: "getWorkoutById working"});
};

exports.editWorkout = async (req, res, bext) => {
  return res.status(200).json({ message: "edit workout working"});
};

exports.deleteWorkout = async (req, res, next) => {
  return res.status(200).json({ message: "delete workout working" });
};