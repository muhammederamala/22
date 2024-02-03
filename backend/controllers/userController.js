const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // Compare the plain text password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user: existingUser,
        token: token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Failed to log in.",
    });
  }
};

exports.postSignUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
        token: token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Failed to create a new user.",
    });
  }
};

exports.getUserData = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const userInfo = await User.findById(userId).select("-password");

    if (!userInfo) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      userInfo: userInfo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user information.",
    });
  }
};

exports.putEditUserInfo = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Updated successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error!",
    });
  }
};
