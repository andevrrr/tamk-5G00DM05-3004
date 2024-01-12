const express = require("express");
const router = express.Router();
const db = require("./database");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM students";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM students WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    res.json(row);
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({ message: "Name and email are required" });
    return;
  }
  const sql = "INSERT INTO students (name, email) VALUES (?, ?)";
  db.run(sql, [name, email], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      name,
      email,
    });
  });
});

router.patch("/:id", (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    res.status(400).json({ message: "Name or email is required for update" });
    return;
  }
  const sql = "UPDATE students SET name = ?, email = ? WHERE id = ?";
  db.run(sql, [name, email, req.params.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Student updated successfully" });
  });
});

router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM students WHERE id = ?";
  db.run(sql, [req.params.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    res.json({ message: "Student deleted successfully" });
  });
});

module.exports = router;
