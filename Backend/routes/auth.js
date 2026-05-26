import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

//SIGNUP 
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Signup successful!" });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password} = req.body;

  try {
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({ message: "Wrong password"});
    }
    const token = jwt.sign(
      {userId: user._id, username: user.username},
      JWT_SECRET,
      { expiresIn: "7d"}
    );

      res.status(200).json({
        message: "Login succesfully!",
        token,
        username: user.username
      });
    } catch(err) {
      res.status(500).json({ message: "Server error", error: err.message});
    }
  
});


export default router;  