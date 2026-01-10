// import User from "../../models/User.js";
const User = require("../../models/User")
// import OTP from "../../models/OTP.js";
const  bcrypt = require("bcryptjs");
const  jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: hashed,
    });

    return res.status(201).json({
      message: "Account created successfully",
      user,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

 const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.lastLogin = Date.now();
    await user.save();

    return res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {login,register}