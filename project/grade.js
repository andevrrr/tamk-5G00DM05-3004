const express = require("express");
const router = express.Router();
const db = require("./database.js");
const { body, validationResult } = require("express-validator");

// Centralized error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Validation for POST
const validateGrade = [
  body("submission_id").isInt().withMessage("Submission ID must be an integer"),
  body("grade").isNumeric().withMessage("Grade must be a number"),
  body("feedback")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Feedback must not be empty"),
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
      db.all("SELECT * FROM grades", [], (err, rows) => {
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
        "SELECT * FROM grades WHERE id = ?",
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
      throw new Error("Grade not found");
    }
    res.json(row);
  })
);

router.post(
  "/",
  validateGrade,
  asyncHandler(async (req, res) => {
    const { submission_id, grade, feedback } = req.body;
    const result = await runDbQuery(
      "INSERT INTO grades (submission_id, grade, feedback) VALUES (?, ?, ?)",
      [submission_id, grade, feedback]
    );
    res.status(201).json({
      message: "Grade created",
      data: {
        id: result.lastID,
        submission_id,
        grade,
        feedback,
      },
    });
  })
);

router.patch(
  "/:id",
  validateGrade,
  asyncHandler(async (req, res) => {
    const gradeId = req.params.id;
    const { submission_id, grade, feedback } = req.body;
    const result = await runDbQuery(
      "UPDATE grades SET submission_id = ?, grade = ?, feedback = ? WHERE id = ?",
      [submission_id, grade, feedback, gradeId]
    );

    if (result.changes === 0) {
      throw new Error("Grade not found");
    }
    res.json({
      message: "Grade updated",
      data: {
        id: gradeId,
        submission_id,
        grade,
        feedback,
      },
    });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const gradeId = req.params.id;
    const result = await runDbQuery("DELETE FROM grades WHERE id = ?", [
      gradeId,
    ]);

    if (result.changes === 0) {
      throw new Error("Grade not found");
    }
    res.json({ message: "Grade deleted", changes: result.changes });
  })
);

module.exports = router;
