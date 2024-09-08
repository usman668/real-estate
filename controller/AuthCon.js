import { userModel } from "../Model/AuthModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import MongoDbPkg from "mongodb";
const { ObjectId } = MongoDbPkg;

// Password Hash:-

const securePassword = async (password) => {
  try {
    let passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

// SignUp:

let SignUp = async (req, resp) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      resp.status(400).send({ message: "All fields are required" });
    } else {
      let userData = await userModel.findOne({ email: email });
      if (userData) {
        resp.status(400).send({ message: "Email already exists" });
      } else {
        const sPassword = await securePassword(req.body.password);
        let newUser = new userModel({
          name: req.body.name,
          email: req.body.email,
          password: sPassword,
        });
        let saveUser = await newUser.save();
        let token = jwt.sign({ userId: saveUser._id }, "Secretekey", {
          expiresIn: "30days",
        });
        resp
          .status(200)
          .send({ message: "User Saved Successfully", saveUser, token: token });
      }
    }
  } catch (error) {
    resp.send(error.message);
  }
};

// Login:-
let LogIn = async (req, resp) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      resp.status(400).send({ message: "All fields are required" });
    }
    let data = await userModel.findOne({ email });
    if (!data) {
      resp.status(400).send({ message: "Email or Password is wrong" });
    }
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      resp.status(400).send({ message: "Email or Password is wrong" });
    } else {
      let token = jwt.sign({ userId: data._id }, "Secretekey", {
        expiresIn: "30days",
      });
      resp.status(200).send({ message: "LogIn Successfully", token: token });
    }
  } catch (error) {
    resp.send(error);
  }
};

// Logout:-

const LogOut = async (req, resp) => {
  try {
    let userId = await userModel.find({ _id: req.params.id });
    resp.clearCookie("token");
    resp.status(200).json({ message: "Logout Successfully", userId });
  } catch (error) {
    resp.status(500).json({ error: "An error occurred during logout" });
  }
};

// Get all Users:-

let getUsers = async (req, resp) => {
  try {
    let user = await userModel.aggregate([
      {
        $match: {},
      },
    ]);
    resp.send(user);
  } catch (error) {
    resp.send(error);
  }
};

// Get Single User:-
let getSingleUser = async (req, resp) => {
  try {
    let userId = req.params.id;
    let user = await userModel.aggregate([
      {
        $match: {
          _id: new ObjectId(userId),
        },
      },
    ]);
    resp.send(user);
  } catch (error) {
    resp.send(error);
  }
};

// Update User:-

let updateUser = async (req, resp) => {
  try {
    let userData = req.body;
    let userId = req.params.id;
    let updateData = await userModel.findByIdAndUpdate(userId, userData);
    resp.send({ message: "User Updated Successfully: ", updateData });
  } catch (error) {
    resp.send(error);
  }
};

// Delete User:-

let deleteUser = async (req, resp) => {
  try {
    let userId = req.params.id;
    let userRemove = await userModel.findByIdAndDelete(userId);
    resp.send({ message: "User Removed From Database", user: userRemove });
  } catch (error) {
    resp.send(error);
  }
};
export {
  SignUp,
  LogIn,
  LogOut,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
