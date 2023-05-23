exports.getWorkoutLogs = async (req, res, next) => {
  return res.status(200).json({ message: "getWorkoutLogs working"});
};

exports.startWorkoutLog = async (req, res, next) => {
  return res.status(200).json({ message: "startWorkoutLog working"});
};

exports.editWorkoutLog = async (req, res, next) => {
  return res.status(200).json({ message: "editWorkoutLog working"});
};

exports.deleteWorkoutLog = async (req, res, next) => {
  return res.status(200).json({ message: "deleteWorkoutLog working"});
};