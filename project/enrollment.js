const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Enrollments page");
});

module.exports = router;
