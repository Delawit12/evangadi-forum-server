export default {
  // select query
  getUserByUserId: `SELECT * FROM users WHERE userId = ?;`,
  getUserByEmail: `SELECT * FROM users WHERE email = ?;`,
  getOTPByUserEmail: `SELECT otp FROM users WHERE email = ?; `,
  getUserPasswordByUserEmail: `SELECT userPassword.userPassword
    FROM users
    JOIN userPassword ON users.userId = userPassword.userId
    WHERE users.email =?
    ORDER BY userPassword.createdDate DESC
    LIMIT 1;`,
  getUserPasswordByUserId: `SELECT * FROM userPassword WHERE userId = ? ORDER BY createdDate DESC LIMIT 1`,

  // Insert Queries
  insertInToUser: `INSERT INTO users (username, firstName, lastName, email, otp, insertedDatetime) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP);`,
  insertInToUserPassword: `INSERT INTO userPassword (userId, userPassword, createdDate) VALUES (?, ?, CURRENT_TIMESTAMP);`,

  // Update Queries
  updateOTP: `UPDATE users SET OTP = ? WHERE userId = ?`,
  confirmOTPByEmail: `UPDATE users SET otp = ? WHERE email = ?;`,
  updateUserPassword: `UPDATE userPassword SET userId = ?, userPassword = ? WHERE userPasswordId = ?;`,
};
