import query from "../config/db.js";
import usersQuery from "../query/user.query.js";

const userService = {
  // get user by user ID
  getUserByUserId: (userId) => {
    try {
      const rows = query(usersQuery.getUserByUserId, [userId]);
      return rows;
    } catch (error) {
      console.error("Error in getUserByUserId:", error);
      throw error;
    }
  },

  // get user by email
  getUserByEmail: (userEmail) => {
    try {
      const rows = query(usersQuery.getUserByEmail, [userEmail]);
      return rows;
    } catch (error) {
      console.error("Error in getUserByEmail:", error);
      throw error;
    }
  },

  // get user password by user ID
  getUserPasswordByUserEmail: (userEmail) => {
    try {
      const rows = query(usersQuery.getUserPasswordByUserEmail, [userEmail]);
      return rows;
    } catch (error) {
      console.error("Error in getUserPasswordByUserId:", error);
      throw error;
    }
  },
  getUserPasswordByUserId: (userId) => {
    try {
      const rows = query(usersQuery.getUserPasswordByUserId, [userId]);
      return rows;
    } catch (error) {
      console.error("Error in getUserPasswordByUserId:", error);
      throw error;
    }
  },

  // get OTP by userEmail
  getOTPByUserEmail: (userEmail) => {
    try {
      const rows = query(usersQuery.getOTPByUserEmail, [userEmail]);
      return rows;
    } catch (error) {
      console.error("Error in getOTPByUserEmail:", error);
      throw error;
    }
  },

  // get user passwords by user ID, ordered by created date ascending
  getUserPasswordsByUserId: (userId) => {
    try {
      const rows = query(usersQuery.getUserPasswordsByUserId, [userId]);
      return rows;
    } catch (error) {
      console.error("Error in getUserPasswordsByUserId:", error);
      throw error;
    }
  },

  // Insert user data into the users table
  insertInToUser: (data) => {
    try {
      console.log(data);
      const rows = query(usersQuery.insertInToUser, [
        data.username,
        data.firstName,
        data.lastName,
        data.email,
        data.OTP,
      ]);
      return rows;
    } catch (error) {
      console.error("Error in insertInToUser:", error);
      throw error;
    }
  },

  // Insert user password data into the userPassword table
  insertInToUserPassword: (data) => {
    try {
      const rows = query(usersQuery.insertInToUserPassword, [
        data.userId,
        data.userPassword,
      ]);
      return rows;
    } catch (error) {
      console.error("Error in insertInToUserPassword:", error);
      throw error;
    }
  },

  // Update OTP for a user
  updateOTP: (data) => {
    try {
      const rows = query(usersQuery.updateOTP, [data.OTP, data.userId]);
      return rows;
    } catch (error) {
      console.error("Error in updateOTP:", error);
      throw error;
    }
  },

  // Confirm OTP by email
  confirmOTPByEmail: async (email, otp) => {
    try {
      const rows = await query(usersQuery.confirmOTPByEmail, [otp, email]);
      return rows;
    } catch (error) {
      console.error("Error in confirmOTPByEmail:", error);
      throw error;
    }
  },
};

export default userService;
