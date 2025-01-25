const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
  maritialStatus: {
    type: String,
    enum: ["married", "unmarried"],
    default: "unmarried",
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
