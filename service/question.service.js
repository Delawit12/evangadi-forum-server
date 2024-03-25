import query from "../config/db.js";
import questionQueries from "../query/question.query.js";

const questionService = {
  // Get all questions
  // Get all questions
  getAllQuestions: async () => {
    try {
      const rows = await query(questionQueries.getAllQuestion);
      return rows;
    } catch (error) {
      console.error("Error in getAllQuestions:", error);
      throw error;
    }
  },

  // Get a single question by question ID
  getQuestionByQuestionId: async (questionId) => {
    try {
      const rows = await query(
        questionQueries.getQuestionByQuestionId,
        questionId
      );
      return rows;
    } catch (error) {
      console.error("Error in getQuestionById:", error);
      throw error;
    }
  },

  // Insert a new question into the questions table
  insertQuestion: async (data) => {
    try {
      // const { question, questionDescription, category, userId } = data;
      const rows = await query(questionQueries.insertInToQuestion, [
        data.question,
        data.questionDescription,
        data.category,
        data.userId,
      ]);
      return rows;
    } catch (error) {
      console.error("Error in insertQuestion:", error);
      throw error;
    }
  },
};

export default questionService;
