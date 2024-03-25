export default {
  // get queries
  getAllQuestion: `SELECT * 
  FROM questions
  ORDER BY insertedDatetime DESC;`,
  getQuestionByQuestionId: `SELECT * 
  FROM questions
  WHERE questionId = ?;
  `,
  // insert queries
  insertInToQuestion: `INSERT INTO questions (question, questionDescription, category, userId, insertedDatetime) 
  VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);
  `,
};
