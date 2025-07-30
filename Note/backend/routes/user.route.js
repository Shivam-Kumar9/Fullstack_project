import express from "express";
import  bcrypt  from "bcrypt";
import  jwt  from "jsonwebtoken";

import { UserModel } from "../model/user.model.js";
 
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, age, password, gender } = req.body;
  try {
    // const cryptPass  =
    bcrypt.hash(password, 3, async function (err, hash) {
      if (err) return res.status(500).json("Internal bcrypt server error");

      let user = new UserModel({
        name,
        email,
        age,
        password: hash,
        gender,
      });
      await user.save();
      res.status(201).json({ msg: "user register sucessfully" });
    });
  } catch (error) {
    res
      .status(400)
      .json({ msg: `Error while registering <>=<>=<>  ${error.message}` });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err)
          return res
            .status(400)
            .json({ msg: "Internal Server Error" });
        if (result) {
          const accesstoken = jwt.sign({ id : user._id}, process.env.SECRET_KEY,) 
          return res.status(200).json({message : "User logged in successfully", accesstoken})
        }
        else return res.status(401).json({msg : "password not matched, please re-enter"})
      });
    }
  } catch (error) {
  if(error.name === "ValidationError") {
      return res.status(400).json({ msg: error.message });
    }
    else  res.status(500).json({msg : `Error while logging in user ${error.message}`})
  }

}); 

export default userRouter;
 