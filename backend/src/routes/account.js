const express = require("express");
const router = express.Router();
const mysql = require("mysql");
import { connectMySQL } from "../app";

// const connectMySQL = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "tjfehd0409",
//   database: "my_db",
// });

const decodePassword = (pass) => Buffer.from(pass, "base64").toString("utf8");

router.post("/signin", (req, res, next) => {
  const decodedPass = decodePassword(req.body.password);
  connectMySQL.query(
    `SELECT * FROM Users WHERE id = '${req.body.id}' AND password = '${decodedPass}'`,
    (error, row, fields) => {
      if (error) {
        res.status(400).json(error);
        throw Error(error);
      }
      res.status(200).json("signin successfully");
    }
  );
});

router.post("/signup", function (req, res, next) {
  const decodedPass = decodePassword(req.body.password);
  connectMySQL.query(
    `
    INSERT INTO Users (id, password, name, gender, priority) VALUES ('${req.body.id}', '${decodedPass}',
    '${req.body.name}', '${req.body.gender}', '${req.body.priority}');
    `,
    (error, rows, fields) => {
      if (error) {
        res.status(400).json(error);
        throw Error(error);
      }
      res.status(201).json("created successfully");
    }
  );
});

module.exports = router;
