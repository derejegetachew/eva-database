const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Corrected spelling
const app = express();

app.use(cors());
app.use(bodyParser.json()); // Added bodyParser for JSON parsing

app.listen(3001, () => console.log("Listening on port 3001"));

const mysqlconnection = mysql.createConnection({
  user: "tesema",
  password: "123456",
  host: "localhost",
  database: "evangadi-database",
});

mysqlconnection.connect((error) => {
  if (error) {
    console.log("Database is not connected:", error.message); // Corrected error logging
  } else {
    console.log("Connection successful");
  }
});
