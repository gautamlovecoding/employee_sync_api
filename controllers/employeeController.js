const Employee = require("../models/employee");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritialStatus,
      designation,
      company,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritialStatus,
      designation,
      company,
      salary,
    });

    const savedEmployee = await newEmployee.save();

    return res.status(201).json({
      success: true,
      user: savedUser,
      employee: savedEmployee,
      message: "Employee added successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({})
      .populate("userId", "name email profileImage")
      .populate("company", "comp_name");
    return res.status(200).json({ success: true, employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOneEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
    .populate("userId", "name email profileImage")
    .populate("company", "comp_name");
    console.log("🚀⚡👨‍💻🚀 ~ getOneEmployee ~ employee🚀🔥🚀➢", employee)
    return res.status(200).json({ success: true, employee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addEmployee, upload, getAllEmployees, getOneEmployee };
