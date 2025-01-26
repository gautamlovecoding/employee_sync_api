const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addEmployee, upload, getAllEmployees, getOneEmployee, updateEmployee, fetchEmployeeByCompanyId } = require("../controllers/employeeController");
const router = express.Router();

router.post("/add", authMiddleware, upload.single('image'), addEmployee);
router.get("/list", authMiddleware, getAllEmployees);
router.get("/:id", authMiddleware, getOneEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.get("/company/:id", authMiddleware, fetchEmployeeByCompanyId);
// router.delete("/:id", authMiddleware, deleteCompany);

module.exports = router;
