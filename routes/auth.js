const express = require("express");
const router = express.Router();
const { login, verify } = require("../controllers/authController");
const verifyUser = require("../middleware/authMiddleware");

router.post("/login", login);
router.get("/verify", verifyUser, verify);

module.exports = router;
