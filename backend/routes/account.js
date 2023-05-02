const express = require("express");
const router = express.Router();

router.post("/signin", (req, res, next) => {
  res.send("siginin work");
});

router.post("/signup", (req, res, next) => {
  res.send("siginup work");
});

module.exports = router;
