const express = require("express");
const router = express.Router();
const db = require("./database.js");
const { body, validationResult } = require("express-validator");

// Centralized error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Validation for POST
const validateAssignment = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("course_id").isInt().withMessage("Course ID must be an integer"),
  body("student_id").isInt().withMessage("Student ID must be an integer"),
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
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM assignments", [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      res.status(200).json(rows);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  })
);

router.get(
  "/assignments",
  asyncHandler(async (req, res) => {
    try {
      const { course_id, student_id } = req.query;

      let query = "SELECT * FROM assignments";
      let conditions = [];
      let params = [];

      if (course_id) {
        conditions.push("course_id = ?");
        params.push(course_id);
      }

      if (student_id) {
        conditions.push("student_id = ?");
        params.push(student_id);
      }

      if (conditions.length) {
        query += " WHERE " + conditions.join(" AND ");
      }

      const rows = await new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) {
        res.status(404).json({ message: "No assignments found matching the criteria" });
      } else {
        res.status(200).json(rows);
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const row = await new Promise((resolve, reject) => {
        db.get("SELECT * FROM assignments WHERE id = ?", id, (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });

      if (!row) {
        const error = new Error("Assignment not found");
        error.status = 404;
        throw error;
      }

      res.status(200).json(row);
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  })
);

router.get(
  "/course/:courseId",
  asyncHandler(async (req, res) => {
    try {
      const { courseId } = req.params;
      const rows = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM assignments WHERE course_id = ?", [courseId], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) {
        throw new Error("No assignments found for this course");
      }

      res.status(200).json(rows);
    } catch (error) {
      if (error.message === "No assignments found for this course") {
        res.status(404).json({ error: error.message });
      } else {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
      }
    }
  })
);

router.post(
  "/",
  validateAssignment,
  asyncHandler(async (req, res) => {
    const { title, description, course_id, student_id } = req.body;
    try {
      const result = await runDbQuery(
        "INSERT INTO assignments (title, description, course_id, student_id) VALUES (?, ?, ?, ?)",
        [title, description, course_id, student_id]
      );
      res.status(201).json({
        message: "Assignment created",
        data: {
          id: result.lastID,
          title,
          description,
          course_id,
          student_id,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  })
);

router.patch(
  "/:id",
  validateAssignment,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, course_id, student_id } = req.body;

    try {
      const result = await runDbQuery(
        "UPDATE assignments SET title = COALESCE(?, title), description = COALESCE(?, description), course_id = COALESCE(?, course_id), student_id = COALESCE(?, student_id) WHERE id = ?",
        [title, description, course_id, student_id, id]
      );

      if (result.changes === 0) {
        // If no rows were updated, it means the assignment doesn't exist
        throw new Error("Assignment not found");
      }

      res.status(200).json({ message: "Assignment updated" });
    } catch (error) {
      throw new Error(error.message);
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await runDbQuery("DELETE FROM assignments WHERE id = ?", [id]);

    if (result.changes === 0) {
      // If no rows were deleted, it means the assignment doesn't exist
      throw new Error("Assignment not found");
    }

    res.status(204).json({ message: "Assignment deleted" });
  })
);

module.exports = router;
