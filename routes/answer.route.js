import express from "express";
import answerController from "../controller/answer.controller.js";
import auth from "../auth/auth.js";

const answerRoute = express.Router();

// Route to insert a new answer
answerRoute.post("/insertAnswer", auth, answerController.insertAnswer);

// Route to get answer details by ID
answerRoute.get("/getAnswer/:answerId", answerController.getAnswerDetailsById);

export default answerRoute;
