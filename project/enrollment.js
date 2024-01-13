const express = require("express");
const router = express.Router();
const db = require("./database");
const { body, validationResult } = require('express-validator');

// Centralized error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);


// Validation for POST
const validateEnrollment = [
  body('student_id').isInt().withMessage('Student ID must be an integer'),
  body('course_id').isInt().withMessage('Course ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const runDbQuery = (query, params) => new Promise((resolve, reject) => {
  db.run(query, params, function(err) {
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
      db.all("SELECT * FROM enrollments", [], (err, rows) => {
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
    const id = req.params.id;
    const row = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM enrollments WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (!row) {
      throw new Error("Enrollment not found");
    }
    res.json(row);
  })
);

router.post(
  "/",
  validateEnrollment,
  asyncHandler(async (req, res) => {
    const { student_id, course_id } = req.body;
    const result = await runDbQuery(
      "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)",
      [student_id, course_id]
    );
    res.json({
      message: "Enrollment created",
      data: {
        id: result.lastID,
        student_id,
        course_id,
      },
    });
  })
);

router.patch(
  "/:id",
  validateEnrollment,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { student_id, course_id } = req.body;
    const result = await runDbQuery(
      "UPDATE enrollments SET student_id = ?, course_id = ? WHERE id = ?",
      [student_id, course_id, id]
    );

    if (result.changes === 0) {
      throw new Error("Enrollment not found");
    }
    res.json({ message: "Enrollment updated" });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await runDbQuery(
      "DELETE FROM enrollments WHERE id = ?",
      [id]
    );

    if (result.changes === 0) {
      throw new Error("Enrollment not found");
    }
    res.json({ message: "Enrollment deleted" });
  })
);

module.exports = router;
