import query from "../config/db.js";
import answerQueries from "../query/answer.query.js";

const answerService = {
  // Insert a new answer into the answers table
  insertInToAnswer: async (data) => {
    try {
      const rows = await query(answerQueries.insertInToAnswer, [
        data.userId,
        data.questionId,
        data.answer,
      ]);
      return rows;
    } catch (error) {
      console.error("Error in insertAnswer:", error);
      throw error;
    }
  },
  // Get answer details by answerId
  getAnswerDetailsById: async (answerId) => {
    try {
      const rows = await query(answerQueries.getAnswerByAnswerId, [answerId]);
      return rows;
    } catch (error) {
      console.error("Error in getAnswerDetailsById service:", error);
      throw error;
    }
  },
};

export default answerService;
