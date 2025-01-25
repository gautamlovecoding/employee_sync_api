const User = require("./models/user");
const becrypt = require("bcrypt");

const userRegister = async () => {
  try {
    const hashedPassword = await becrypt.hash("123456", 10);
    const user = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = userRegister;
