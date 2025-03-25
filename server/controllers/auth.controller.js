import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../env.js";

const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
  };


// Register
  export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({ username, email, password: hashedPassword });
  
      res.status(201).json({
        message: 'User created successfully',
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });

    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };


// Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  