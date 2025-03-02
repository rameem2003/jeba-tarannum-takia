// import mysql from "mysql2/promise";
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.query("SELECT 1")
  .then(() => {
    console.log("Connected to MySQL");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
