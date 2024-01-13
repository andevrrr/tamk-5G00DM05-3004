const express = require('express');
const router = express.Router();
const db = require('./database');
const { body, validationResult } = require('express-validator');

// Centralized error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Validation for POST
const validateCourse = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
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
  '/',
  asyncHandler(async (req, res) => {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM courses', [], (err, rows) => {
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
  '/:id',
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const row = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM courses WHERE id = ?', [courseId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (!row) {
      throw new Error('Course not found');
    }
    res.json(row);
  })
);

router.post(
  '/',
  validateCourse,
  asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const result = await runDbQuery('INSERT INTO courses (title, description) VALUES (?, ?)', [title, description]);
    res.status(201).json({ message: 'Course created', courseId: result.lastID });
  })
);

router.patch(
  '/:id',
  validateCourse,
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const { title, description } = req.body;

    const result = await runDbQuery('UPDATE courses SET title = ?, description = ? WHERE id = ?', [title, description, courseId]);

    if (result.changes === 0) {
      throw new Error('Course not found');
    }
    res.json({ message: 'Course updated' });
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const result = await runDbQuery('DELETE FROM courses WHERE id = ?', [courseId]);

    if (result.changes === 0) {
      throw new Error('Course not found');
    }
    res.json({ message: 'Course deleted' });
  })
);

module.exports = router;
