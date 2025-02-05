const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const connectDB = require("./db/db");
const userRegister = require("./userSeed");
const authRouter = require("./routes/auth");
const companyRouter = require("./routes/company");
const salaryRouter = require("./routes/salary");
const employeeRouter = require("./routes/employee");
const leaveRouter = require("./routes/leave");

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
connectDB();
app.use(express.json());
app.use(express.static("public/uploads"));
app.use(morgan("dev"));
app.use("/api/auth", authRouter);
app.use("/api/companies", companyRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
