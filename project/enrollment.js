const express = require("express");
const router = express.Router();
const db = require("./database");

router.get("/", (req, res) => {
  db.all("SELECT * FROM enrollments", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM enrollments WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: "Enrollment not found" });
      return;
    }
    res.json({ data: row });
  });
});

router.post("/", (req, res) => {
  const { student_id, course_id } = req.body;

  db.get("SELECT * FROM students WHERE id = ?", [student_id], (err, student) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    db.get("SELECT * FROM courses WHERE id = ?", [course_id], (err, course) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!course) {
        res.status(404).json({ message: "Course not found" });
        return;
      }

      db.run(
        "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)",
        [student_id, course_id],
        function (err) {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: "Enrollment created",
            data: {
              id: this.lastID,
              student_id,
              course_id,
            },
          });
        }
      );
    });
  });
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const { student_id, course_id } = req.body;
  db.run(
    "UPDATE enrollments SET student_id = ?, course_id = ? WHERE id = ?",
    [student_id, course_id, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ message: "Enrollment not found" });
        return;
      }
      res.json({ message: "Enrollment updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM enrollments WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: "Enrollment not found" });
      return;
    }
    res.json({ message: "Enrollment deleted" });
  });
});

module.exports = router;
