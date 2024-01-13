const express = require("express");
const router = express.Router();
const db = require("./database.js");

router.get("/", (req, res) => {
  db.all("SELECT * FROM assignments", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM assignments WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.status(200).json(row);
  });
});

router.post("/", (req, res) => {
  const { title, description, course_id, student_id } = req.body;
  if (!title || !description || !course_id || !student_id) {
    res.status(400).json({ error: "Title, description, course_id, and student_id are required" });
    return;
  }
  db.run(
    "INSERT INTO assignments (title, description, course_id, student_id) VALUES (?, ?, ?, ?)",
    [title, description, course_id, student_id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({
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
  if (!title && !description && !course_id && !student_id) {
    res.status(400).json({ error: "At least one field (title, description, course_id, student_id) is required for update" });
    return;
  }
  db.run(
    "UPDATE assignments SET title = COALESCE(?, title), description = COALESCE(?, description), course_id = COALESCE(?, course_id), student_id = COALESCE(?, student_id) WHERE id = ?",
    [title, description, course_id, student_id, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json({ message: 'Assignment updated' });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM assignments WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(204).end();
  });
});

module.exports = router;
