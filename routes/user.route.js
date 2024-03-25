import express from "express";
import userController from "../controller/user.controller.js";
import auth from "../auth/auth.js";
const userRoute = express.Router();

userRoute.post("/register", userController.registerUser);
userRoute.post("/login", userController.loginUser);
userRoute.post("/forgetPassword", userController.forgetPassword);
userRoute.post("/conformation", userController.confirmOTP);
userRoute.post("/newPassword", userController.newPassword);

export default userRoute;
