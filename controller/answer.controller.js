import answerService from "../service/answer.service.js";

const answerController = {
  // Insert a new answer
  insertAnswer: async (req, res) => {
    try {
      const userId = req.body.Id; // Corrected userId retrieval
      const { questionId, answer } = req.body;
      req.body.userId = userId;
      // Check if all fields are provided
      if (!userId || !questionId || !answer) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Call the service method to insert the answer
      const isAnswerInserted = await answerService.insertInToAnswer(req.body);
      if (!isAnswerInserted) {
        return res.status(400).json({
          success: false,
          message: "Answer not inserted",
        });
      }
      return res.status(201).json({
        success: true,
        message: "Answer inserted successfully",
      });
    } catch (error) {
      console.error("Error in insertAnswerController:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
  // Get answer details by answerId
  getAnswerDetailsById: async (req, res) => {
    try {
      const answerId = req.params.answerId;

      // Call the service method to fetch answer details by answerId
      const answerDetails = await answerService.getAnswerDetailsById(answerId);

      // Check if answer details were found
      if (!answerDetails || answerDetails.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Answer details not found",
        });
      }

      // Return the answer details
      return res.status(200).json({
        success: true,
        data: answerDetails,
      });
    } catch (error) {
      console.error("Error in getAnswerDetailsById controller:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
};

export default answerController;
