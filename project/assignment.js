const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Assignments page");
});

module.exports = router;
