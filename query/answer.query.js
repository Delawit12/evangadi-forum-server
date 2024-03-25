export default {
  insertInToAnswer: `INSERT INTO answers (userId, questionId, answer, insertedDatetime)
VALUES (?, ?, ?, CURRENT_TIMESTAMP);`,
  getAnswerByAnswerId: `SELECT
  q.questionId,
  q.question,
  q.questionDescription,
  q.category AS questionCategory,
  q.userId AS questionUserId,
  uqf.imageUrl AS questionUserProfileImage,
  a.answerId,
  a.answer,
  a.insertedDatetime AS answerInsertedDatetime,
  a.userId AS answerUserId,
  uaf.imageUrl AS answerUserProfileImage
FROM
  questions q
  LEFT JOIN users uq ON q.userId = uq.userId
  LEFT JOIN userProfile uqf ON uq.userId = uqf.userId
  LEFT JOIN answers a ON q.questionId = a.questionId
  LEFT JOIN users ua ON a.userId = ua.userId
  LEFT JOIN userProfile uaf ON ua.userId = uaf.userId
WHERE
  a.answerId = ?;

`,
};
