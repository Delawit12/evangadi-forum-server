-- Active: 1710243192035@@127.0.0.1@3306
-- CREATE DATABASE evangadi

-- drop DATABASE evangadi

-- use evangadiforum

CREATE TABLE IF NOT EXISTS users (
    userId INT AUTO_INCREMENT NOT NULL, username VARCHAR(50) UNIQUE NOT NULL, firstName VARCHAR(50), lastName VARCHAR(50), email VARCHAR(255) UNIQUE NOT NULL, otp VARCHAR(10), insertedDatetime DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (userId)
);

CREATE TABLE IF NOT EXISTS userPassword (
    userPasswordId INT AUTO_INCREMENT NOT NULL, userId INT NOT NULL, userPassword VARCHAR(255) NOT NULL, createdDate DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (userPasswordId), FOREIGN KEY (userId) REFERENCES users (userId)
);

CREATE TABLE IF NOT EXISTS userProfile (
    userProfileId INT AUTO_INCREMENT NOT NULL, userId INT NOT NULL, firstName VARCHAR(255) NOT NULL, middleName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, otherName VARCHAR(255) NOT NULL, imageUrl VARCHAR(255), PRIMARY KEY (userProfileId), FOREIGN KEY (userId) REFERENCES users (userId)
);

CREATE TABLE IF NOT EXISTS questions (
    questionId INT AUTO_INCREMENT NOT NULL, question TEXT NOT NULL, questionDescription TEXT, category VARCHAR(255), userId INT NOT NULL, insertedDatetime DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (questionId), FOREIGN KEY (userId) REFERENCES users (userId)
);

-- DROP TABLE IF EXISTS questions;

-- CREATE TABLE IF NOT EXISTS answers (
--     answerId INT AUTO_INCREMENT NOT NULL, userId INT UNIQUE NOT NULL, questionId INT UNIQUE NOT NULL, answer TEXT NOT NULL, insertedDatetime DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (answerId), FOREIGN KEY (userId) REFERENCES users (userId), FOREIGN KEY (questionId) REFERENCES questions (questionId)
-- );
CREATE TABLE IF NOT EXISTS answers (
    answerId INT AUTO_INCREMENT NOT NULL, userId INT NOT NULL, questionId INT NOT NULL, answer TEXT NOT NULL, insertedDatetime DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (answerId), CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users (userId), CONSTRAINT fk_question FOREIGN KEY (questionId) REFERENCES questions (questionId), CONSTRAINT unique_answer UNIQUE (userId, questionId)
);