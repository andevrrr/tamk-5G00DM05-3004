const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Students page");
});

module.exports = router;
