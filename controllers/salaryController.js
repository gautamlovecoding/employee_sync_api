const Salary = require("../models/salary");

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;

    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      payDate,
      netSalary: totalSalary,
    });

    await newSalary.save();

    return res.status(200).json({
      success: true,
      message: "salary created successfully",
    });
  } catch (error) {
    console.log("🚀⚡👨‍💻🚀 ~ addSalary ~ error🚀🔥🚀➢", error.message);
    return res
      .status(500)
      .json({ success: false, message: "salary Create error" });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🚀⚡👨‍💻🚀 ~ getSalary ~ id🚀🔥🚀➢", id)
    const salaryData = await Salary
      .find({ employeeId: id })
      .populate("employeeId", "employeeId");
    return res
      .status(200)
      .json({ success: true, salary: salaryData, message: "fetched" });
  } catch (error) {
    console.log("🚀⚡👨‍💻🚀 ~ getSalary ~ error🚀🔥🚀➢", error);
    return res
      .status(500)
      .json({ success: false, message: "salary get error" });
  }
};

module.exports = {
  addSalary,
  getSalary,
};
