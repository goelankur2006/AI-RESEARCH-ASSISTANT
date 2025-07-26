const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        email: existingUser.email
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
