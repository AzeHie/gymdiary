const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");
const router = express.Router();

router.post("/signup", usersControllers.createUser);

router.post("/login", usersControllers.userLogin);

router.put("/updateuser", usersControllers.updateUser);

router.put("/changepassword", usersControllers.changePassword);

module.exports = router;



