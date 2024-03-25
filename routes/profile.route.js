import express from "express";
import profileController from "../controller/profile.controller.js";
import { upload } from "../config/multer.js";

const profileRoute = express.Router();

profileRoute.post(
  "/api/profile/profilePicture",
  upload.single("image"),
  profileController.profilePicture
);

export default profileRoute;
