import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// import User model
import User from '../models/user.js';

// SIGN IN
export const signIn = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const existingUser = await User.findOne({ userName });

    // if no user found
    if (!existingUser)
      return res.status(404).json({ message: 'User does not exist.' });

    // compare password
    const checkPassword = await bcrypt.compare(password, existingUser.password);

    // if not matched password
    if (!checkPassword)
      return res.status(400).json({ message: 'Invalid password!' });

    // get existing user's token and send to front end and set up user's expire time
    const token = jwt.sign(
      { name: existingUser.userName, id: existingUser._id },
      process.env.KEY_TOKEN,
      { expiresIn: process.env.EXPIRED_TIME }
    );

    // send
    res.status(200).json({ userInfo: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'ERROR from user controllers.' });
  }
};
