const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const HttpError = require("../models/http-error");

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new HttpError("Creating user failed, please check your details and try again", 422);
    return next(error);
  }

  const { email, password, firstname, lastname } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again!", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User exists already", 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again", 500);
    return next(error);
  }

  if(!req.file.path) {
    // set default picture here
  }

  const createdUser = new User({
    email,
    password,
    firstname,
    lastname,
    profilepicture: req.file.path,
    programs: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again", 500);
    return next(error);
  }

  return res.status(201).json({ message: "User created successfully!"});
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