const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const HttpError = require("../models/http-error");

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Creating user failed, please check your details and try again",
      422
    );
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

  if (!req.file || !req.file.path) {
    profilePicture = "uploads/images/profile-user.png";
  } else {
    profilePicture = req.file.path;
  }

  const createdUser = new User({
    email,
    password: hashedPassword,
    firstname,
    lastname,
    profilepicture: profilePicture,
    programs: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again", 500);
    return next(error);
  }

  return res.status(201).json({ message: "User created successfully!" });
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again!", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Invalid credentials, logging in failed!", 401);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
    console.log(isValidPassword);
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again!", 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Invalid credentials, logging in failed!", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.Id, email: existingUser.email },
      "something_very_secret_here",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again", 500);
    return next(error);
  }

  return res
    .status(200)
    .json({ userId: existingUser.id, email: existingUser.email, token: token });
};

exports.updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Updating user failed, please check your details and try again",
      422
    );
    return next(error);
  }

  const { email, firstname, lastname } = req.body;

  try {
    User.findOneAndUpdate(
      {
        _id: req.userData.userId,
      },
      {
        $set: {
          email: email,
          firstname: firstname,
          lastname: lastname,
        },
      }
    );
  } catch (err) {
    const error = new HttpError(
      "Updating the user failed, please try again!",
      500
    );
    return next(error);
  }

  return res.status(200).json({
    message: "User updated successfully!",
  });
};

exports.changePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // validate new password
    const error = new HttpError(
      "Updating the password failed, please try again!",
      500
    );
    return next(error);
  }

  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      const error = new HttpError("User not found!", 404);
      return next(error);
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (isOldPasswordValid) {
      const error = new HttpError("Current password is invalid!", 400);
      return next(error);
    }

    if (newPassword !== confirmPassword) {
      const error = new HttpError(
        "New password and its confirmation do not match!",
        400
      );
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.findOneAndUpdate(
      { _id: req.userData.userId },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
  } catch (err) {
    const error = new HttpError("Updating the password failed!", 500);
    return next(error);
  }

  return res.status(200).json({
    message: "Password updated!"
  });
};

exports.changeProfilePicture = async (req, res, next) => {
  let profilePicture;

  if (!req.file || !req.file.path) {
    profilePicture = "uploads/images/profile-user.png";
  } else {
    profilePicture = req.file.path;
  }

  try {
    User.findOneAndUpdate(
      {
        _id: req.userData.userId,
      },
      {
        $set: {
          profilepicture: profilePicture,
        },
      }
    );
  } catch (err) {
    const error = new HttpError(
      "Updating the profile picture failed, please try again!",
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: "Profile picture changed!",
  });
};
