const Program = require("../models/program");

exports.getCurrentProgram = async (req, res, next) => {
  return res.status(200).json({ message: "getCurrentProgram working"});
};

exports.getPreviousPrograms = async (req, res, next) => {
  return res.status(200).json({ message: "getPreviousPrograms working"});
};

exports.getProgramById = async (req, res, next) => {
  return res.status(200).json({ message: "getProgramById working "});
};

exports.addProgram = async (req, res, next) => {
  const newProgram = new Program({
    programName: req.body.programName,
    workouts: req.body.workouts,
    owner: "u1" // req.userData.userId after authentication and check-auth middleware is added to the backend..
  });

    

  return res.status(200).json({ program: newProgram });
};


exports.editProgram = async (req, res, next) => {
  return res.status(200).json({ message: "editProgram working"});
};

exports.deleteProgram = async (req, res, next) => {
  return res.status(200).json({ message: "deleteProgram working"});
};  