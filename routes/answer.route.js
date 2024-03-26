import express from "express";
import answerController from "../controller/answer.controller.js";
import auth from "../auth/auth.js";

const answerRoute = express.Router();

// Route to insert a new answer
answerRoute.post("/insertAnswer", answerController.insertAnswer);

// Route to get answer details by ID
answerRoute.get("/:id", answerController.getAnswerDetailsById);

export default answerRoute;
