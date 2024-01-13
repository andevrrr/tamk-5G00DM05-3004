const express = require("express");
const router = express.Router();
const db = require("./database.js");
const { body, validationResult } = require("express-validator");

// Centralized error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Validation for POST
const validateSubmission = [
  body("assignment_id").isInt().withMessage("Assignment ID must be an integer"),
  body("student_id").isInt().withMessage("Student ID must be an integer"),
  body("submission_date")
    .isISO8601()
    .withMessage("Submission date must be a valid ISO8601 date"),
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
      db.all("SELECT * FROM submissions", [], (err, rows) => {
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
        "SELECT * FROM submissions WHERE id = ?",
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
      throw new Error("Submission not found");
    }
    res.json(row);
  })
);

router.post(
  "/",
  validateSubmission,
  asyncHandler(async (req, res) => {
    const { assignment_id, student_id, submission_date } = req.body;
    const result = await runDbQuery(
      "INSERT INTO submissions (assignment_id, student_id, submission_date) VALUES (?, ?, ?)",
      [assignment_id, student_id, submission_date]
    );
    res.status(201).json({
      message: "Submission created",
      data: {
        id: result.lastID,
        assignment_id,
        student_id,
        submission_date,
      },
    });
  })
);

router.patch(
  "/:id",
  validateSubmission,
  asyncHandler(async (req, res) => {
    const { assignment_id, student_id, submission_date } = req.body;
    const submissionId = req.params.id;
    const result = await runDbQuery(
      "UPDATE submissions SET assignment_id = ?, student_id = ?, submission_date = ? WHERE id = ?",
      [assignment_id, student_id, submission_date, submissionId]
    );

    if (result.changes === 0) {
      throw new Error("Submission not found");
    }
    res.json({
      message: "Submission updated",
      data: {
        id: submissionId,
        assignment_id,
        student_id,
        submission_date,
      },
    });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const submissionId = req.params.id;
    const result = await runDbQuery(
      "DELETE FROM submissions WHERE id = ?",
      [submissionId]
    );

    if (result.changes === 0) {
      throw new Error("Submission not found");
    }
    res.json({ message: "Submission deleted", changes: result.changes });
  })
);

module.exports = router;
