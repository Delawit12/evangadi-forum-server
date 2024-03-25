import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

export default {
  generateDigitOTP() {
    return Math.floor(Math.random() * 900000 + 100000);
  },
  async sendEmail(userEmail, OTP) {
    console.log(OTP);
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "text",
        text: `your Evangadi-Forum verification code is ${OTP} please enter it on the provided field`,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!", OTP);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  },
};
