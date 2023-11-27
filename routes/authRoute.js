const express = require("express");
// const jwt = require("jsonwebtoken");
const { Login, Home, SignUp } = require("../controllers/authController");

const router = express.Router();

router.get("/", Home);

router.post("/login", Login);
router.post("/sign-up", SignUp);

module.exports = router;
