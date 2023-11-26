import bcrypt from "bcryptjs";
import User from "../models/userModel";

export const signup = async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    fitstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await newUser.save();
    res.status(201).json("User created succesfully!");
  } catch (error) {
    next(error);
  }
};
