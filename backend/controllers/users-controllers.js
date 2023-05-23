exports.createUser = async (req, res, next) => {
  return res.status(200).json({ message: "createUser working"});
};

exports.userLogin = async (req, res, next) => {
  return res.status(200).json({ message: "userLogin working"});
};  

exports.updateUser = async (req, res, next) => {
  return res.status(200).json({ message: "updateUser working"});
};

exports.changePassword = async (req, res, next) => {
  return res.status(200).json({ message: "changePassword working"});
}