import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  // catch any errors while trying to create user like dublicate email etc.
  try {
    // save new user to the database
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    console.log(error);
    // use middleware for handling errors in index.js
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check if we got a valid email
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    // if we have a valid email check if valid password
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));
    // we have a valid user so create jwt token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    //destructure the user to remove the hashed password
    const { password: pass, ...rest } = validUser._doc;
    console.log(rest);
    // Store cookie in browser as a session
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    // handle errors using middleware in index.js
    next(error);
  }
};
