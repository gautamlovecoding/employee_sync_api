const Company = require("../models/company");
const addCompany = async (req, res) => {
  try {
    const { comp_name, description } = req.body;
    const newCompany = new Company({ comp_name, description });
    const savedCompany = await newCompany.save();
    res.status(200).json({ success: true, data: savedCompany });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companyDatas = await Company.find({});
    return res.status(200).json({
      success: true,
      companies: companyDatas,
      message: "Fetched Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOneCompanies = async (req, res) => {
  try {
    const companyData = await Company.findById(req.params.id);
    return res.status(200).json({
      success: true,
      company: companyData,
      message: "Fetched Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const editCompany = async (req, res) => {
  try {
    const companyData = await Company.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.status(200).json({
      success: true,
      company: companyData,
      message: "Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const companyData = await Company.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      company: companyData,
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addCompany,
  getCompanies,
  getOneCompanies,
  editCompany,
  deleteCompany,
};
