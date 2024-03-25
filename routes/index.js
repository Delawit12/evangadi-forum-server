import express from "express";
const appRoute = express.Router();

// all routes
import userRoute from "./user.route.js";
import questionRoute from "./question.route.js";
import answerRoute from "./answer.route.js";
// import profileRoute from "./profile.route.js";

// adding to Middleware
appRoute.use("/api/users", userRoute);
appRoute.use("/api/questions", questionRoute);
appRoute.use("/api/answers", answerRoute);
// appRoute.use(profileRoute);

export default appRoute;
