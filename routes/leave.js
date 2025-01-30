const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addLeave, getLeaveById } = require("../controllers/leaveController");
const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/:userId", authMiddleware, getLeaveById);

module.exports = router;
