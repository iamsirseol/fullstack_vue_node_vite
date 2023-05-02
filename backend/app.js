var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mysql = require("mysql");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const account = require("./routes/account");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const connectMySQL = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tjfehd0409",
  database: "my_db",
});

app.use("/hello", indexRouter);
app.get("/users", (req, res) => {
  connectMySQL.query("SELECT * from Users", (error, rows, fields) => {
    if (error) throw error;
    console.log(fields);
    res.send(rows);
  });
});
app.use("/api/v1/account", account);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

connectMySQL.connect((error) => {
  if (error) console.log("failed!!!", error);
  else console.log("connected!!!!");
});

module.exports = app;
