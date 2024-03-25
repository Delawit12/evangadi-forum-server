import userService from "../service/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userUtility from "../utility/user.utility.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const userController = {
  registerUser: async (req, res) => {
    try {
      // check all fields are required
      const { username, firstName, lastName, email, password } = req.body;

      if (!username || !firstName || !lastName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const isEmailExist = await userService.getUserByEmail(email);

      if (isEmailExist.length) {
        return res.status(500).json({
          success: false,
          message: "Email is already used",
        });
      }

      // password encryption
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      req.body.userPassword = bcrypt.hashSync(password, salt);

      // generate otp that is used to verify the user
      req.body.OTP = userUtility.generateDigitOTP();
      console.log(req.body.OTP);

      const registerUser = await userService.insertInToUser(req.body);

      // extract user id from the user table
      req.body.userId = registerUser.insertId;

      // Inserting password into the database
      const isPasswordAdded = await userService.insertInToUserPassword(
        req.body
      );

      if (isPasswordAdded) {
        res.status(200).json({
          success: true,
          message: "User created successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Error in registration",
        });
      }
    } catch (error) {
      console.error("Error in registerUser:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if all fields are given
      if (!email || !password) {
        return res.json({
          success: false,
          message: "All fields are required",
        });
      }

      const isUserExist = await userService.getUserByEmail(email);

      // If there is no account related to this email
      if (!isUserExist.length) {
        return res.status(500).json({
          success: false,
          message: "No account exists with this email",
        });
      }

      const userId = isUserExist[0].userId;
      const checkedUserPassword = await userService.getUserPasswordByUserId(
        userId
      );

      if (!checkedUserPassword) {
        return res.status(500).json({
          success: false,
          message: "Password does not exist",
        });
      }

      const dbPassword = checkedUserPassword[0].userPassword;
      const isMatch = bcrypt.compareSync(password, dbPassword);

      if (!isMatch) {
        return res.status(500).json({
          success: false,
          message: "Incorrect password",
        });
      } else {
        const token = jwt.sign(
          { id: userId, userEmail: email },
          process.env.JWT_SECRET,
          { expiresIn: "30m" }
        );
        return res.json({
          token,
          user: {
            id: userId,
            userEmail: email,
            success: true,
            message: "Login successfully",
          },
        });
        // const token = jwt.sign({ userId, email }, process.env.JWT_SECRET);
        // return res.status(200).json({
        //   token,
        //   userId,
        //   email,
        //   success: true,
        //   message: "Login successfully",
        // });
      }
    } catch (error) {
      console.error("Error in loginUser:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  forgetPassword: async (req, res) => {
    try {
      const { email } = req.body;

      // Validate the request values
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Check if the email exists
      const isUserExist = await userService.getUserByEmail(email);

      // If there is no account related to this email
      if (isUserExist.length == 0) {
        return res.status(400).json({
          success: false,
          message: "There is no account related to this email",
        });
      } else {
        // Extract userId
        req.body.userId = isUserExist[0].userId;
        // Generate OTP
        const OTP = await userUtility.generateDigitOTP();
        req.body.OTP = OTP;

        // console.log(OTP);
        // console.log(req.body.OTP);
        userUtility.sendEmail(email, OTP).then(async () => {
          const isNewOTPAdded = await userService.updateOTP(req.body);
          console.log(isNewOTPAdded);
          if (!isNewOTPAdded) {
            return res.status(500).json({
              success: false,
              message: "Error during sending email",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "OTP sent successfully",
            });
          }
        });
      }
    } catch (error) {
      console.error("Error in forgetPassword:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  confirmOTP: async (req, res) => {
    // console.log(req.body);
    try {
      const { email, OTP } = req.body;
      // console.log(email);

      // Validate the request values
      if (!email || !OTP) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Check if the email exists
      const getUserByEmail = await userService.getUserByEmail(email);
      const userId = getUserByEmail[0].userId;
      req.body.userId = userId;

      const getOTP = await userService.getOTPByUserEmail(email);

      if (!getOTP.length) {
        return res.status(500).json({
          success: false,
          message: "OTP not found",
        });
      }

      // Compare the provided OTP with the OTP fetched from the database
      const dbOTP = getOTP[0].otp;
      if (OTP !== dbOTP) {
        return res.status(400).json({
          success: false,
          message: "Incorrect OTP",
        });
      }

      // If OTP matches, update the OTP to null in the database
      await userService.confirmOTPByEmail(email, null);

      // Return success response
      return res.status(200).json({
        success: true,
        message: "OTP confirmed successfully",
      });
    } catch (error) {
      console.error("Error in confirmOTP:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  newPassword: async (req, res) => {
    try {
      // const userId = req.body.Id;
      const { email, newPassword } = req.body;
      console.log(req.body);
      console.log("back end password:", email);
      // Validate the request values
      if (!email || !newPassword) {
        return res.json({
          success: false,
          message: "All fields are required",
        });
      }
      const getUserByEmail = await userService.getUserByEmail(email);
      const userId = getUserByEmail[0].userId;
      req.body.userId = userId;

      // Compare with previous passwords
      const isUserPassword = await userService.getUserPasswordByUserEmail(
        email
      );
      for (let i = 0; i < isUserPassword.length; i++) {
        let dbPassword = isUserPassword[i].userPassword;
        const isMatch = bcrypt.compareSync(newPassword, dbPassword);
        if (isMatch) {
          return res.status(500).json({
            success: false,
            message: "This password is already used. Please use another",
          });
        }
      }

      // Password encryption
      const salt = bcrypt.genSaltSync(10); // Specify the number of rounds
      const hashedPassword = bcrypt.hashSync(newPassword, salt);

      // Insert hashed password into the database
      const passwordInserted = await userService.insertInToUserPassword({
        userId,
        userPassword: hashedPassword,
      });

      if (!passwordInserted) {
        return res.status(404).json({
          success: false,
          message: "Password not inserted into userPassword",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Error in newPassword:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export default userController;
