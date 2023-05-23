exports.getCurrentProgram = async (req, res, next) => {
  return res.status(200).json({ message: "getCurrentProgram working"});
};

exports.getPreviousPrograms = async (req, res, next) => {
  return res.status(200).json({ message: "getPreviousPrograms working"});
};

exports.getProgramById = async (req, res, next) => {
  return res.status(200).json({ message: "getProgramById working "});
};

exports.editProgram = async (req, res, next) => {
  return res.status(200).json({ message: "editProgram working"});
};

exports.deleteProgram = async (req, res, next) => {
  return res.status(200).json({ message: "deleteProgram working"});
};  