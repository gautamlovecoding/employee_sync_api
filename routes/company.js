const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addCompany, getCompanies, getOneCompanies, editCompany, deleteCompany } = require("../controllers/companyController");
const router = express.Router();

router.post("/add", authMiddleware, addCompany);
router.get("/list", authMiddleware, getCompanies);
router.get("/:id", authMiddleware, getOneCompanies);
router.put("/:id", authMiddleware, editCompany);
router.delete("/:id", authMiddleware, deleteCompany);

module.exports = router;
