const express = require("express");
const router = express.Router();
const db = require("./database.js");

router.get("/", (req, res) => {
  db.all("SELECT * FROM submissions", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  const submissionId = req.params.id;
  db.get("SELECT * FROM submissions WHERE submission_id = ?", [submissionId], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

router.post("/", (req, res) => {
  const { assignment_id, student_id, submission_date } = req.body;
  db.run(
    "INSERT INTO submissions (assignment_id, student_id, submission_date) VALUES (?, ?, ?)",
    [assignment_id, student_id, submission_date],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "Submission created",
        data: {
          submission_id: this.lastID,
          assignment_id,
          student_id,
          submission_date,
        },
      });
    }
  );
});

router.patch("/:id", (req, res) => {
  const submissionId = req.params.id;
  const { assignment_id, student_id, submission_date } = req.body;
  db.run(
    "UPDATE submissions SET assignment_id = ?, student_id = ?, submission_date = ? WHERE submission_id = ?",
    [assignment_id, student_id, submission_date, submissionId],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "Submission updated",
        data: {
          submission_id: submissionId,
          assignment_id,
          student_id,
          submission_date,
        },
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  const submissionId = req.params.id;
  db.run("DELETE FROM submissions WHERE submission_id = ?", [submissionId], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Submission deleted", changes: this.changes });
  });
});

module.exports = router;
