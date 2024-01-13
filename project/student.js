const express = require("express");
const router = express.Router();
const db = require("./database");
const { body, validationResult } = require("express-validator");

// Centralized error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Validation for POST
const validateStudent = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email must be valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const runDbQuery = (query, params) =>
  new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this); // 'this' contains the context of the query execution
      }
    });
  });

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const rows = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM students", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    res.json(rows);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const row = await new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM students WHERE id = ?",
        [req.params.id],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });

    if (!row) {
      throw new Error("Student not found");
    }
    res.json(row);
  })
);

router.post(
  "/",
  validateStudent,
  asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const result = await runDbQuery(
      "INSERT INTO students (name, email) VALUES (?, ?)",
      [name, email]
    );
    res.status(201).json({
      id: result.lastID,
      name,
      email,
    });
  })
);

router.patch(
  "/:id",
  validateStudent,
  asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const result = await runDbQuery(
      "UPDATE students SET name = ?, email = ? WHERE id = ?",
      [name, email, req.params.id]
    );

    if (result.changes === 0) {
      throw new Error("Student not found");
    }
    res.json({ message: "Student updated successfully" });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const result = await runDbQuery("DELETE FROM students WHERE id = ?", [
      req.params.id,
    ]);

    if (result.changes === 0) {
      throw new Error("Student not found");
    }
    res.json({ message: "Student deleted successfully" });
  })
);

module.exports = router;
