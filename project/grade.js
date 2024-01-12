const express = require("express");
const router = express.Router();
const db = require("./database.js");

router.get("/", (req, res) => {
  db.all("SELECT * FROM grades", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  const gradeId = req.params.id;
  db.get("SELECT * FROM grades WHERE grade_id = ?", [gradeId], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

router.post("/", (req, res) => {
  const { submission_id, grade, feedback } = req.body;
  db.run(
    "INSERT INTO grades (submission_id, grade, feedback) VALUES (?, ?, ?)",
    [submission_id, grade, feedback],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "Grade created",
        data: {
          grade_id: this.lastID,
          submission_id,
          grade,
          feedback,
        },
      });
    }
  );
});

router.patch("/:id", (req, res) => {
  const gradeId = req.params.id;
  const { submission_id, grade, feedback } = req.body;
  db.run(
    "UPDATE grades SET submission_id = ?, grade = ?, feedback = ? WHERE grade_id = ?",
    [submission_id, grade, feedback, gradeId],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "Grade updated",
        data: {
          grade_id: gradeId,
          submission_id,
          grade,
          feedback,
        },
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  const gradeId = req.params.id;
  db.run("DELETE FROM grades WHERE grade_id = ?", [gradeId], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Grade deleted", changes: this.changes });
  });
});

module.exports = router;
