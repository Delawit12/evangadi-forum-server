import express from "express";
import questionController from "../controller/question.controller.js";
import auth from "../auth/auth.js";

const questionRoute = express.Router();

questionRoute.post("/askQuestion", questionController.insertQuestion);
questionRoute.get("/", questionController.getAllQuestions);
questionRoute.get("/id", questionController.getSingleQuestion);

export default questionRoute;
