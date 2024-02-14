const pool = require("../services/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

    const SQLSTATEMENT = `
    DROP TABLE IF EXISTS locker; 
    DROP TABLE IF EXISTS credit; 
    DROP TABLE IF EXISTS user; 
    DROP TABLE IF EXISTS task; 
    DROP TABLE IF EXISTS Messages;

    CREATE TABLE Messages (
      id INT PRIMARY KEY AUTO_INCREMENT,
      message_text TEXT NOT NULL,
      user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE locker (
      Inventory_Index INT PRIMARY KEY AUTO_INCREMENT,
      Item_Name TEXT NOT NULL,
      user_id INT NOT NULL,
      Acquired_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE user (
      user_id INT PRIMARY KEY AUTO_INCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      Authorization BOOL NOT NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE credit (
      credit_index INT PRIMARY KEY AUTO_INCREMENT,
      Credit_Earned INT NOT NULL,
      user_id INT NOT NULL
    );

    CREATE TABLE task (
      task_id INT PRIMARY KEY AUTO_INCREMENT,
      points INT NOT NULL,
      user_id INT NOT NULL
    );


    INSERT INTO user (username, email, password, Authorization) VALUES
      ('admin', 'a@a.com', '${hash}', 1);

    INSERT INTO user (username, email, password, Authorization) VALUES
      ('user1', 'user1@example.com', '${hash}', 0),
      ('user2', 'user2@example.com', '${hash}', 0);
      `;

    pool.query(SQLSTATEMENT, callback);
  }
});
