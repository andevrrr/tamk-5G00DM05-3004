const express = require("express");
const router = express.Router();
const db = require("./database.js");

router.get("/", (req, res) => {
  db.all("SELECT * FROM assignments", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM assignments WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.json(row);
  });
});

router.post("/", (req, res) => {
  const { title, description, course_id, student_id } = req.body;
  db.run(
    "INSERT INTO assignments (title, description, course_id, student_id) VALUES (?, ?, ?, ?)",
    [title, description, course_id, student_id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "Assignment created",
        data: {
          id: this.lastID,
          title,
          description,
          course_id,
          student_id,
        },
      });
    }
  );
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, course_id, student_id } = req.body;
  db.run(
    "UPDATE assignments SET title = ?, description = ?, course_id = ?, student_id = ? WHERE id = ?",
    [title, description, course_id, student_id, id],
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: 'Assignment updated' });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM assignments WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Course deleted' });
  });
});

module.exports = router;
