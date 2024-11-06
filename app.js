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
app.get("/install", (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      product_id INT AUTO_INCREMENT,
      product_url VARCHAR(67) NOT NULL,
      product_name VARCHAR(78) NOT NULL,
      PRIMARY KEY (product_id)
    )
  `;

  mysqlconnection.query(createTableQuery, (error, result) => {
    if (error) {
      console.error("Error creating table:", error);
      res.status(500).send("Error creating table");
    } else {
      console.log("Table created successfully");
      res.send("Table created successfully");
    }
  });

  const createProductDescription = `create table if not exists productDescription(
descrption_id int auto_increment,
product_id int not null,
product_brief_description varchar(255) not null,
product_link varchar(255) not null,
primary key(descrption_id),
foreign key (product_id) references products(product_id )
)`;

  mysqlconnection.query(createProductDescription, (error, result) => {
    if (error) {
      console.error("Error creating table:", error);
      res.status(500).send("Error creating table");
    } else {
      console.log("Table created successfully");
      res.send("Table created successfully");
    }
  });

  const createProductPrice = `
  CREATE TABLE IF NOT EXISTS productPrice (
    price_id INT AUTO_INCREMENT,
    product_id INT NOT NULL,
    starting_price VARCHAR(255) NOT NULL,
    price_range VARCHAR(255) NOT NULL,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
  )
`;

  mysqlconnection.query(createProductPrice, (error, result) => {
    if (error) {
      console.error("Error creating table:", error);
      res.status(500).send("Error creating table");
    } else {
      console.log("Table created successfully");
      res.send("Table created successfully");
    }
  });
});
