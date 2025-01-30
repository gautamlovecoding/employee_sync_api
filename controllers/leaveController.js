const Leave = require("../models/leave");
const Employee = require("../models/employee");

const addLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason, userId, status } = req.body;

    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const leave = new Leave({
      leaveType,
      startDate,
      endDate,
      reason,
      userId,
      employeeId: employee._id,
      status,
    });
    await leave.save();
    res
      .status(201)
      .json({ success: true, message: "Leave added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLeaveById = async (req, res) => {
  try {
    const { userId } = req.params;
    const leave = await Leave.find({ userId }).sort({ appliedAt: -1 });
    console.log("🚀⚡👨‍💻🚀 ~ getLeaveById ~ leave🚀🔥🚀➢", leave)
    res.status(200).json({ success: true, leaves: leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addLeave, getLeaveById };
