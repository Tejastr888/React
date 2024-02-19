import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenandSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "pasword did not match" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    // const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    // const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const Profilepic = `https://avatar.iran.liara.run/username?username=${userName}+${fullName}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      // profilePic: gender == "male" ? boyProfilepic : girlProfilepic,
      profilePic: Profilepic,
    });

    if (newUser) {
      generateTokenandSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signupcontroller", error.message);
    res.status(500).json({ error: "error in internal server" });
  }
};
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    generateTokenandSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in loginContoller", error.message);
    res.status(500).json({ error: "error in internal server" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out Succesfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "error in internal server" });
  }
};
