const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router.post(
  "/signup",
  fileUpload.single("profilepicture"),
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
    check("firstname").trim().isLength({ min: 3 }),
    check("lastname").trim().isLength({ min: 3 }),
  ],
  usersControllers.createUser
);

router.post("/login", usersControllers.userLogin);

router.put("/updateuser", usersControllers.updateUser);

router.put("/changepassword", usersControllers.changePassword);

module.exports = router;
